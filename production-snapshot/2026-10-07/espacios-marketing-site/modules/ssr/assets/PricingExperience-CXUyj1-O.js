import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { o as publicNavigation } from "./route-contract-DKMZR9ZL.js";
import { SiteHeader } from "./SiteHeader-a2eSPRGZ.js";
//#region app/components/SiteFooter.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function SiteFooter() {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("footer", {
		className: "site-footer",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container footer-lead",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Espacios agency and Workspace" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Turn the next business priority into a system that moves." })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "footer-start",
					href: "/request-proposal",
					children: ["Request a proposal ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						"aria-hidden": "true",
						children: "↗"
					})]
				})]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container footer-directory",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "footer-brand-block",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "logo footer-logo",
								href: "/",
								"aria-label": "Espacios home",
								children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, { className: "footer-wordmark" })
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Strategy, marketing, AI automation and connected software for UAE and global businesses." }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
								href: "mailto:hello@espacios.me",
								children: "hello@espacios.me"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "footer-nav",
						"aria-label": "Footer navigation",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Explore" }), publicNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							href: item.href,
							children: item.label
						}, item.href))]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						className: "footer-nav",
						"aria-label": "Agency links",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Agency" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/services",
								children: "All services"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/work",
								children: "Selected work"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/about",
								children: "About espacios"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/request-proposal",
								children: "Request a proposal"
							})
						]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("address", {
						className: "footer-office",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Dubai office" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "Xavier Business Center" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Ibn Battuta Gate Offices" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dubai, United Arab Emirates" })
						]
					})
				]
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
				className: "container footer-bottom",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
						"© ",
						(/* @__PURE__ */ new Date()).getFullYear(),
						" espacios.me"
					] }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Dubai, UAE · Working worldwide" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/privacy",
						children: "Privacy"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/terms",
						children: "Terms"
					})] })
				]
			})
		]
	});
}
//#endregion
//#region app/components/PricingExperience.tsx
var plans = [
	{
		tier: "starter",
		name: "Starter",
		monthly: 19,
		summary: "For individuals getting started.",
		features: [
			"Connected intelligence",
			"Core workspace",
			"Up to 1,500 contacts",
			"Email campaigns"
		]
	},
	{
		tier: "growth",
		name: "Growth",
		monthly: 49,
		summary: "For growing teams and marketers.",
		features: [
			"Everything in Starter",
			"Advanced automations",
			"Up to 20,000 contacts",
			"AI tooling",
			"Priority support"
		],
		recommended: true
	},
	{
		tier: "pro",
		name: "Pro",
		monthly: 99,
		summary: "For teams scaling seriously.",
		features: [
			"Everything in Growth",
			"Advanced reporting",
			"Up to 100,000 contacts",
			"Team collaboration",
			"API access"
		]
	},
	{
		tier: "enterprise",
		name: "Enterprise",
		monthly: null,
		summary: "For large organisations with custom needs.",
		features: [
			"Everything in Pro",
			"Dedicated support",
			"Custom integrations",
			"SLA and security",
			"Onboarding"
		]
	}
];
function token() {
	try {
		return window.localStorage.getItem("espacios_access_token") || "";
	} catch {
		return "";
	}
}
function PricingExperience() {
	const [billing, setBilling] = (0, import_react.useState)("monthly");
	const [working, setWorking] = (0, import_react.useState)(null);
	const [notice, setNotice] = (0, import_react.useState)("");
	const choose = async (tier) => {
		setWorking(tier);
		setNotice("");
		const selected = {
			tier,
			billingCycle: billing,
			selectedAt: (/* @__PURE__ */ new Date()).toISOString()
		};
		try {
			window.sessionStorage.setItem("espacios_plan_selection", JSON.stringify(selected));
		} catch {}
		const access = token();
		if (!access) {
			window.location.assign(`/login?next=${encodeURIComponent(`/aether?plan=${tier}&billing=${billing}`)}`);
			return;
		}
		try {
			if (!(await fetch("/api/account/plan-selection", {
				method: "PUT",
				headers: {
					authorization: `Bearer ${access}`,
					"content-type": "application/json"
				},
				body: JSON.stringify({
					tier,
					billingCycle: billing
				})
			})).ok) throw new Error("save_failed");
			window.location.assign(`/aether?plan=${tier}`);
		} catch {
			setNotice("We kept your choice on this device, but could not attach it to your account yet. Please try again.");
			setWorking(null);
		}
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteHeader, {}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
			className: "pricing-page",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
					className: "pricing-intro",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Espacios Workspace subscriptions" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Choose the Workspace plan that fits." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "These plans are for the Espacios software product. Selecting a plan stores your intent only; no card is charged." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
							className: "pricing-workspace-link",
							href: "/workspace",
							children: "Explore the full Workspace →"
						}),
						/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "billing-toggle",
							role: "group",
							"aria-label": "Billing cycle",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
								className: billing === "monthly" ? "is-active" : "",
								onClick: () => setBilling("monthly"),
								children: "Monthly"
							}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
								className: billing === "yearly" ? "is-active" : "",
								onClick: () => setBilling("yearly"),
								children: ["Yearly ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "Save 20%" })]
							})]
						})
					]
				}),
				notice ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
					className: "pricing-notice",
					role: "status",
					children: notice
				}) : null,
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("section", {
					className: "pricing-grid",
					"aria-label": "Espacios plans",
					children: plans.map((plan) => {
						const amount = plan.monthly === null ? null : billing === "yearly" ? Math.round(plan.monthly * .8) : plan.monthly;
						return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
							className: `pricing-card pricing-card-${plan.tier} ${plan.recommended ? "is-recommended" : ""}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "pricing-card-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: plan.name }), plan.recommended ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
										className: "recommended-label",
										children: "Most popular"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("h2", { children: [
									amount === null ? "Custom" : `$${amount}`,
									" ",
									amount !== null ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("small", { children: "/mo" }) : null
								] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: plan.summary }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("ul", { children: plan.features.map((feature) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("li", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", { "aria-hidden": "true" }), feature] }, feature)) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									disabled: working !== null,
									onClick: () => void choose(plan.tier),
									children: working === plan.tier ? "Saving…" : plan.tier === "enterprise" ? "Contact sales" : "Get started"
								})
							]
						}, plan.tier);
					})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
					className: "pricing-footnote",
					children: "14-day free trial. No credit card required. Yearly prices are presented as an equivalent monthly rate."
				})
			]
		}),
		/* @__PURE__ */ (0, import_jsx_runtime.jsx)(SiteFooter, {})
	] });
}
//#endregion
export { PricingExperience };
