import { T as __toESM, c as usePathname, y as require_react } from "../index.js";
//#region app/components/ScrollExperience.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
function ScrollExperience() {
	(0, import_react.useEffect)(() => {
		const root = document.documentElement;
		const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
		const revealItems = Array.from(document.querySelectorAll("[data-reveal]"));
		if (reducedMotion) {
			revealItems.forEach((item) => item.classList.add("is-visible"));
			root.classList.add("motion-reduced");
			return;
		}
		const observer = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					entry.target.classList.add("is-visible");
					observer.unobserve(entry.target);
				}
			});
		}, {
			rootMargin: "0px 0px -8% 0px",
			threshold: .12
		});
		revealItems.forEach((item) => observer.observe(item));
		let activeDepthMedia = null;
		let activeMotionScene = null;
		const resetDepthMedia = (item) => {
			if (!item) return;
			item.style.setProperty("--media-pointer-x", "0");
			item.style.setProperty("--media-pointer-y", "0");
			item.classList.remove("is-interacting");
		};
		const resetMotionScene = (scene) => {
			if (!scene) return;
			scene.style.setProperty("--scene-pointer-x", "0");
			scene.style.setProperty("--scene-pointer-y", "0");
			scene.classList.remove("is-interacting");
			scene.querySelectorAll("[data-motion-layer]").forEach((item) => {
				item.style.setProperty("--layer-pointer-x", "0px");
				item.style.setProperty("--layer-pointer-y", "0px");
				item.style.setProperty("--layer-pointer-rotate", "0deg");
			});
		};
		const depthMedia = Array.from(document.querySelectorAll("[data-media-motion=\"depth\"], [data-media-layered=\"true\"]"));
		const motionScenes = Array.from(document.querySelectorAll("[data-motion-scene]"));
		const sceneObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				const scene = entry.target;
				scene.classList.toggle("is-scene-active", entry.isIntersecting);
				if (!entry.isIntersecting && scene === activeMotionScene) {
					resetMotionScene(scene);
					activeMotionScene = null;
				}
			});
		}, {
			rootMargin: "18% 0px",
			threshold: .01
		});
		motionScenes.forEach((scene) => sceneObserver.observe(scene));
		const onPointerMove = (event) => {
			const target = event.target instanceof Element ? event.target : null;
			const scene = target?.closest("[data-motion-scene]") ?? null ?? motionScenes.find((candidate) => {
				if (!candidate.classList.contains("is-scene-active")) return false;
				const rect = candidate.getBoundingClientRect();
				return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
			}) ?? null;
			if (scene !== activeMotionScene) resetMotionScene(activeMotionScene);
			activeMotionScene = scene;
			if (scene) {
				const sceneRect = scene.getBoundingClientRect();
				if (sceneRect.width && sceneRect.height) {
					const sceneX = (event.clientX - sceneRect.left) / sceneRect.width - .5;
					const sceneY = (event.clientY - sceneRect.top) / sceneRect.height - .5;
					scene.style.setProperty("--scene-pointer-x", sceneX.toFixed(3));
					scene.style.setProperty("--scene-pointer-y", sceneY.toFixed(3));
					scene.classList.add("is-interacting");
					scene.querySelectorAll("[data-motion-layer]").forEach((item) => {
						const depth = Number(item.dataset.depth ?? "0.5");
						item.style.setProperty("--layer-pointer-x", `${(sceneX * depth * 34).toFixed(2)}px`);
						item.style.setProperty("--layer-pointer-y", `${(sceneY * depth * 25).toFixed(2)}px`);
						item.style.setProperty("--layer-pointer-rotate", `${(sceneX * depth * 4.5).toFixed(2)}deg`);
					});
				}
			}
			const item = target?.closest("[data-media-motion=\"depth\"], [data-media-layered=\"true\"]") ?? null ?? depthMedia.find((candidate) => {
				const rect = candidate.getBoundingClientRect();
				return event.clientX >= rect.left && event.clientX <= rect.right && event.clientY >= rect.top && event.clientY <= rect.bottom;
			}) ?? null;
			if (item !== activeDepthMedia) resetDepthMedia(activeDepthMedia);
			activeDepthMedia = item;
			if (!item) return;
			const rect = item.getBoundingClientRect();
			if (!rect.width || !rect.height) return;
			const x = (event.clientX - rect.left) / rect.width - .5;
			const y = (event.clientY - rect.top) / rect.height - .5;
			item.style.setProperty("--media-pointer-x", x.toFixed(3));
			item.style.setProperty("--media-pointer-y", y.toFixed(3));
			item.classList.add("is-interacting");
		};
		const onPointerExit = () => {
			resetDepthMedia(activeDepthMedia);
			activeDepthMedia = null;
			resetMotionScene(activeMotionScene);
			activeMotionScene = null;
		};
		const canPoint = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
		if (canPoint) {
			document.addEventListener("pointermove", onPointerMove, { passive: true });
			window.addEventListener("blur", onPointerExit);
		}
		const parallaxItems = Array.from(document.querySelectorAll("[data-parallax]"));
		const layeredMedia = Array.from(document.querySelectorAll("[data-media-layered=\"true\"], [data-media-motion=\"depth\"]"));
		const scrollScenes = Array.from(document.querySelectorAll("[data-scroll-scene]"));
		let frame = 0;
		const updateScroll = () => {
			frame = 0;
			const max = document.documentElement.scrollHeight - window.innerHeight;
			const progress = max > 0 ? window.scrollY / max : 0;
			root.style.setProperty("--scroll-progress", progress.toFixed(4));
			root.classList.toggle("has-scrolled", window.scrollY > 24);
			parallaxItems.forEach((item) => {
				const rect = item.getBoundingClientRect();
				const speed = Number(item.dataset.parallax ?? "0.08");
				const offset = (rect.top + rect.height / 2 - window.innerHeight / 2) * speed;
				item.style.setProperty("--parallax-y", `${offset.toFixed(1)}px`);
			});
			layeredMedia.forEach((item) => {
				const rect = item.getBoundingClientRect();
				const viewportCenter = window.innerHeight / 2;
				const itemCenter = rect.top + rect.height / 2;
				const range = Math.max(window.innerHeight + rect.height, 1);
				const scrollDepth = Math.min(Math.max((itemCenter - viewportCenter) / range, -1), 1);
				item.style.setProperty("--media-scroll-y", scrollDepth.toFixed(4));
			});
			scrollScenes.forEach((scene) => {
				const rect = scene.getBoundingClientRect();
				const travel = Math.max(rect.height - window.innerHeight, 1);
				const sceneProgress = Math.min(Math.max(-rect.top / travel, 0), 1);
				const distance = window.innerWidth * .16;
				scene.style.setProperty("--scene-progress", sceneProgress.toFixed(4));
				scene.style.setProperty("--scene-marketing-x", `${((.5 - sceneProgress) * distance).toFixed(1)}px`);
				scene.style.setProperty("--scene-ai-x", `${((sceneProgress - .5) * distance).toFixed(1)}px`);
				scene.style.setProperty("--scene-track-x", `${((.5 - sceneProgress) * window.innerWidth * .55).toFixed(1)}px`);
				scene.style.setProperty("--scene-core-scale", (.84 + sceneProgress * .24).toFixed(3));
				scene.style.setProperty("--scene-core-rotate", `${(-12 + sceneProgress * 24).toFixed(1)}deg`);
			});
			motionScenes.forEach((scene) => {
				if (!scene.classList.contains("is-scene-active")) return;
				const rect = scene.getBoundingClientRect();
				const viewportCenter = window.innerHeight / 2;
				const sceneCenter = rect.top + rect.height / 2;
				const range = Math.max((window.innerHeight + rect.height) / 2, 1);
				const localProgress = Math.min(Math.max((viewportCenter - sceneCenter) / range, -1), 1);
				scene.style.setProperty("--scene-scroll-progress", localProgress.toFixed(4));
				scene.querySelectorAll("[data-motion-layer]").forEach((item) => {
					const scrollX = Number(item.dataset.scrollX ?? "0");
					const scrollY = Number(item.dataset.scrollY ?? "0");
					const depth = Number(item.dataset.depth ?? "0.5");
					item.style.setProperty("--layer-scroll-x", `${(localProgress * scrollX).toFixed(2)}px`);
					item.style.setProperty("--layer-scroll-y", `${(localProgress * scrollY).toFixed(2)}px`);
					item.style.setProperty("--layer-scroll-rotate", `${(localProgress * depth * 3.25).toFixed(2)}deg`);
				});
			});
		};
		const onScroll = () => {
			if (!frame) frame = requestAnimationFrame(updateScroll);
		};
		window.addEventListener("scroll", onScroll, { passive: true });
		window.addEventListener("resize", onScroll, { passive: true });
		updateScroll();
		root.classList.add("experience-ready");
		return () => {
			observer.disconnect();
			sceneObserver.disconnect();
			if (canPoint) {
				document.removeEventListener("pointermove", onPointerMove);
				window.removeEventListener("blur", onPointerExit);
			}
			resetDepthMedia(activeDepthMedia);
			resetMotionScene(activeMotionScene);
			window.removeEventListener("scroll", onScroll);
			window.removeEventListener("resize", onScroll);
			if (frame) cancelAnimationFrame(frame);
		};
	}, [usePathname()]);
	return null;
}
//#endregion
export { ScrollExperience };
