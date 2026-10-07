//#region app/lib/workspace-client.ts
var WorkspaceApiError = class extends Error {
	constructor(message, status, payload) {
		super(message);
		this.status = status;
		this.payload = workspaceFailurePayload(payload);
		this.name = "WorkspaceApiError";
	}
};
function workspaceFailurePayload(value) {
 const input = record(value), payload = {};
 for (const key of ["ok","code","error","message","reply","retryable","saved","applied","draft","plan","report","sources","cover_url","factcheck","expertise","context_used","progress","action","artifact_cards","card","status","model_available","web_available","grounded","degraded","fallback","warnings"]) {
  if (Object.prototype.hasOwnProperty.call(input, key)) payload[key] = input[key];
 }
 return payload;
}
var ACCESS_TOKEN_KEY = "espacios_access_token";
var REFRESH_TOKEN_KEY = "espacios_refresh_token";
var DEVICE_TOKEN_KEY = "espacios_device_token";
var EXPIRES_AT_KEY = "espacios_access_token_expires_at";
var REFRESH_MARGIN_MS = 12e4;
var sessionRefresh = null;
function record(value) {
	return value && typeof value === "object" && !Array.isArray(value) ? value : {};
}
function stored(key) {
	try {
		return window.localStorage.getItem(key) || "";
	} catch {
		return "";
	}
}
function removeStored(...keys) {
	try {
		keys.forEach((key) => window.localStorage.removeItem(key));
	} catch {}
}
function jwtExpiresAt(token) {
	try {
		const payload = token.split(".")[1]?.replace(/-/g, "+").replace(/_/g, "/");
		if (!payload) return 0;
		const padded = payload.padEnd(Math.ceil(payload.length / 4) * 4, "=");
		const expiration = Number(record(JSON.parse(atob(padded))).exp);
		return Number.isFinite(expiration) && expiration > 0 ? expiration * 1e3 : 0;
	} catch {
		return 0;
	}
}
function storedExpiresAt() {
	const expiresAt = Number(stored(EXPIRES_AT_KEY));
	return Number.isFinite(expiresAt) && expiresAt > 0 ? expiresAt : 0;
}
function tokenExpiresAt(token) {
	return jwtExpiresAt(token) || storedExpiresAt();
}
function isFresh(token) {
	if (!token) return false;
	const expiresAt = tokenExpiresAt(token);
	return !expiresAt || expiresAt - Date.now() > REFRESH_MARGIN_MS;
}
function payloadExpiresAt(payload, accessToken) {
	const explicit = Number(payload.expires_at);
	if (Number.isFinite(explicit) && explicit > 0) return explicit > 1e10 ? explicit : explicit * 1e3;
	const expiresIn = Number(payload.expires_in);
	if (Number.isFinite(expiresIn) && expiresIn > 0) return Date.now() + expiresIn * 1e3;
	return jwtExpiresAt(accessToken);
}
function persistWorkspaceSession(value) {
	const payload = record(value);
	const accessToken = typeof payload.access_token === "string" ? payload.access_token : "";
	if (!accessToken) return "";
	try {
		if (typeof payload.refresh_token === "string" && payload.refresh_token) window.localStorage.setItem(REFRESH_TOKEN_KEY, payload.refresh_token);
		if (typeof payload.device_token === "string" && payload.device_token) window.localStorage.setItem(DEVICE_TOKEN_KEY, payload.device_token);
		const expiresAt = payloadExpiresAt(payload, accessToken);
		if (expiresAt) window.localStorage.setItem(EXPIRES_AT_KEY, String(expiresAt));
		else window.localStorage.removeItem(EXPIRES_AT_KEY);
		window.localStorage.setItem(ACCESS_TOKEN_KEY, accessToken);
		window.dispatchEvent(new CustomEvent("espacios:session-refreshed"));
	} catch {}
	return accessToken;
}
function storedAccessToken() {
	return stored(ACCESS_TOKEN_KEY);
}
async function renewDeviceSession(current) {
	const deviceToken = stored(DEVICE_TOKEN_KEY);
	if (!/^[a-f0-9]{64}$/.test(deviceToken)) return {
		token: current,
		refreshed: false,
		invalid: !current
	};
	try {
		const response = await fetch("/api/auth/device-renew", {
			method: "POST",
			headers: { "content-type": "application/json" },
			body: JSON.stringify({ device_token: deviceToken }),
			cache: "no-store"
		});
		const payload = record(await response.json().catch(() => null));
		if (response.ok && payload.ok !== false && typeof payload.access_token === "string") return {
			token: persistWorkspaceSession(payload),
			refreshed: true,
			invalid: false
		};
		if (response.status === 400 || response.status === 401 || payload.ok === false) {
			removeStored(DEVICE_TOKEN_KEY);
			return {
				token: current,
				refreshed: false,
				invalid: !current
			};
		}
	} catch {}
	return {
		token: current,
		refreshed: false,
		invalid: false
	};
}
async function withSessionRefreshLock(callback) {
	const locks = navigator.locks;
	if (!locks?.request) return callback();
	return locks.request("espacios-workspace-session-refresh", callback);
}
async function refreshWorkspaceSession(forceRefresh, initialAccessToken) {
	return withSessionRefreshLock(async () => {
		const current = storedAccessToken();
		if (!forceRefresh && isFresh(current)) return {
			token: current,
			refreshed: current !== initialAccessToken,
			invalid: false
		};
		if (forceRefresh && current && current !== initialAccessToken && isFresh(current)) return {
			token: current,
			refreshed: true,
			invalid: false
		};
		const refreshToken = stored(REFRESH_TOKEN_KEY);
		if (!refreshToken) {
			const recovered = await renewDeviceSession(forceRefresh ? "" : current || initialAccessToken);
			if (forceRefresh && recovered.invalid) removeStored(ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, EXPIRES_AT_KEY);
			return recovered;
		}
		try {
			const response = await fetch("/api/auth/refresh", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({ refresh_token: refreshToken }),
				cache: "no-store"
			});
			const payload = record(await response.json().catch(() => null));
			if (response.ok && typeof payload.access_token === "string") return {
				token: persistWorkspaceSession(payload),
				refreshed: true,
				invalid: false
			};
			if (response.status === 400 || response.status === 401) {
				const rotatedRefreshToken = stored(REFRESH_TOKEN_KEY);
				const rotatedAccessToken = storedAccessToken();
				if (rotatedRefreshToken && rotatedRefreshToken !== refreshToken && rotatedAccessToken) return {
					token: rotatedAccessToken,
					refreshed: true,
					invalid: false
				};
				const recovered = await renewDeviceSession("");
				if (recovered.refreshed) return recovered;
				if (recovered.invalid) removeStored(ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY, EXPIRES_AT_KEY);
				return recovered;
			}
		} catch {}
		return {
			token: current || initialAccessToken,
			refreshed: false,
			invalid: false
		};
	});
}
async function freshAccessToken(forceRefresh = false) {
	const current = storedAccessToken();
	if (!forceRefresh && isFresh(current)) return {
		token: current,
		refreshed: false,
		invalid: false
	};
	if (sessionRefresh) return sessionRefresh;
	sessionRefresh = refreshWorkspaceSession(forceRefresh, current);
	try {
		return await sessionRefresh;
	} finally {
		sessionRefresh = null;
	}
}
async function recoverWorkspaceSession() {
	if (typeof window === "undefined") return "";
	const session = await freshAccessToken();
	return session.refreshed || isFresh(session.token) ? session.token : "";
}
function startWorkspaceSessionMaintenance() {
	if (typeof window === "undefined") return () => void 0;
	let stopped = false;
	let timer = 0;
	const schedule = () => {
		if (stopped) return;
		window.clearTimeout(timer);
		const expiresAt = tokenExpiresAt(storedAccessToken());
		const untilRefresh = expiresAt ? expiresAt - Date.now() - REFRESH_MARGIN_MS : 600 * 1e3;
		const delay = Math.max(3e4, Math.min(untilRefresh, 600 * 1e3));
		timer = window.setTimeout(() => {
			freshAccessToken().finally(schedule);
		}, delay);
	};
	const recoverVisibleSession = () => {
		if (document.visibilityState === "hidden") return;
		freshAccessToken().finally(schedule);
	};
	window.addEventListener("focus", recoverVisibleSession);
	window.addEventListener("storage", recoverVisibleSession);
	window.addEventListener("espacios:session-refreshed", recoverVisibleSession);
	document.addEventListener("visibilitychange", recoverVisibleSession);
	freshAccessToken().finally(schedule);
	return () => {
		stopped = true;
		window.clearTimeout(timer);
		window.removeEventListener("focus", recoverVisibleSession);
		window.removeEventListener("storage", recoverVisibleSession);
		window.removeEventListener("espacios:session-refreshed", recoverVisibleSession);
		document.removeEventListener("visibilitychange", recoverVisibleSession);
	};
}
function workspaceAssistantReply(payload) {
	const sources = [record(payload)];
	for (const key of [
		"data",
		"result",
		"response"
	]) {
		const nested = record(sources[0][key]);
		if (Object.keys(nested).length) sources.push(nested);
	}
	for (const source of sources) for (const key of [
		"reply",
		"text",
		"answer",
		"content",
		"message"
	]) {
		const value = source[key];
		if (typeof value === "string" && value.trim()) return value.trim();
	}
	return "";
}
async function workspaceApiResponseFetch(path, init) {
	let session = await freshAccessToken();
	const headers = new Headers(init?.headers);
	if (session.token) headers.set("authorization", `Bearer ${session.token}`);
	if (init?.body && !headers.has("content-type")) headers.set("content-type", "application/json");
	let response;
	try {
		response = await fetch(path, {
			...init,
			headers,
			cache: "no-store"
		});
	} catch {
		throw new WorkspaceApiError("The workspace service is unavailable. Please retry.", 0);
	}
	if (response.status === 401 && !session.invalid) {
		const recovered = await freshAccessToken(true);
		if (recovered.refreshed && recovered.token) {
			session = recovered;
			headers.set("authorization", `Bearer ${session.token}`);
			try {
				response = await fetch(path, {
					...init,
					headers,
					cache: "no-store"
				});
			} catch {
				throw new WorkspaceApiError("The workspace service is unavailable. Please retry.", 0);
			}
		}
	}
	const details = record(await response.clone().json().catch(() => null));
	if (response.status === 401) throw new WorkspaceApiError("Sign in to continue.", 401, details);
	if (response.status === 403) throw new WorkspaceApiError("This action is not available for your role.", 403, details);
	if (!response.ok || details.ok === false) {
		const message = [details.message, details.error].find((value) => typeof value === "string" && value.trim());
		throw new WorkspaceApiError(typeof message === "string" ? message : "The request could not be completed. Please retry.", response.status, details);
	}
	return response;
}
async function workspaceApiFetch(path, init) {
	return await (await workspaceApiResponseFetch(path, init)).json().catch(() => null);
}
//#endregion
export { workspaceApiFetch as a, storedAccessToken as i, recoverWorkspaceSession as n, workspaceApiResponseFetch as o, startWorkspaceSessionMaintenance as r, workspaceAssistantReply as s, WorkspaceApiError as t };
