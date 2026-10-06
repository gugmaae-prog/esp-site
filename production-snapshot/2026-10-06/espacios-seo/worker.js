const PUBLIC = [
  "/",
  "/services",
  "/services/digital-marketing",
  "/services/ai-integration-automation",
  "/services/lead-generation",
  "/services/social-media",
  "/services/crm-implementation",
  "/services/web-design-development",
  "/work",
  "/workspace",
  "/pricing",
  "/insights",
  "/insights/crm-architecture-qualified-leads",
  "/insights/ai-integration-roadmap-uae-businesses",
  "/about",
  "/request-proposal",
  "/privacy",
  "/terms",
  "/map",
  "/news",
  "/spaces",
  "/spaces/compare",
  "/keifferjapeth"
];
const PRIVATE = [
  "/account","/admin","/aether","/chat","/crm","/dashboard","/database","/documents",
  "/email-marketing","/expenses","/inbox","/jobs","/notes","/planner","/plans","/plug",
  "/research","/scraper","/socials","/team","/teams","/workflow","/calendar","/mail",
  "/leads","/ops","/intelligence","/spaces/manage","/shared","/share","/contract",
  "/logos"
];
const LEGACY = [
  "/a","/atom-dashboard","/bot","/botspace","/bed","/build-agent","/burj-khalifa",
  "/demo","/deck/psr","/learn-legacy","/learning","/meow","/workspace-v2"
];
function xmlEsc(s){return String(s).replace(/[&<>"]/g,c=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]));}
function headers(type){return {"content-type":type+"; charset=utf-8","cache-control":"public,max-age=3600","x-robots-tag":"noindex"};}
export default {
  async fetch(request) {
    const url = new URL(request.url);
    const path = url.pathname;
    const today = new Date().toISOString().slice(0,10);
    if (path === "/sitemap.xml") {
      const body = '<?xml version="1.0" encoding="UTF-8"?>\n<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + '<sitemap><loc>https://espacios.me/site-core.xml</loc></sitemap>'
        + '<sitemap><loc>https://espacios.me/spaces/sitemap.xml</loc></sitemap>'
        + '<sitemap><loc>https://espacios.me/news-sitemap.xml</loc></sitemap>'
        + '</sitemapindex>';
      return new Response(body,{headers:headers("application/xml")});
    }
    if (path === "/site-core.xml") {
      const body = '<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">'
        + PUBLIC.filter(p=>p!=="/privacy"&&p!=="/terms").map(p=>'<url><loc>'+xmlEsc('https://espacios.me'+p)+'</loc></url>').join("")
        + '</urlset>';
      return new Response(body,{headers:headers("application/xml")});
    }
    if (path === "/robots.txt") {
      const lines = [
        "# Espacios crawler policy. Private resources also require application authorization.",
        ...["*", "OAI-SearchBot", "ChatGPT-User", "PerplexityBot", "Perplexity-User", "ClaudeBot", "Claude-User", "Claude-SearchBot"].map(agent => "User-agent: " + agent),
        "Allow: /",
        ...[...new Set([...PRIVATE, ...LEGACY, "/api", "/auth", "/login", "/logout", "/__internal"])].flatMap(p => ["Disallow: " + p + "$", "Disallow: " + p + "/", "Disallow: " + p + "?"]),
        "",
        "User-agent: CCBot", "User-agent: Bytespider", "User-agent: meta-externalagent", "Disallow: /",
        "",
        "Sitemap: https://espacios.me/sitemap.xml"
      ];
      return new Response(lines.join("\n"),{headers:headers("text/plain")});
    }
    return new Response("Not found",{status:404,headers:{"cache-control":"no-store"}});
  }
};
