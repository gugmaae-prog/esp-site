import { c as usePathname, t as require_jsx_runtime } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { t as ThemeControl } from "./ThemeControl-Bm6QZOLR.js";
import { a as matchesPublicRoute, o as publicNavigation } from "./route-contract-DKMZR9ZL.js";
//#region app/components/SiteHeader.tsx
var import_jsx_runtime = require_jsx_runtime();
function SiteHeader({ tone = "dark" }) {
	const pathname = usePathname();
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("header", {
		className: "canonical-public-header",
		"data-tone": tone,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "canonical-public-header-inner",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					className: "canonical-public-brand",
					href: "/",
					"aria-label": "Espacios home",
					children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, {})
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("nav", {
					className: "canonical-public-nav",
					"aria-label": "Primary navigation",
					children: publicNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						"aria-current": matchesPublicRoute(item, pathname) ? "page" : void 0,
						className: matchesPublicRoute(item, pathname) ? "is-active" : void 0,
						href: item.href,
						children: item.label
					}, item.href))
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControl, { placement: "public" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "canonical-public-actions",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/login?next=/aether",
						children: "Sign in"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						className: "canonical-public-cta",
						href: "/request-proposal",
						children: "Request a proposal"
					})]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("details", {
					className: "canonical-mobile-menu",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("summary", {
						"aria-label": "Open navigation",
						children: "Menu"
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", {
						"aria-label": "Mobile navigation",
						children: [
							publicNavigation.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								"aria-current": matchesPublicRoute(item, pathname) ? "page" : void 0,
								className: matchesPublicRoute(item, pathname) ? "is-active" : void 0,
								href: item.href,
								children: item.label
							}, item.href)),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								href: "/login?next=/aether",
								children: "Sign in"
							}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
								className: "canonical-public-cta",
								href: "/request-proposal",
								children: "Request a proposal"
							})
						]
					})]
				})
			]
		})
	});
}
//#endregion
export { SiteHeader };
