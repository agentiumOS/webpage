import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from "@hugeicons/react";
import * as S from "@hugeicons-pro/core-stroke-rounded";
import * as B from "@hugeicons-pro/core-bulk-rounded";

/**
 * Single icon entry point for the site (Hugeicons Pro).
 * - `stroke` (default): rounded line icons for UI chrome and inline affordances.
 * - `bulk`: two-layer filled icons for feature tiles where a richer mark reads better.
 * Every icon is decorative by default (`aria-hidden`); pass `aria-label` when it carries meaning.
 */
const icons = {
  // Chrome / affordances
  arrowRight: [S.ArrowRight02Icon, B.ArrowRight02Icon],
  arrowUpRight: [S.ArrowUpRight01Icon, B.ArrowUpRight01Icon],
  chevronDown: [S.ArrowDown01Icon, B.ArrowDown01Icon],
  copy: [S.Copy01Icon, B.Copy01Icon],
  check: [S.Tick02Icon, B.Tick02Icon],
  checkCircle: [S.CheckmarkCircle02Icon, B.CheckmarkCircle02Icon],
  close: [S.Cancel01Icon, B.Cancel01Icon],
  menu: [S.Menu01Icon, B.Menu01Icon],
  search: [S.Search01Icon, B.Search01Icon],
  plus: [S.PlusSignIcon, B.PlusSignIcon],
  minus: [S.MinusSignIcon, B.MinusSignIcon],
  pause: [S.PauseIcon, B.PauseIcon],
  play: [S.PlayIcon, B.PlayIcon],
  replay: [S.RefreshCcwIcon, B.RefreshCcwIcon],
  loading: [S.Loading03Icon, B.Loading03Icon],
  folder: [S.Folder01Icon, B.Folder01Icon],
  file: [S.File01Icon, B.File01Icon],
  user: [S.UserCircleIcon, B.UserCircleIcon],
  sparkle: [S.SparkleIcon, B.SparkleIcon],
  home: [S.Home01Icon, B.Home01Icon],
  grid: [S.Grid02Icon, B.Grid02Icon],
  doc: [S.Doc01Icon, B.Doc01Icon],

  // Feature marks
  layers: [S.Layers01Icon, B.Layers01Icon],
  wrench: [S.Wrench01Icon, B.Wrench01Icon],
  database: [S.Database01Icon, B.Database01Icon],
  gitBranch: [S.GitBranchIcon, B.GitBranchIcon],
  shieldCheck: [S.ShieldCheckIcon, B.ShieldCheckIcon],
  activity: [S.Activity03Icon, B.Activity03Icon],
  gauge: [S.DashboardSpeed02Icon, B.DashboardSpeed02Icon],
  flask: [S.FlaskConicalIcon, B.FlaskConicalIcon],
  bookOpen: [S.BookOpen01Icon, B.BookOpen01Icon],
  code: [S.SourceCodeIcon, B.SourceCodeIcon],
  brain: [S.AiBrain04Icon, B.AiBrain04Icon],
  workflow: [S.WorkflowCircle04Icon, B.WorkflowCircle04Icon],
  team: [S.UserGroupIcon, B.UserGroupIcon],
  mic: [S.Mic01Icon, B.Mic01Icon],
  browser: [S.BrowserIcon, B.BrowserIcon],
  api: [S.ApiIcon, B.ApiIcon],
  server: [S.ServerIcon, B.ServerIcon],
  note: [S.Note01Icon, B.Note01Icon],
  key: [S.Key01Icon, B.Key01Icon],
  invoice: [S.Invoice01Icon, B.Invoice01Icon],
  chart: [S.ChartLineData01Icon, B.ChartLineData01Icon],
  target: [S.Target02Icon, B.Target02Icon],
  cube: [S.CubeIcon, B.CubeIcon],
  audio: [S.AudioWave01Icon, B.AudioWave01Icon],
  terminal: [S.TerminalIcon, B.TerminalIcon],
  arrowUp: [S.ArrowUp02Icon, B.ArrowUp02Icon],
  globe: [S.Globe02Icon, B.Globe02Icon],

  // Integration marks (Pro brand/service icons where available)
  chatgpt: [S.ChatGptIcon, B.ChatGptIcon],
  claude: [S.ClaudeIcon, B.ClaudeIcon],
  gemini: [S.GoogleGeminiIcon, B.GoogleGeminiIcon],
  github: [S.GithubIcon, B.GithubIcon],
  slack: [S.SlackIcon, B.SlackIcon],
  notion: [S.Notion01Icon, B.Notion01Icon],
  mail: [S.MailAtSign01Icon, B.MailAtSign01Icon],
  sheets: [S.GoogleSheetIcon, B.GoogleSheetIcon],
  aws: [S.AwsLambdaIcon, B.AwsLambdaIcon],
  microsoft: [S.MicrosoftIcon, B.MicrosoftIcon],
  mcp: [S.McpServerIcon, B.McpServerIcon],
  connect: [S.ConnectIcon, B.ConnectIcon],
  webhook: [S.WebhookIcon, B.WebhookIcon],
  bot: [S.BotIcon, B.BotIcon],
  cloud: [S.CloudServerIcon, B.CloudServerIcon],
  dbZap: [S.DatabaseZapIcon, B.DatabaseZapIcon],
} satisfies Record<string, [IconSvgElement, IconSvgElement]>;

export type IconName = keyof typeof icons;

export function isIconName(name: string): name is IconName {
  return name in icons;
}

export type IconProps = Omit<HugeiconsIconProps, "icon" | "altIcon"> & {
  name: IconName;
  variant?: "stroke" | "bulk";
};

export function Icon({ name, variant = "stroke", strokeWidth = 1.5, size = 24, ...props }: IconProps) {
  const [stroke, bulk] = icons[name];
  return (
    <HugeiconsIcon
      icon={variant === "bulk" ? bulk : stroke}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}
