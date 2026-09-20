import type {
  BreadcrumbList,
  CollectionPage,
  ItemList,
  Organization,
  SoftwareApplication,
  SoftwareSourceCode,
  WebPage,
  WebSite,
} from "schema-dts";
import { POSITIONING, SITE_NAME, routeManifest, type RoutePath } from "@/content/route-manifest";
import { DOCS_ORIGIN, PRODUCTION_ORIGIN } from "@/lib/site-config";

/* ------------------------------------------------------------------ */
/* Stable identifiers                                                  */
/* ------------------------------------------------------------------ */

// Entity identifiers are always anchored on the production origin so that
// preview deployments describe the same entities rather than new ones.
export const ORG_ID = `${PRODUCTION_ORIGIN}/#organization`;
export const SITE_ID = `${PRODUCTION_ORIGIN}/#website`;
export const SOFTWARE_ID = `${PRODUCTION_ORIGIN}/#software`;
export const SOURCE_ID = `${PRODUCTION_ORIGIN}/#sourcecode`;
export const TYPESAFE_ID = `${PRODUCTION_ORIGIN}/jev#typesafe`;
export const JEV_ID = `${PRODUCTION_ORIGIN}/jev#jev`;

export const GITHUB_REPO = "https://github.com/agentiumOS/agentium";
export const NPM_PACKAGE = "https://www.npmjs.com/package/@agentium/core";
export const MIT_LICENSE = "https://opensource.org/licenses/MIT";

function pageUrl(path: RoutePath): string {
  return path === "/" ? `${PRODUCTION_ORIGIN}/` : `${PRODUCTION_ORIGIN}${path}`;
}
export function webPageId(path: RoutePath): string {
  return `${PRODUCTION_ORIGIN}${path === "/" ? "/" : path}#webpage`;
}
function breadcrumbId(path: RoutePath): string {
  return `${PRODUCTION_ORIGIN}${path}#breadcrumb`;
}
function listId(path: RoutePath): string {
  return `${PRODUCTION_ORIGIN}${path}#list`;
}

/* ------------------------------------------------------------------ */
/* Global entities                                                     */
/* ------------------------------------------------------------------ */

export function organization(): Organization {
  return {
    "@type": "Organization",
    "@id": ORG_ID,
    name: SITE_NAME,
    url: PRODUCTION_ORIGIN,
    logo: {
      "@type": "ImageObject",
      url: `${PRODUCTION_ORIGIN}/icon1`,
      width: "512",
      height: "512",
    },
    // Only verified official profiles. Add Discord/X/LinkedIn once confirmed.
    sameAs: [GITHUB_REPO, NPM_PACKAGE],
  };
}

export function website(): WebSite {
  return {
    "@type": "WebSite",
    "@id": SITE_ID,
    url: PRODUCTION_ORIGIN,
    name: SITE_NAME,
    publisher: { "@id": ORG_ID },
    inLanguage: "en",
  };
}

export function software(): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": SOFTWARE_ID,
    name: SITE_NAME,
    alternateName: "@agentium/core",
    description: POSITIONING,
    url: PRODUCTION_ORIGIN,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Agent framework",
    operatingSystem: "Cross-platform (Node.js)",
    runtimePlatform: "Node.js",
    license: MIT_LICENSE,
    isAccessibleForFree: true,
    downloadUrl: NPM_PACKAGE,
    installUrl: NPM_PACKAGE,
    softwareHelp: { "@type": "CreativeWork", url: DOCS_ORIGIN },
    author: { "@id": ORG_ID },
    publisher: { "@id": ORG_ID },
    sameAs: [GITHUB_REPO],
  };
}

export function sourceCode(): SoftwareSourceCode {
  return {
    "@type": "SoftwareSourceCode",
    "@id": SOURCE_ID,
    name: "agentiumOS/agentium",
    codeRepository: GITHUB_REPO,
    programmingLanguage: "TypeScript",
    runtimePlatform: "Node.js",
    license: MIT_LICENSE,
    targetProduct: { "@id": SOFTWARE_ID },
  };
}

/* ------------------------------------------------------------------ */
/* Page-level entities                                                 */
/* ------------------------------------------------------------------ */

type PageOptions = {
  path: RoutePath;
  /** Additional nodes the page talks about (e.g. Jev). */
  mentions?: { "@id": string }[];
  /** Attach an ItemList as the page's main entity. */
  mainEntity?: { "@id": string };
};

export function webPage({ path, mentions, mainEntity }: PageOptions): WebPage {
  const route = routeManifest[path];
  const page: WebPage = {
    "@type": "WebPage",
    "@id": webPageId(path),
    url: pageUrl(path),
    name: route.title,
    description: route.description,
    isPartOf: { "@id": SITE_ID },
    about: { "@id": SOFTWARE_ID },
    primaryImageOfPage: {
      "@type": "ImageObject",
      url: `${pageUrl(path)}${path === "/" ? "" : "/"}opengraph-image`,
      width: "1200",
      height: "630",
    },
    dateModified: route.lastModified,
    inLanguage: "en",
  };
  if (path !== "/") page.breadcrumb = { "@id": breadcrumbId(path) };
  if (mentions?.length) page.mentions = mentions;
  if (mainEntity) page.mainEntity = mainEntity;
  return page;
}

export function collectionPage(options: PageOptions): CollectionPage {
  return { ...webPage(options), "@type": "CollectionPage" } as CollectionPage;
}

export function breadcrumb(path: Exclude<RoutePath, "/">): BreadcrumbList {
  const route = routeManifest[path];
  return {
    "@type": "BreadcrumbList",
    "@id": breadcrumbId(path),
    itemListElement: [
      { "@type": "ListItem", position: 1, name: SITE_NAME, item: `${PRODUCTION_ORIGIN}/` },
      { "@type": "ListItem", position: 2, name: route.label, item: pageUrl(path) },
    ],
  };
}

export function itemList(
  path: RoutePath,
  name: string,
  items: { name: string; url: string; description?: string }[],
): ItemList {
  return {
    "@type": "ItemList",
    "@id": listId(path),
    name,
    numberOfItems: items.length,
    itemListOrder: "https://schema.org/ItemListUnordered",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      url: item.url,
      ...(item.description ? { description: item.description } : {}),
    })),
  };
}

export function listRef(path: RoutePath): { "@id": string } {
  return { "@id": listId(path) };
}

/* ------------------------------------------------------------------ */
/* Third-party: Jev by TypeSafe AI                                     */
/* ------------------------------------------------------------------ */

export function typesafeOrganization(): Organization {
  return {
    "@type": "Organization",
    "@id": TYPESAFE_ID,
    name: "TypeSafe AI",
    url: "https://typesafe.ai",
  };
}

/** Jev is TypeSafe AI's product. Agentium integrates it and is never its author. */
export function jevSoftware(): SoftwareApplication {
  return {
    "@type": "SoftwareApplication",
    "@id": JEV_ID,
    name: "Jev",
    description:
      "Decision model by TypeSafe AI that returns typed answers (choice, noul probability, rubric score) instead of prose.",
    applicationCategory: "DeveloperApplication",
    operatingSystem: "Cloud API",
    provider: { "@id": TYPESAFE_ID },
    author: { "@id": TYPESAFE_ID },
    publisher: { "@id": TYPESAFE_ID },
    url: "https://typesafe.ai",
    softwareHelp: { "@type": "CreativeWork", url: "https://docs.typesafe.ai/sdk/javascript" },
  };
}

/** The three global nodes every route starts from. */
export function globalGraph() {
  return [organization(), website(), software()];
}
