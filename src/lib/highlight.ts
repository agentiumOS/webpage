import "server-only";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";

/** Restrained graphite theme tuned to the site palette. */
const agentiumDark: ThemeRegistration = {
  name: "agentium-dark",
  type: "dark",
  colors: {
    "editor.background": "#202521",
    "editor.foreground": "#F1EFE7",
  },
  settings: [
    { settings: { foreground: "#F1EFE7", background: "#202521" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#8A948B" } },
    {
      scope: ["keyword", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.control"],
      settings: { foreground: "#D6F268" },
    },
    { scope: ["keyword.operator", "punctuation"], settings: { foreground: "#C3CBC0" } },
    {
      scope: ["string", "string.quoted", "punctuation.definition.string"],
      settings: { foreground: "#EBD9A8" },
    },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#EBD9A8" } },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function"],
      settings: { foreground: "#BBD5EE" },
    },
    { scope: ["entity.name.type", "support.class", "support.type", "new.expr entity.name.type"], settings: { foreground: "#F1EFE7" } },
    { scope: ["variable", "variable.other", "meta.object-literal.key"], settings: { foreground: "#F1EFE7" } },
    { scope: ["variable.other.property", "support.variable.property"], settings: { foreground: "#DDE3DA" } },
    { scope: ["meta.import variable", "meta.import"], settings: { foreground: "#F1EFE7" } },
  ],
};

let highlighterPromise: Promise<Highlighter> | null = null;

function getHighlighter() {
  if (!highlighterPromise) {
    highlighterPromise = createHighlighter({
      themes: [agentiumDark],
      langs: ["typescript", "bash"],
    });
  }
  return highlighterPromise;
}

export async function highlight(code: string, lang: "typescript" | "bash" = "typescript"): Promise<string> {
  const hl = await getHighlighter();
  return hl.codeToHtml(code.replace(/\n$/, ""), { lang, theme: "agentium-dark" });
}
