import { T as __toESM, c as usePathname, t as require_jsx_runtime, y as require_react } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { i as isWorkspacePath, r as isAetherPath } from "./route-contract-DKMZR9ZL.js";
import { a as workspaceApiFetch, s as workspaceAssistantReply, t as WorkspaceApiError } from "./workspace-client-C-s0XeLI.js";
//#region app/components/FloatingAssistant.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function FloatingAssistant() {
	const pathname = usePathname() || "/";
	const inputId = (0, import_react.useId)();
	const [open, setOpen] = (0, import_react.useState)(false);
	const [query, setQuery] = (0, import_react.useState)("");
	const [messages, setMessages] = (0, import_react.useState)([]);
	const [sending, setSending] = (0, import_react.useState)(false);
	const inWorkspace = isWorkspacePath(pathname);
	(0, import_react.useEffect)(() => {
		const closeOnEscape = (event) => {
			if (event.key === "Escape") setOpen(false);
		};
		window.addEventListener("keydown", closeOnEscape);
		return () => window.removeEventListener("keydown", closeOnEscape);
	}, []);
	if (isAetherPath(pathname)) return null;
	const submit = async (event) => {
		event.preventDefault();
		const message = query.trim();
		if (!message || sending) return;
		setMessages((items) => [...items, {
			role: "user",
			text: message
		}]);
		setQuery("");
		setSending(true);
		try {
			const payload = inWorkspace ? await workspaceApiFetch("/api/chat", {
				method: "POST",
				body: JSON.stringify({
					message,
					surface: pathname,
					origin: "floating_assistant"
				})
			}) : await fetch("/api/marketing-guide", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					message,
					route: pathname
				})
			}).then(async (response) => {
				const result = await response.json().catch(() => ({}));
				if (!response.ok) throw new Error(result.error || "The guide could not respond. Please try again.");
				return result;
			});
			const reply = workspaceAssistantReply(payload);
			if (!reply) throw new Error("The assistant returned an empty response. Please try again.");
			setMessages((items) => [...items, {
				role: "assistant",
				text: reply,
				card: payload.card
			}]);
		} catch (error) {
			setMessages((items) => [...items, {
				role: "assistant",
				text: error instanceof WorkspaceApiError && error.status === 401 ? "Sign in to ask about this workspace." : error instanceof Error ? error.message : "The assistant could not respond. Please try again."
			}]);
		} finally {
			setSending(false);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: `floating-assistant${inWorkspace ? " is-workspace" : ""}`,
		children: [open ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
			className: "floating-assistant-panel",
			id: "espacios-assistant-panel",
			"aria-label": "Espacios assistant",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, { className: "floating-assistant-logo" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: inWorkspace ? "Workspace assistant" : "Espacios guide" })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
					type: "button",
					onClick: () => setOpen(false),
					"aria-label": "Close Espacios assistant",
					title: "Close",
					children: "×"
				})] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "floating-assistant-intro",
					children: inWorkspace ? "Ask about this page or the next step." : "Describe what you want to improve. I’ll point you to the right starting point."
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "floating-assistant-messages",
					"aria-live": "polite",
					children: [messages.length ? messages.map((item, index) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: `floating-assistant-message is-${item.role}`,
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: item.text }), item.card ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: item.card.href,
							onClick: () => setOpen(false),
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: item.card.title }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: item.card.summary }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("b", { children: [item.card.action, " →"] })
							]
						}) : null]
					}, `${item.role}-${index}`)) : /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "floating-assistant-empty",
						children: inWorkspace ? "Your workspace context stays protected." : "No account or technical language required."
					}), sending ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "floating-assistant-thinking",
						children: "Working on it…"
					}) : null]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
					onSubmit: (event) => void submit(event),
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
							className: "sr-only",
							htmlFor: inputId,
							children: "Ask Espacios"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
							id: inputId,
							value: query,
							onChange: (event) => setQuery(event.target.value),
							onKeyDown: (event) => {
								if (event.key !== "Enter" || event.shiftKey || event.nativeEvent.isComposing) return;
								event.preventDefault();
								event.currentTarget.form?.requestSubmit();
							},
							placeholder: inWorkspace ? "Ask about this workspace" : "What are you trying to improve?",
							rows: 2
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							type: "submit",
							disabled: !query.trim() || sending,
							"aria-label": "Send question",
							children: sending ? "…" : "↑"
						})
					]
				}),
				!inWorkspace ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "floating-assistant-workspace-link",
					href: "/aether",
					children: "Open workspace →"
				}) : null
			]
		}) : null, /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
			type: "button",
			className: "floating-assistant-trigger",
			onClick: () => setOpen(true),
			"aria-expanded": open,
			"aria-controls": "espacios-assistant-panel",
			"aria-label": "Ask espacios",
			title: "Ask Espacios",
			children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
				className: "floating-assistant-sphere",
				"aria-hidden": "true",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
			})
		})]
	});
}
//#endregion
export { FloatingAssistant };
