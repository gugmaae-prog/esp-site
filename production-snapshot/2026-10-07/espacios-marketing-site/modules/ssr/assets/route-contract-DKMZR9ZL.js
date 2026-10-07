//#region app/lib/route-contract.ts
var publicRoutes = {
	home: "/",
	services: "/services",
	work: "/work",
	workspace: "/workspace",
	studio: "/studio",
	proposal: "/request-proposal",
	pricing: "/pricing",
	insights: "/insights",
	privacy: "/privacy",
	terms: "/terms",
	leadGeneration: "/services/lead-generation"
};
var publicNavigation = [
	{
		href: publicRoutes.services,
		label: "Services",
		exact: [publicRoutes.services, publicRoutes.proposal],
		prefixes: [publicRoutes.services]
	},
	{
		href: publicRoutes.work,
		label: "Work",
		exact: [publicRoutes.work, publicRoutes.studio],
		prefixes: [publicRoutes.work]
	},
	{
		href: publicRoutes.workspace,
		label: "Workspace",
		exact: [publicRoutes.workspace, publicRoutes.pricing],
		prefixes: [publicRoutes.workspace]
	},
	{
		href: publicRoutes.insights,
		label: "Resources",
		exact: [publicRoutes.insights, "/news"],
		prefixes: [publicRoutes.insights]
	}
];
function matchesPublicRoute(item, pathname) {
	return item.exact.some((route) => pathname === route) || item.prefixes.some((route) => pathname.startsWith(`${route}/`));
}
var workspaceNavigation = [
	{
		surface: "aether",
		label: "Aether",
		icon: "aether",
		href: "/aether"
	},
	{
		surface: "plans",
		label: "Planning",
		icon: "plans",
		href: "/plans"
	},
	{
		surface: "research",
		label: "Research",
		icon: "research",
		href: "/research"
	},
	{
		surface: "learn",
		label: "Learn",
		icon: "learn",
		href: "/learn"
	},
	{
		surface: "leads",
		label: "Leads",
		icon: "leads",
		href: "/leads"
	},
	{
		surface: "socials",
		label: "Socials",
		icon: "socials",
		href: "/socials"
	},
	{
		surface: "ops",
		label: "Ops",
		icon: "ops",
		href: "/ops"
	},
	{
		surface: "mail",
		label: "Mail",
		icon: "mail",
		href: "/mail"
	},
	{
		surface: "crm",
		label: "CRM",
		icon: "crm",
		href: "/crm"
	}
];
var secondaryNavigation = [
	{
		label: "Intelligence",
		icon: "intelligence",
		href: "/intelligence",
		description: "Find durable product and creative demand signals.",
		aetherPrompt: "Review my saved market intelligence and identify the strongest evidence-backed opportunity."
	},
	{
		label: "Documents",
		icon: "documents",
		href: "/documents",
		description: "Create, store and reuse business files.",
		aetherPrompt: "Help me use my documents as context for the next piece of work."
	},
	{
		label: "Database",
		icon: "database",
		href: "/database",
		description: "Organize records and enrich structured data.",
		aetherPrompt: "Review my database and recommend the next useful action."
	},
	{
		label: "Spaces",
		icon: "spaces",
		href: "/spaces",
		description: "Manage property inventory, places and projects.",
		aetherPrompt: "Help me work with my Spaces inventory and property context."
	},
	{
		label: "Teams",
		icon: "teams",
		href: "/teams",
		description: "Coordinate people, roles and shared work.",
		aetherPrompt: "Help me coordinate this work with my team."
	},
	{
		label: "Plug",
		icon: "plug",
		href: "/plug",
		description: "Connect profiles, opportunities and members.",
		aetherPrompt: "Use my Plug network context to identify the next connection or opportunity."
	},
	{
		label: "Inbox",
		icon: "inbox",
		href: "/inbox",
		description: "Keep conversations and follow-ups together.",
		aetherPrompt: "Review my inbox context and help me decide what to answer or follow up."
	},
	{
		label: "Notes",
		icon: "notes",
		href: "/notes",
		description: "Capture ideas and turn them into useful work.",
		aetherPrompt: "Turn my notes into a clear next action, plan or research brief."
	},
	{
		label: "Expenses",
		icon: "expenses",
		href: "/expenses",
		description: "Track business spend, receipts and categories.",
		aetherPrompt: "Help me understand and organize my expense activity."
	},
	{
		label: "Scraper",
		icon: "scraper",
		href: "/scraper",
		description: "Collect web data for research, leads and CRM.",
		aetherPrompt: "Help me turn scraped data into useful research, database records or CRM leads."
	},
	{
		label: "Calendar",
		icon: "calendar",
		href: "/calendar",
		description: "Schedule plans, campaigns and follow-ups.",
		aetherPrompt: "Help me organize my calendar around current plans and priorities."
	}
];
var workspacePaths = new Set([
	...workspaceNavigation.map((item) => item.href),
	...secondaryNavigation.map((item) => item.href),
	"/workflow",
	"/email-marketing",
	"/planner"
]);
var aetherPaths = new Set([
	"/aether",
	"/chat",
	"/workspace-v2/aether",
	"/legacy/aether",
	"/aether-home.html"
]);
function normalizedPath(pathname) {
	return pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
}
function isWorkspacePath(pathname) {
	const path = normalizedPath(pathname);
	return [...workspacePaths].some((workspacePath) => path === workspacePath || path.startsWith(`${workspacePath}/`));
}
function isAetherPath(pathname) {
	return aetherPaths.has(normalizedPath(pathname));
}
var classicSurfaceRoutes = {
	plans: "/legacy/plans",
	research: "/legacy/research",
	socials: "/legacy/socials",
	ops: "/legacy/workflow",
	mail: "/legacy/email-marketing",
	crm: "/legacy/crm"
};
function classicSurfaceHref(surface) {
	return classicSurfaceRoutes[surface] || null;
}
function createSurfaceHref(surface) {
	if (surface === "aether") return "#aether-compose";
	if (surface === "plans") return "#plans-composer";
	if (surface === "research") return "#research-composer";
	if (surface === "learn") return "/aether?mode=teacher";
	if (surface === "leads") return "/legacy/crm?view=leads";
	return classicSurfaceHref(surface) || workspaceNavigation.find((item) => item.surface === surface)?.href || "/aether";
}
publicRoutes.home, publicRoutes.workspace, publicRoutes.pricing, publicRoutes.studio, publicRoutes.services, publicRoutes.work, publicRoutes.insights, publicRoutes.proposal, publicRoutes.privacy, publicRoutes.terms;
//#endregion
export { matchesPublicRoute as a, workspaceNavigation as c, isWorkspacePath as i, createSurfaceHref as n, publicNavigation as o, isAetherPath as r, secondaryNavigation as s, classicSurfaceHref as t };
