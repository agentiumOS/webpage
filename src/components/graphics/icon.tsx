import { HugeiconsIcon, type HugeiconsIconProps, type IconSvgElement } from "@hugeicons/react";
import * as S from "@hugeicons-pro/core-stroke-rounded";
import * as D from "@hugeicons-pro/core-duotone-rounded";

/**
 * Single icon entry point for the site (Hugeicons Pro).
 * - `stroke` (default): rounded line icons for UI chrome and inline affordances.
 * - `duotone`: official two-tone icons for feature tiles and capability graphics.
 * Every icon is decorative by default (`aria-hidden`); pass `aria-label` when it carries meaning.
 */
const icons = {
  // Chrome / affordances
  arrowRight: [S.ArrowRight02Icon, D.ArrowRight02Icon],
  arrowUpRight: [S.ArrowUpRight01Icon, D.ArrowUpRight01Icon],
  chevronDown: [S.ArrowDown01Icon, D.ArrowDown01Icon],
  copy: [S.Copy01Icon, D.Copy01Icon],
  check: [S.Tick02Icon, D.Tick02Icon],
  checkCircle: [S.CheckmarkCircle02Icon, D.CheckmarkCircle02Icon],
  close: [S.Cancel01Icon, D.Cancel01Icon],
  menu: [S.Menu01Icon, D.Menu01Icon],
  search: [S.Search01Icon, D.Search01Icon],
  plus: [S.PlusSignIcon, D.PlusSignIcon],
  minus: [S.MinusSignIcon, D.MinusSignIcon],
  pause: [S.PauseIcon, D.PauseIcon],
  play: [S.PlayIcon, D.PlayIcon],
  replay: [S.RefreshCcwIcon, D.RefreshCcwIcon],
  loading: [S.Loading03Icon, D.Loading03Icon],
  folder: [S.Folder01Icon, D.Folder01Icon],
  file: [S.File01Icon, D.File01Icon],
  user: [S.UserCircleIcon, D.UserCircleIcon],
  sparkle: [S.SparkleIcon, D.SparkleIcon],
  home: [S.Home01Icon, D.Home01Icon],
  grid: [S.Grid02Icon, D.Grid02Icon],
  doc: [S.Doc01Icon, D.Doc01Icon],

  // Feature marks
  layers: [S.Layers01Icon, D.Layers01Icon],
  wrench: [S.Wrench01Icon, D.Wrench01Icon],
  database: [S.Database01Icon, D.Database01Icon],
  gitBranch: [S.GitBranchIcon, D.GitBranchIcon],
  shieldCheck: [S.ShieldCheckIcon, D.ShieldCheckIcon],
  activity: [S.Activity03Icon, D.Activity03Icon],
  gauge: [S.DashboardSpeed02Icon, D.DashboardSpeed02Icon],
  flask: [S.FlaskConicalIcon, D.FlaskConicalIcon],
  bookOpen: [S.BookOpen01Icon, D.BookOpen01Icon],
  code: [S.SourceCodeIcon, D.SourceCodeIcon],
  brain: [S.AiBrain04Icon, D.AiBrain04Icon],
  workflow: [S.WorkflowCircle04Icon, D.WorkflowCircle04Icon],
  team: [S.UserGroupIcon, D.UserGroupIcon],
  mic: [S.Mic01Icon, D.Mic01Icon],
  image: [S.Image02Icon, D.Image02Icon],
  phone: [S.Call02Icon, D.Call02Icon],
  browser: [S.BrowserIcon, D.BrowserIcon],
  api: [S.ApiIcon, D.ApiIcon],
  server: [S.ServerIcon, D.ServerIcon],
  note: [S.Note01Icon, D.Note01Icon],
  key: [S.Key01Icon, D.Key01Icon],
  invoice: [S.Invoice01Icon, D.Invoice01Icon],
  chart: [S.ChartLineData01Icon, D.ChartLineData01Icon],
  target: [S.Target02Icon, D.Target02Icon],
  cube: [S.CubeIcon, D.CubeIcon],
  audio: [S.AudioWave01Icon, D.AudioWave01Icon],
  terminal: [S.TerminalIcon, D.TerminalIcon],
  arrowUp: [S.ArrowUp02Icon, D.ArrowUp02Icon],
  globe: [S.Globe02Icon, D.Globe02Icon],

  // Integration marks (Pro brand/service icons where available)
  chatgpt: [S.ChatGptIcon, D.ChatGptIcon],
  claude: [S.ClaudeIcon, D.ClaudeIcon],
  gemini: [S.GoogleGeminiIcon, D.GoogleGeminiIcon],
  github: [S.GithubIcon, D.GithubIcon],
  slack: [S.SlackIcon, D.SlackIcon],
  notion: [S.Notion01Icon, D.Notion01Icon],
  mail: [S.MailAtSign01Icon, D.MailAtSign01Icon],
  sheets: [S.GoogleSheetIcon, D.GoogleSheetIcon],
  aws: [S.AwsLambdaIcon, D.AwsLambdaIcon],
  microsoft: [S.MicrosoftIcon, D.MicrosoftIcon],
  mcp: [S.McpServerIcon, D.McpServerIcon],
  connect: [S.ConnectIcon, D.ConnectIcon],
  webhook: [S.WebhookIcon, D.WebhookIcon],
  bot: [S.BotIcon, D.BotIcon],
  cloud: [S.CloudServerIcon, D.CloudServerIcon],
  dbZap: [S.DatabaseZapIcon, D.DatabaseZapIcon],
} satisfies Record<string, [IconSvgElement, IconSvgElement]>;

export type IconName = keyof typeof icons;

export function isIconName(name: string): name is IconName {
  return name in icons;
}

export type IconProps = Omit<HugeiconsIconProps, "icon" | "altIcon"> & {
  name: IconName;
  variant?: "stroke" | "duotone";
};

export function Icon({ name, variant = "stroke", strokeWidth = 1.5, size = 24, ...props }: IconProps) {
  const [stroke, duotone] = icons[name];
  return (
    <HugeiconsIcon
      icon={variant === "duotone" ? duotone : stroke}
      size={size}
      strokeWidth={strokeWidth}
      aria-hidden="true"
      focusable="false"
      {...props}
    />
  );
}
