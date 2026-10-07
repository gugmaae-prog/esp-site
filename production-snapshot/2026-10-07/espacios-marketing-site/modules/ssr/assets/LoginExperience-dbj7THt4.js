import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { t as ThemeControl } from "./ThemeControl-Bm6QZOLR.js";
import { n as recoverWorkspaceSession } from "./workspace-client-C-s0XeLI.js";
//#region app/login/LoginExperience.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var errorMessages = {
	noemail: "LinkedIn did not share an email. Enable the email scope, or use Google or email.",
	unverified: "Your LinkedIn email is not verified.",
	session: "We could not create your session. Please try again.",
	redirect: "LinkedIn sign-in could not be completed.",
	config: "LinkedIn sign-in is not fully configured.",
	denied: "Sign-in was cancelled.",
	expired: "That sign-in attempt expired. Please try again.",
	network: "We could not reach LinkedIn. Please try again."
};
function LoginExperience({ nextPath, errorCode }) {
	const [message, setMessage] = (0, import_react.useState)(errorCode ? errorMessages[errorCode] ?? "Sign-in failed. Please try again." : "");
	const [submitting, setSubmitting] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		let active = true;
		recoverWorkspaceSession().then((token) => {
			if (active && token) window.location.replace(nextPath);
		}).catch(() => void 0);
		return () => {
			active = false;
		};
	}, [nextPath]);
	async function sendLink(event) {
		event.preventDefault();
		const form = event.currentTarget;
		const email = new FormData(form).get("email")?.toString().trim().toLowerCase();
		if (!email) return;
		setSubmitting(true);
		setMessage("Sending your secure sign-in link…");
		try {
			const response = await fetch("/api/auth/send-link", {
				method: "POST",
				headers: { "content-type": "application/json" },
				body: JSON.stringify({
					email,
					next: nextPath
				})
			});
			const result = await response.json().catch(() => ({}));
			if (!response.ok) throw new Error(result.error || "We could not send the sign-in link.");
			setMessage(`Check your email. We sent a secure sign-in link to ${email}.`);
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "We could not send the sign-in link.");
		} finally {
			setSubmitting(false);
		}
	}
	const encodedNext = encodeURIComponent(nextPath);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("main", {
		className: "auth-page",
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "auth-stage",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
					className: "auth-stage-header",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "auth-wordmark",
						href: "/",
						"aria-label": "Espacios home",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "auth-stage-actions",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControl, { placement: "auth" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "auth-return-link",
							href: "/",
							children: "Back to home"
						})]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-layout",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "auth-presence",
						"aria-labelledby": "auth-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "auth-overline",
								children: "One connected workspace"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", {
								id: "auth-title",
								children: "Welcome back."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "auth-presence-copy",
								children: "Sign in to continue planning, creating and growing with the context of your business intact."
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "auth-trust-note",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { "aria-hidden": "true" }), " Secure sign-in. No password stored by espacios."]
							})
						]
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "auth-card",
						"aria-labelledby": "auth-form-title",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
								className: "auth-card-header",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Sign in" }),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", {
										id: "auth-form-title",
										children: "Continue to espacios"
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Use your work account or receive a secure link by email." })
								]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "auth-provider-list",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "auth-provider",
									href: `/api/auth/oauth/google?next=${encodedNext}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "auth-provider-mark",
											"aria-hidden": "true",
											children: "G"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with Google" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "auth-provider-arrow",
											"aria-hidden": "true",
											children: "→"
										})
									]
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("a", {
									className: "auth-provider",
									href: `/api/auth/oauth/linkedin?next=${encodedNext}`,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "auth-provider-mark auth-provider-mark-linkedin",
											"aria-hidden": "true",
											children: "in"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Continue with LinkedIn" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
											className: "auth-provider-arrow",
											"aria-hidden": "true",
											children: "→"
										})
									]
								})]
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
								className: "auth-divider",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "or continue with email" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
								className: "auth-form",
								onSubmit: sendLink,
								"aria-busy": submitting,
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("label", {
									htmlFor: "auth-email",
									children: "Work email"
								}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "auth-email-control",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										id: "auth-email",
										name: "email",
										type: "email",
										autoComplete: "email",
										inputMode: "email",
										required: true,
										placeholder: "you@company.com"
									}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										type: "submit",
										disabled: submitting,
										children: submitting ? "Sending…" : "Send link"
									})]
								})]
							}),
							message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
								className: "auth-message",
								role: "status",
								"aria-live": "polite",
								children: message
							}) : null,
							/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", {
								className: "auth-privacy",
								children: [
									"By continuing, you agree to the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: "/terms",
										children: "Terms"
									}),
									" and acknowledge the ",
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
										href: "/privacy",
										children: "Privacy Policy"
									}),
									"."
								]
							})
						]
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
					className: "auth-stage-footer",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "© 2026 espacios" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Legal and support",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/privacy",
								children: "Privacy"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/terms",
								children: "Terms"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/request-proposal",
								children: "Proposal"
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { LoginExperience };
