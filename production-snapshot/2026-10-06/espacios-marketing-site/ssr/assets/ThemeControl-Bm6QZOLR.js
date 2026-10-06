import { T as __toESM, t as require_jsx_runtime, w as __exportAll, y as require_react } from "../index.js";
//#region app/components/ThemeControl.tsx
var ThemeControl_exports = /* @__PURE__ */ __exportAll({
	ThemeControl: () => ThemeControl,
	espaciosThemeStorageKey: () => espaciosThemeStorageKey
});
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var espaciosThemeStorageKey = "espacios_theme_v1";
var themeTransitionTimer;
function currentTheme() {
	if (typeof document === "undefined") return "light";
	return document.documentElement.dataset.espaciosTheme === "dark" ? "dark" : "light";
}
function applyTheme(theme) {
	if (currentTheme() !== theme) {
		document.documentElement.dataset.espaciosThemeChanging = "";
		clearTimeout(themeTransitionTimer);
		themeTransitionTimer = setTimeout(() => {
			delete document.documentElement.dataset.espaciosThemeChanging;
		}, 240);
	}
	document.documentElement.dataset.espaciosTheme = theme;
	document.documentElement.style.colorScheme = theme;
	document.querySelector("meta[name=\"theme-color\"]")?.setAttribute("content", theme === "dark" ? "#0d1320" : "#eef3fb");
	try {
		window.localStorage.setItem(espaciosThemeStorageKey, theme);
	} catch {}
	window.dispatchEvent(new CustomEvent("espacios-theme-change", { detail: theme }));
}
function ThemeControl({ placement = "public" }) {
	const groupId = (0, import_react.useId)();
	const theme = (0, import_react.useSyncExternalStore)((sync) => {
		window.addEventListener("espacios-theme-change", sync);
		window.addEventListener("storage", sync);
		return () => {
			window.removeEventListener("espacios-theme-change", sync);
			window.removeEventListener("storage", sync);
		};
	}, currentTheme, () => "light");
	const choose = (nextTheme) => {
		applyTheme(nextTheme);
	};
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("fieldset", {
		className: `theme-radio theme-radio-${placement}`,
		"aria-label": "Color theme",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("legend", {
			className: "sr-only",
			children: "Color theme"
		}), ["light", "dark"].map((option) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
			"aria-label": `Use ${option} theme`,
			className: theme === option ? "is-selected" : "",
			title: `${option === "light" ? "Light" : "Dark"} theme`,
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
					checked: theme === option,
					name: `espacios-theme-${groupId}`,
					onChange: () => choose(option),
					type: "radio",
					value: option
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
					"aria-hidden": "true",
					className: `theme-radio-dot is-${option}`
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", {
					className: "sr-only",
					children: option === "light" ? "Light" : "Dark"
				})
			]
		}, option))]
	});
}
//#endregion
export { ThemeControl_exports as n, ThemeControl as t };
