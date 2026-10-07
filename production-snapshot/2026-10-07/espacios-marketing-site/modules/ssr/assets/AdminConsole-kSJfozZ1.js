import { T as __toESM, t as require_jsx_runtime, y as require_react } from "../index.js";
import Link from "./link-R7mqIJIC.js";
import { t as EspaciosLogo } from "./EspaciosLogo-28bELevs.js";
import { t as ThemeControl } from "./ThemeControl-Bm6QZOLR.js";
//#region app/components/AdminConsole.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
var leadStatuses = [
	"new",
	"reviewed",
	"qualified",
	"proposal_sent",
	"won",
	"lost",
	"archived"
];
var emptyCase = {
	id: "",
	slug: "",
	title: "",
	industry: "",
	summary: "",
	challenge: "",
	solution: "",
	impact: "",
	services: "",
	coverKey: "",
	status: "draft",
	featured: false
};
var emptyInsight = {
	id: "",
	slug: "",
	title: "",
	excerpt: "",
	body: "",
	status: "draft"
};
function displayDate(value) {
	if (typeof value !== "string") return "—";
	return new Intl.DateTimeFormat("en", {
		dateStyle: "medium",
		timeStyle: "short"
	}).format(new Date(value));
}
function parseServices(value) {
	if (typeof value !== "string") return [];
	try {
		const parsed = JSON.parse(value);
		return Array.isArray(parsed) ? parsed : [];
	} catch {
		return [];
	}
}
function AdminConsole({ user }) {
	const [data, setData] = (0, import_react.useState)(null);
	const [tab, setTab] = (0, import_react.useState)("leads");
	const [message, setMessage] = (0, import_react.useState)("");
	const [busy, setBusy] = (0, import_react.useState)(false);
	const [caseForm, setCaseForm] = (0, import_react.useState)(emptyCase);
	const [insightForm, setInsightForm] = (0, import_react.useState)(emptyInsight);
	const fileRef = (0, import_react.useRef)(null);
	const altRef = (0, import_react.useRef)(null);
	(0, import_react.useEffect)(() => {
		let active = true;
		fetch("/api/admin/dashboard", { cache: "no-store" }).then(async (response) => {
			if (!response.ok) throw new Error("The private workspace could not be loaded.");
			return await response.json();
		}).then((result) => {
			if (active) setData(result.data);
		}).catch(() => {
			if (active) setMessage("The private workspace could not be loaded.");
		});
		return () => {
			active = false;
		};
	}, []);
	async function mutate(payload) {
		setBusy(true);
		setMessage("");
		try {
			const response = await fetch("/api/admin/dashboard", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(payload)
			});
			const result = await response.json();
			if (!response.ok || !result.ok || !result.data) throw new Error(result.message ?? "The update could not be saved.");
			setData(result.data);
			setMessage("Saved.");
			return true;
		} catch (error) {
			setMessage(error instanceof Error ? error.message : "The update could not be saved.");
			return false;
		} finally {
			setBusy(false);
		}
	}
	async function saveCase(event) {
		event.preventDefault();
		let coverKey = caseForm.coverKey;
		const file = fileRef.current?.files?.[0];
		if (file) {
			const altText = altRef.current?.value.trim() ?? "";
			if (!altText) {
				setMessage("Add useful alt text before uploading the cover image.");
				return;
			}
			setBusy(true);
			const media = new FormData();
			media.append("file", file);
			media.append("altText", altText);
			const uploadResponse = await fetch("/api/admin/media", {
				method: "POST",
				body: media
			});
			const uploadResult = await uploadResponse.json();
			if (!uploadResponse.ok || !uploadResult.key) {
				setBusy(false);
				setMessage(uploadResult.message ?? "The image could not be uploaded.");
				return;
			}
			coverKey = uploadResult.key;
		}
		if (await mutate({
			action: "saveCaseStudy",
			...caseForm,
			coverKey
		})) {
			setCaseForm(emptyCase);
			if (fileRef.current) fileRef.current.value = "";
			if (altRef.current) altRef.current.value = "";
		}
	}
	async function saveInsight(event) {
		event.preventDefault();
		if (await mutate({
			action: "saveInsight",
			...insightForm
		})) setInsightForm(emptyInsight);
	}
	function editCase(row) {
		setCaseForm({
			id: String(row.id ?? ""),
			slug: String(row.slug ?? ""),
			title: String(row.title ?? ""),
			industry: String(row.industry ?? ""),
			summary: String(row.summary ?? ""),
			challenge: String(row.challenge ?? ""),
			solution: String(row.solution ?? ""),
			impact: String(row.impact ?? ""),
			services: String(row.services ?? ""),
			coverKey: String(row.cover_key ?? ""),
			status: String(row.status ?? "draft"),
			featured: row.featured === 1
		});
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	function editInsight(row) {
		setInsightForm({
			id: String(row.id ?? ""),
			slug: String(row.slug ?? ""),
			title: String(row.title ?? ""),
			excerpt: String(row.excerpt ?? ""),
			body: String(row.body ?? ""),
			status: String(row.status ?? "draft")
		});
		window.scrollTo({
			top: 0,
			behavior: "smooth"
		});
	}
	const newLeadCount = data?.leads.filter((lead) => lead.status === "new").length ?? 0;
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
		className: "admin-shell",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "admin-header",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				className: "logo",
				href: "/",
				"aria-label": "Espacios home",
				children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)(EspaciosLogo, {})
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(ThemeControl, { placement: "admin" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: user.displayName }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/signout-with-chatgpt?return_to=/",
					children: "Sign out"
				})
			] })]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "admin-layout",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", {
				className: "admin-sidebar",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Private studio" }),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: tab === "leads" ? "active" : "",
						onClick: () => setTab("leads"),
						type: "button",
						children: ["Leads ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: newLeadCount })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: tab === "work" ? "active" : "",
						onClick: () => setTab("work"),
						type: "button",
						children: ["Work ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.caseStudies.length ?? 0 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("button", {
						className: tab === "insights" ? "active" : "",
						onClick: () => setTab("insights"),
						type: "button",
						children: ["Insights ", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: data?.insights.length ?? 0 })]
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/",
						rel: "noreferrer",
						target: "_blank",
						children: "View website ↗"
					})
				]
			}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
				className: "admin-main",
				children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-title",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "eyebrow",
							children: tab === "leads" ? "Pipeline" : tab === "work" ? "Portfolio" : "Publishing"
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: tab === "leads" ? "Proposal leads" : tab === "work" ? "Case studies" : "Insights" })] }), message ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
							className: "admin-message",
							role: "status",
							children: message
						}) : null]
					}),
					!data ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "admin-loading",
						children: "Loading the workspace…"
					}) : null,
					data && tab === "leads" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "lead-list",
						children: [data.leads.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-empty",
							children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No proposal leads yet." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "New form submissions will appear here automatically." })]
						}) : null, data.leads.map((lead) => {
							const notes = data.notes.filter((note) => note.lead_id === lead.id);
							return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", {
								className: "lead-card",
								children: [
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lead-card-heading",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: displayDate(lead.created_at) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: String(lead.company) }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
												String(lead.name),
												" ·",
												" ",
												/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
													href: `mailto:${String(lead.email)}`,
													children: String(lead.email)
												})
											] })
										] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("select", {
											"aria-label": `Status for ${String(lead.company)}`,
											disabled: busy,
											onChange: (event) => void mutate({
												action: "updateLeadStatus",
												id: lead.id,
												status: event.target.value
											}),
											value: String(lead.status),
											children: leadStatuses.map((status) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: status,
												children: status.replace("_", " ")
											}, status))
										})]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lead-meta",
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(lead.budget).replaceAll("-", " ") }),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(lead.timeline).replaceAll("-", " ") }),
											parseServices(lead.services).map((service) => /* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(service).replaceAll("-", " ") }, String(service)))
										]
									}),
									/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
										className: "lead-goals",
										children: String(lead.goals)
									}),
									lead.website ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
										className: "lead-website",
										href: String(lead.website),
										rel: "noreferrer",
										target: "_blank",
										children: "Visit current website ↗"
									}) : null,
									/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
										className: "lead-notes",
										children: [notes.map((note) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [
											String(note.author_email),
											" ·",
											" ",
											displayDate(note.created_at)
										] }), String(note.body)] }, String(note.id))), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
											onSubmit: (event) => {
												event.preventDefault();
												const formElement = event.currentTarget;
												const form = new FormData(formElement);
												mutate({
													action: "addLeadNote",
													leadId: lead.id,
													body: form.get("note")
												}).then((saved) => {
													if (saved) formElement.reset();
												});
											},
											children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
												"aria-label": `Add note for ${String(lead.company)}`,
												name: "note",
												placeholder: "Add a private note",
												required: true
											}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
												disabled: busy,
												type: "submit",
												children: "Add note"
											})]
										})]
									})
								]
							}, String(lead.id));
						})]
					}) : null,
					data && tab === "work" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-content-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "admin-editor",
							onSubmit: saveCase,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "admin-editor-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: caseForm.id ? "Edit case study" : "New case study" }), caseForm.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setCaseForm(emptyCase),
										type: "button",
										children: "Clear"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									onChange: (event) => setCaseForm({
										...caseForm,
										title: event.target.value
									}),
									required: true,
									value: caseForm.title
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "field-grid",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["URL slug", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										onChange: (event) => setCaseForm({
											...caseForm,
											slug: event.target.value
										}),
										pattern: "[a-z0-9]+(?:-[a-z0-9]+)*",
										required: true,
										value: caseForm.slug
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Industry", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
										onChange: (event) => setCaseForm({
											...caseForm,
											industry: event.target.value
										}),
										required: true,
										value: caseForm.industry
									})] })]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Summary", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setCaseForm({
										...caseForm,
										summary: event.target.value
									}),
									required: true,
									rows: 3,
									value: caseForm.summary
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Challenge", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setCaseForm({
										...caseForm,
										challenge: event.target.value
									}),
									required: true,
									rows: 4,
									value: caseForm.challenge
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Solution", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setCaseForm({
										...caseForm,
										solution: event.target.value
									}),
									required: true,
									rows: 6,
									value: caseForm.solution
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Verified impact", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setCaseForm({
										...caseForm,
										impact: event.target.value
									}),
									placeholder: "Use only client-approved results.",
									required: true,
									rows: 4,
									value: caseForm.impact
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Services", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									onChange: (event) => setCaseForm({
										...caseForm,
										services: event.target.value
									}),
									placeholder: "Web design, CRM, lead generation",
									required: true,
									value: caseForm.services
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "admin-upload",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Cover image", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											accept: "image/jpeg,image/png,image/webp,image/avif",
											ref: fileRef,
											type: "file"
										})] }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Image alt text", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", { ref: altRef })] }),
										caseForm.coverKey ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("small", { children: ["Existing image: ", caseForm.coverKey] }) : null
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "field-grid",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
										onChange: (event) => setCaseForm({
											...caseForm,
											status: event.target.value
										}),
										value: caseForm.status,
										children: [
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "draft",
												children: "Draft"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "published",
												children: "Published"
											}),
											/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
												value: "archived",
												children: "Archived"
											})
										]
									})] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", {
										className: "admin-check",
										children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
											checked: caseForm.featured,
											onChange: (event) => setCaseForm({
												...caseForm,
												featured: event.target.checked
											}),
											type: "checkbox"
										}), "Feature this project"]
									})]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button button-primary",
									disabled: busy,
									children: busy ? "Saving…" : "Save case study"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "admin-content-list",
							children: [data.caseStudies.length === 0 ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
								className: "admin-empty",
								children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "No case studies yet." }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Add only approved projects, visuals, testimonials, and results." })]
							}) : null, data.caseStudies.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(item.status) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: String(item.title) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: String(item.summary) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => editCase(item),
									type: "button",
									children: "Edit"
								})
							] }, String(item.id)))]
						})]
					}) : null,
					data && tab === "insights" ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "admin-content-layout",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("form", {
							className: "admin-editor",
							onSubmit: saveInsight,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "admin-editor-heading",
									children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: insightForm.id ? "Edit insight" : "New insight" }), insightForm.id ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
										onClick: () => setInsightForm(emptyInsight),
										type: "button",
										children: "Clear"
									}) : null]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Title", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									onChange: (event) => setInsightForm({
										...insightForm,
										title: event.target.value
									}),
									required: true,
									value: insightForm.title
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["URL slug", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									onChange: (event) => setInsightForm({
										...insightForm,
										slug: event.target.value
									}),
									pattern: "[a-z0-9]+(?:-[a-z0-9]+)*",
									required: true,
									value: insightForm.slug
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Search and index excerpt", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setInsightForm({
										...insightForm,
										excerpt: event.target.value
									}),
									required: true,
									rows: 3,
									value: insightForm.excerpt
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Article body", /* @__PURE__ */ (0, import_jsx_runtime.jsx)("textarea", {
									onChange: (event) => setInsightForm({
										...insightForm,
										body: event.target.value
									}),
									placeholder: "Separate paragraphs with a blank line.",
									required: true,
									rows: 16,
									value: insightForm.body
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: ["Status", /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									onChange: (event) => setInsightForm({
										...insightForm,
										status: event.target.value
									}),
									value: insightForm.status,
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "draft",
											children: "Draft"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "published",
											children: "Published"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "archived",
											children: "Archived"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									className: "button button-primary",
									disabled: busy,
									children: busy ? "Saving…" : "Save insight"
								})
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
							className: "admin-content-list",
							children: data.insights.map((item) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: String(item.status) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: String(item.title) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: String(item.excerpt) }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: () => editInsight(item),
									type: "button",
									children: "Edit"
								})
							] }, String(item.id)))
						})]
					}) : null
				]
			})]
		})]
	});
}
//#endregion
export { AdminConsole };
