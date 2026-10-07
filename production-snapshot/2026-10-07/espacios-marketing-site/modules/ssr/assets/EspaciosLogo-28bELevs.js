import { t as require_jsx_runtime } from "../index.js";
//#region app/components/EspaciosLogo.tsx
var import_jsx_runtime = require_jsx_runtime();
function EspaciosLogo({ className = "", light = false }) {
	return /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
		"aria-label": "Espacios",
		role: "img",
		className: `espacios-logo espacios-wordmark${light ? " is-light" : ""}${className ? ` ${className}` : ""}`,
		children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("img", {
			alt: "",
			"aria-hidden": "true",
			className: "espacios-logo-image",
			decoding: "async",
			height: "741",
			src: "/brand/espacios-official-wordmark.png",
			width: "2122"
		})
	});
}
//#endregion
export { EspaciosLogo as t };
