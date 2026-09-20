import "server-only";
import { createHighlighter, type Highlighter, type ThemeRegistration } from "shiki";

/** Dark theme tuned to the site palette — electric blue keywords on cool graphite. */
const agentiumDark: ThemeRegistration = {
  name: "agentium-dark",
  type: "dark",
  colors: {
    "editor.background": "#121826",
    "editor.foreground": "#F3F6FC",
  },
  settings: [
    { settings: { foreground: "#F3F6FC", background: "#121826" } },
    { scope: ["comment", "punctuation.definition.comment"], settings: { foreground: "#7A8498" } },
    {
      scope: ["keyword", "storage.type", "storage.modifier", "keyword.operator.new", "keyword.control"],
      settings: { foreground: "#8FB6FF" },
    },
    { scope: ["keyword.operator", "punctuation"], settings: { foreground: "#B5BDD0" } },
    {
      scope: ["string", "string.quoted", "punctuation.definition.string"],
      settings: { foreground: "#E8C98A" },
    },
    { scope: ["constant.numeric", "constant.language"], settings: { foreground: "#E8C98A" } },
    {
      scope: ["entity.name.function", "support.function", "meta.function-call entity.name.function"],
      settings: { foreground: "#C5D8FF" },
    },
    { scope: ["entity.name.type", "support.class", "support.type", "new.expr entity.name.type"], settings: { foreground: "#F3F6FC" } },
    { scope: ["variable", "variable.other", "meta.object-literal.key"], settings: { foreground: "#F3F6FC" } },
    { scope: ["variable.other.property", "support.variable.property"], settings: { foreground: "#D5DCEC" } },
    { scope: ["meta.import variable", "meta.import"], settings: { foreground: "#F3F6FC" } },
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
