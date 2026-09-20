import type { Graph, Thing } from "schema-dts";

/**
 * Serialise JSON-LD so it can never break out of the <script> element.
 * `<`, `>`, `&` and the U+2028/2029 line terminators are escaped as unicode
 * sequences, which JSON parsers read back unchanged.
 */
export function serializeJsonLd(value: unknown): string {
  return JSON.stringify(value)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029");
}

/**
 * One JSON-LD graph per document. Pages compose the full node list (global
 * entities plus page nodes) so nothing is emitted twice and every `@id`
 * reference resolves inside the same script.
 */
export function JsonLd({ graph }: { graph: Thing[] }) {
  const doc: Graph = { "@context": "https://schema.org", "@graph": graph };
  return (
    <script
      type="application/ld+json"
      // Structured data is not executable; a native script tag is correct here.
      dangerouslySetInnerHTML={{ __html: serializeJsonLd(doc) }}
    />
  );
}
