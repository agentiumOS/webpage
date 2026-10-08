import { useState } from "react";
import Image, { getImageProps } from "next/image";
import { Brand, CopyButton, Icon, Logo } from "../home/UI";
import { MotionToggle } from "../home/Motion";
import Atmosphere from "../home/Atmosphere";
import { examples, faqs, integrations, site } from "../../site-data";
import { Highlight, themes } from "prism-react-renderer";
import { track } from "@/lib/analytics";

const link = (path) => `${site.docs}${path}`;
const brands = [
  ["openai", "OpenAI"],
  ["anthropic", "Anthropic"],
  ["googlegemini", "Gemini"],
  ["elevenlabs", "ElevenLabs"],
  ["twilio", "Twilio"],
  ["ollama", "Ollama"],
];
const nav = [
  ["Capabilities", "#platform"],
  ["Integrations", "#integrations"],
  ["Examples", "/examples"],
  ["Jev", "/jev"],
];

function Action({ href, children, light = false, secondary = false, ctaId, location }) {
  return (
    <a
      className={`action ${light ? "action-light" : ""} ${secondary ? "action-secondary" : ""}`}
      href={href}
      data-track={ctaId ? "cta_click" : undefined}
      data-track-cta-id={ctaId}
      data-track-location={location}
    >
      {children}
      <Icon name="arrow" size={18} />
    </a>
  );
}
function Kicker({ children, number }) {
  return (
    <div className="kicker">
      {number && <span>{number}</span>}
      {children}
    </div>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  return (
    <header
      className="masthead"
      onKeyDown={(e) => {
        if (e.key === "Escape") {
          setOpen(false);
          e.currentTarget.querySelector("button")?.focus();
        }
      }}
    >
      <div className="masthead-inner">
        <Logo />
        <nav className="desktop-navigation" aria-label="Main navigation">
          {nav.map(([label, href]) => (
            <a key={href} href={href} data-track="nav_click" data-track-location="header">
              {label}
            </a>
          ))}
          <a href={site.docs} data-track="nav_click" data-track-location="header">
            Documentation <Icon name="external" size={12} />
          </a>
        </nav>
        <div className="masthead-actions">
          <a
            className="source-link"
            href={site.github}
            aria-label="Agentium on GitHub"
          >
            <Brand name="github" size={21} />
          </a>
          <Action href={link("/quickstart")} ctaId="nav_start_building" location="header">Quickstart</Action>
          <button
            className="menu-toggle"
            aria-label={open ? "Close navigation" : "Open navigation"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(!open)}
          >
            <Icon name={open ? "close" : "menu"} />
          </button>
        </div>
      </div>
      {open && (
        <nav
          id="mobile-menu"
          className="mobile-menu"
          aria-label="Mobile navigation"
        >
          {nav.map(([label, href]) => (
            <a key={href} href={href} onClick={() => setOpen(false)} data-track="nav_click" data-track-location="mobile_nav">
              {label}
              <Icon name="arrow" size={17} />
            </a>
          ))}
          <a href={site.docs} data-track="nav_click" data-track-location="mobile_nav">
            Documentation
            <Icon name="external" size={17} />
          </a>
        </nav>
      )}
    </header>
  );
}

function MiniWave({ className = "" }) {
  return (
    <div
      className={`mini-wave studio-mini-wave ${className}`}
      aria-hidden="true"
    >
      {[
        9, 16, 30, 19, 42, 59, 37, 68, 43, 30, 51, 33, 21, 38, 19, 12, 25, 15,
      ].map((height, i) => (
        <i key={i} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
function Cover() {
  const { props: coverImage } = getImageProps({
    src: "/media/meadow-editorial.webp",
    alt: "",
    width: 1536,
    height: 1024,
    sizes: "100vw",
    fetchPriority: "high",
  });
  const {
    props: { srcSet: mobileCover },
  } = getImageProps({
    src: "/media/meadow-mobile.webp",
    alt: "",
    width: 768,
    height: 1024,
    sizes: "100vw",
  });
  return (
    <>
      <section className="cover" aria-labelledby="cover-title">
        <picture className="cover-landscape">
          <source media="(max-width:640px)" srcSet={mobileCover} />
          <img {...coverImage} alt="" />
        </picture>
        <div className="cover-haze" aria-hidden="true" />
        <div className="cover-copy">
          <div className="cover-label">
            <span />
            Open-source AI SDK · MIT licensed
          </div>
          <h1 id="cover-title">
            Build AI apps.
            <br />
            <em>In TypeScript.</em>
          </h1>
          <p>
            Compose agents, voice, images, and phone calls with modular APIs.
            Add harnesses, workflows, memory, and cost tracking in your Node.js
            application.
          </p>
          <div className="cover-actions">
            <Action href={link("/quickstart")} ctaId="hero_primary" location="hero">Read the quickstart</Action>
            <a className="quiet-link" href="#platform" data-track="cta_click" data-track-cta-id="hero_secondary" data-track-location="hero">
              Explore the SDK{" "}
              <span>
                <Icon name="arrow" size={15} />
              </span>
            </a>
          </div>
          <span className="cover-note">
            npm packages · Node.js · Your infrastructure
          </span>
        </div>
        <div
          className="cover-composition"
          aria-label="Illustrative examples of voice, image creation, and agent workflows"
        >
          <div className="floating-voice">
            <span className="round-icon">
              <Icon name="voice" size={21} />
            </span>
            <div>
              <small>REALTIME VOICE ADAPTERS</small>
              <p>“Explain the next steps.”</p>
            </div>
            <MiniWave />
          </div>
          <div className="floating-art">
            <Image
              src="/media/cloud-study.webp"
              alt="Generated cloud artwork"
              width={750}
              height={1125}
            />
            <span>
              <Icon name="image" size={14} />
              Image toolkit · sample output
            </span>
          </div>
          <div className="floating-plan">
            <div className="floating-plan-heading">
              <Icon name="agent" size={18} />
              <b>Agent run · connected tools</b>
              <span>Example</span>
            </div>
            <div>
              <span className="task-check">
                <Icon name="check" size={15} />
              </span>
              Gather the context
              <Brand name="notion" size={17} />
            </div>
            <div>
              <span className="task-check">
                <Icon name="check" size={15} />
              </span>
              Read the issue
              <Brand name="github" size={17} />
            </div>
            <div>
              <span className="task-check">
                <Icon name="check" size={15} />
              </span>
              Share the findings
              <Brand name="slack" size={17} />
            </div>
          </div>
        </div>
        <div className="cover-bottom">
          <span>Import the SDK. Run it in your application.</span>
          <MotionToggle />
        </div>
      </section>
      <div className="partner-row shell">
        <p>
          Dedicated provider adapters
          <span>Bring your own accounts and API keys.</span>
        </p>
        <div>
          {brands.map(([brand, name]) => (
            <a href="#integrations" key={brand}>
              <Brand name={brand} size={25} />
              <span>{name}</span>
            </a>
          ))}
        </div>
      </div>
    </>
  );
}

const possibilities = [
  {
    id: "assist",
    number: "01",
    title: "Agents and harnesses.",
    subtitle: "Agents & harnesses",
    icon: "agent",
    description:
      "Define a model, instructions, and tools with Agent. Coordinate multiple agents with Team, or add a reusable execution environment with @agentium/harness.",
    detail:
      "Harnesses compose context, skills, policies, budgets, and sessions around Agent, Team, Workflow, or custom execution drivers.",
    path: "/harness/overview",
    cta: "Read the harness guide",
  },
  {
    id: "talk",
    number: "02",
    title: "Add voice. Connect calls.",
    subtitle: "Voice & phone calls",
    icon: "voice",
    description:
      "Use native realtime models or compose a speech-to-text, agent, and text-to-speech pipeline. Add carrier adapters for outbound phone calls.",
    detail:
      "Import voice and telephony through dedicated core subpaths. Your application connects call control, the voice runtime, and audio transport.",
    path: "/voice/overview",
    cta: "Read the voice guide",
  },
  {
    id: "create",
    number: "03",
    title: "Generate images in a workflow.",
    subtitle: "Image generation",
    icon: "image",
    description:
      "Expose OpenAI image generation and editing as tools your agents can call. Use them directly or as steps in an application workflow.",
    detail:
      "Configure the image toolkit with your provider credentials. Generation and editing options depend on the selected model.",
    path: "/toolkits/image-generation",
    cta: "Read the image toolkit guide",
  },
  {
    id: "connect",
    number: "04",
    title: "Define how work executes.",
    subtitle: "Tools & workflows",
    icon: "workflow",
    description:
      "Compose agent calls, toolkit actions, and application code in typed workflows. Define branches, parallel steps, retries, and shared state.",
    detail:
      "Use built-in integrations for services such as GitHub, Notion, and Slack, or define tools for your own application.",
    path: "/workflows/overview",
    cta: "Read the workflow guide",
  },
];
function Possibilities() {
  const [active, setActive] = useState("assist");
  return (
    <section
      className="possibilities shell section-pad"
      id="platform"
      aria-labelledby="possibilities-title"
    >
      <div className="editorial-heading" data-reveal>
        <Kicker>Composable SDK capabilities</Kicker>
        <div>
          <h2 id="possibilities-title">
            One SDK.
            <br />
            <em>Composable APIs.</em>
          </h2>
          <p>
            Start with agents, teams, or workflows in core. Add voice, image
            generation, telephony, and tool integrations through dedicated APIs.
          </p>
        </div>
      </div>
      <div
        className="possibility-selector"
        role="group"
        aria-label="Explore capabilities"
      >
        {possibilities.map((p) => (
          <button
            key={p.id}
            aria-pressed={active === p.id}
            aria-controls={`capability-${p.id}`}
            onClick={() => {
              setActive(p.id);
              track("select_content", { content_type: "platform_item", content_id: p.id });
            }}
          >
            <span>{p.number}</span>
            <Icon name={p.icon} size={22} />
            <b>{p.subtitle}</b>
            <Icon name="arrow" size={18} />
          </button>
        ))}
      </div>
      <div data-reveal>
        {possibilities.map((item) => (
          <div
            key={item.id}
            id={`capability-${item.id}`}
            className={`possibility-stage stage-${item.id}`}
            hidden={active !== item.id}
          >
            <div className="possibility-story">
              <span className="chapter-index">{item.number} / 04</span>
              <h3>{item.title}</h3>
              <p>{item.description}</p>
              <p className="story-detail">{item.detail}</p>
              <Action href={link(item.path)} secondary ctaId={`capability_${item.id}`} location="section:platform">
                {item.cta}
              </Action>
            </div>
            <div className="possibility-visual">
              <CapabilityScene type={item.id} />
            </div>
          </div>
        ))}
      </div>
      <div className="platform-basics">
        <span>Extend your application</span>
        {[
          ["memory", "Memory & knowledge", "/memory/overview"],
          ["shield", "Tool approvals", "/features/approval-gates"],
          ["package", "Background jobs", "/queue/overview"],
        ].map(([icon, label, path]) => (
          <a key={label} href={link(path)}>
            <Icon name={icon} size={18} />
            {label}
            <Icon name="external" size={13} />
          </a>
        ))}
      </div>
    </section>
  );
}

function CapabilityScene({ type }) {
  if (type === "talk")
    return (
      <div className="conversation-scene">
        <div className="conversation-top">
          <span>
            <Icon name="voice" size={16} />
            VoiceAgent session
          </span>
          <small>Illustration</small>
        </div>
        <div className="conversation-orb">
          <Icon name="voice" size={36} />
        </div>
        <p>“Walk me through the next steps.”</p>
        <MiniWave />
        <div className="voice-sequence">
          <span>Listen</span>
          <i />
          <span>Reason</span>
          <i />
          <span>Respond</span>
        </div>
        <div className="scene-brands">
          <Brand name="openai" />
          <Brand name="googlegemini" />
          <Brand name="elevenlabs" />
          <Brand name="twilio" />
          <span>Voice and carrier adapters</span>
        </div>
      </div>
    );
  if (type === "create")
    return (
      <div className="creative-scene">
        <div className="creative-print print-one">
          <Image
            src="/media/cloud-study.webp"
            alt="Generated cumulus cloud study"
            width={750}
            height={1125}
          />
          <span>01 — cloud-study.webp</span>
        </div>
        <div className="creative-print print-two">
          <Image
            src="/media/meadow-editorial.webp"
            alt="Generated meadow study"
            width={1536}
            height={1024}
          />
          <span>02 — meadow-study.webp</span>
        </div>
        <div className="creative-brief">
          <Icon name="image" size={20} />
          <span>
            Image generation · tool output
            <small>Generated artwork · illustrative workflow output</small>
          </span>
        </div>
      </div>
    );
  if (type === "connect")
    return (
      <div className="connected-scene">
        <div className="scene-caption">
          TYPED WORKFLOW · PARALLEL STEPS <span>Illustration</span>
        </div>
        <div className="work-step">
          <Brand name="github" />
          <span>
            <b>Start with an issue</b>
            <small>Read the details from GitHub</small>
          </span>
          <i>01</i>
        </div>
        <div className="work-join" />
        <div className="work-parallel">
          <div>
            <Brand name="notion" />
            <b>Gather context</b>
            <small>Pages & knowledge</small>
          </div>
          <div>
            <Icon name="agent" size={25} />
            <b>Draft an answer</b>
            <small>Agent execution</small>
          </div>
        </div>
        <div className="work-join" />
        <div className="work-step">
          <Brand name="slack" />
          <span>
            <b>Share the findings</b>
            <small>Share the result in Slack</small>
          </span>
          <Icon name="check" size={20} />
        </div>
      </div>
    );
  return (
    <div className="assistant-scene">
      <div className="scene-caption">
        AGENT RUN · MODEL + TOOLS <span>Illustration</span>
      </div>
      <div className="assistant-request">
        <span>You</span>
        <p>Summarise the issues for our next release.</p>
      </div>
      <div className="assistant-reply">
        <Image src="/brand/agentium.svg" alt="" width={30} height={30} unoptimized />
        <div>
          <b>Run completed.</b>
          <p>
            Tool results collected.
            <br />
            Structured response returned.
          </p>
        </div>
      </div>
      <div className="assistant-steps">
        {[
          ["01", "Load context", "Session state + memory"],
          ["02", "Call tools", "Provider and application tools"],
          ["03", "Return a result", "Structured output"],
        ].map(([n, title, detail]) => (
          <div key={n}>
            <span>{n}</span>
            <div>
              <b>{title}</b>
              <small>{detail}</small>
            </div>
            <Icon name="check" size={17} />
          </div>
        ))}
      </div>
      <div className="harness-ribbon">
        <Icon name="harness" size={18} />
        <span>Harness controls</span>
        <i>Skills</i>
        <i>Policies</i>
        <i>Budgets</i>
      </div>
    </div>
  );
}

function WideOpen() {
  return (
    <section
      className="wide-open shell"
      aria-labelledby="wide-open-title"
      data-reveal
    >
      <div className="sky-window">
        <Image
          src="/media/cloud-study.webp"
          alt="Generated cloud study with open blue sky"
          width={750}
          height={1125}
          loading="lazy"
        />
        <span className="sky-window-label">
          Run inside your own application.
        </span>
        <div className="sky-word">
          Your
          <br />
          <em>code.</em>
        </div>
        <span className="sky-caption">Open source · TypeScript · MIT</span>
      </div>
      <div className="wide-open-copy">
        <Kicker>Packages, providers, and deployment</Kicker>
        <h2 id="wide-open-title">
          Choose your stack.
          <br />
          <em>Keep it in your code.</em>
        </h2>
        <p>
          Agentium runs as a dependency in your Node.js application. Choose
          provider and storage adapters, then add the packages your application
          needs.
        </p>
        <div className="choice-list">
          {[
            [
              "01",
              "Connect your providers.",
              "Configure model, speech, and service adapters with your own credentials. Install the provider dependencies you use.",
            ],
            [
              "02",
              "Add packages as needed.",
              "Extend core with harnesses, transport, queues, browser automation, evaluation, or observability.",
            ],
            [
              "03",
              "Deploy with your application.",
              "Your host controls authentication, resource ownership, configuration, and lifecycle. Choose your own infrastructure.",
            ],
          ].map(([n, title, description]) => (
            <div key={n}>
              <span>{n}</span>
              <div>
                <h3>{title}</h3>
                <p>{description}</p>
              </div>
            </div>
          ))}
        </div>
        <a className="underlined-link" href={link("/introduction")}>
          Read the SDK architecture
          <Icon name="arrow" size={18} />
        </a>
      </div>
    </section>
  );
}

function Visibility() {
  return (
    <section
      id="observability"
      className="visibility-section section-pad"
      aria-labelledby="visibility-title"
    >
      <div className="shell visibility-grid" data-reveal>
        <div>
          <Kicker number="↗">Cost accounting & observability</Kicker>
          <h2 id="visibility-title">
            Inspect each run.
            <br />
            <em>Track usage and costs.</em>
          </h2>
          <p>
            Enable cost accounting to see provider usage and estimated charges.
            Set budget checks before new work starts, and add tracing to follow
            model calls and tool actions.
          </p>
          <a className="underlined-link" href={link("/cost/overview")}>
            Read the cost accounting guide
            <Icon name="arrow" size={18} />
          </a>
        </div>
        <div className="usage-ledger">
          <div className="ledger-top">
            <span>Run-level usage</span>
            <small>Illustrative data</small>
          </div>
          <div className="ledger-total">
            <div>
              <span>Estimated run cost</span>
              <strong>
                $0.024<small> USD</small>
              </strong>
            </div>
            <svg viewBox="0 0 180 80" aria-hidden="true">
              <path
                d="M0 72H27V61H54V64H80V42H111V47H139V24H165V10H180"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              />
              <path d="M0 79H180" stroke="#cdd6c5" strokeDasharray="3 5" />
            </svg>
          </div>
          <div className="ledger-lines">
            {[
              ["Model calls", "2"],
              ["Tool calls", "1"],
              ["Tokens used", "3,840"],
              ["Example run budget", "$0.10"],
            ].map(([label, value]) => (
              <div key={label}>
                <span>{label}</span>
                <b>{value}</b>
              </div>
            ))}
          </div>
          <div className="ledger-foot">
            <Icon name="chart" size={16} />
            Usage and cost estimates for an example run.
          </div>
        </div>
      </div>
    </section>
  );
}

function Connections() {
  const [filter, setFilter] = useState("All integrations");
  const visible = integrations.filter(
    (i) => filter === "All integrations" || i.group === filter,
  );
  return (
    <section
      id="integrations"
      className="connections shell section-pad"
      aria-labelledby="connections-title"
    >
      <div className="connections-heading" data-reveal>
        <Kicker>Models, services, and infrastructure</Kicker>
        <h2 id="connections-title">
          Choose your providers.
          <br />
          <em>Connect through adapters.</em>
        </h2>
        <p>
          Configure models, speech services, toolkits, and storage through
          dedicated adapters. Each guide documents setup and supported features.
        </p>
      </div>
      <div
        className="connection-filters"
        role="group"
        aria-label="Filter integrations"
      >
        {[
          "All integrations",
          "Models",
          "Voice & calls",
          "Tools",
          "Infrastructure",
        ].map((group) => (
          <button
            key={group}
            aria-pressed={filter === group}
            onClick={() => {
              setFilter(group);
              track("integration_filter", {
                category: group,
                results_count: integrations.filter((item) => group === "All integrations" || item.group === group).length,
              });
            }}
          >
            {group}
          </button>
        ))}
      </div>
      <div className="connection-wall">
        {visible.map((item) => (
          <a key={item.name} href={link(item.path)} data-track="integration_open" data-track-integration-id={item.name.toLowerCase().replace(/\s+/g, "-")} data-track-category={item.group}>
            <Brand name={item.logo} size={36} />
            <h3>{item.name}</h3>
            <p>{item.detail}</p>
            <span>
              <Icon name="external" size={15} />
            </span>
          </a>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {visible.length} integrations.
      </p>
      <div className="connections-foot">
        <span>
          Your accounts and credentials. Provider usage charges are separate.
        </span>
        <a className="underlined-link" href="/integrations">
          Browse all integrations
          <Icon name="arrow" size={18} />
        </a>
      </div>
    </section>
  );
}

function Builders() {
  const [active, setActive] = useState("agent");
  const example = examples.find((e) => e.id === active);
  return (
    <section
      id="developers"
      className="builders"
      aria-labelledby="builders-title"
    >
      <div className="shell builders-grid" data-reveal>
        <div className="builders-copy">
          <Kicker>Install, configure, run</Kicker>
          <h2 id="builders-title">
            Install core.
            <br />
            <em>Run an agent.</em>
          </h2>
          <p>
            Install @agentium/core and a provider dependency. Configure your
            credentials, define an Agent, and call run() from your application.
            Explore team and voice examples below.
          </p>
          <Action href={link("/quickstart")} ctaId="code_quickstart" location="section:developers">Read the quickstart</Action>
          <a className="builders-source" href={site.github}>
            <Brand name="github" size={20} />
            View source on GitHub
            <Icon name="external" size={13} />
          </a>
        </div>
        <div className="builder-editor">
          <div className="editor-top">
            <span>
              <i />
              <i />
              <i />
            </span>
            <b>{example.file}</b>
            <Brand name="typescript" size={16} />
          </div>
          <div
            className="example-selector"
            role="group"
            aria-label="Choose a code example"
          >
            {examples.map((e) => (
              <button
                key={e.id}
                onClick={() => {
                  setActive(e.id);
                  track("code_tab_select", { sample_id: e.id, link_location: "section:developers" });
                }}
                aria-pressed={active === e.id}
              >
                {e.label}
              </button>
            ))}
          </div>
          <div className="builder-install">
            <span>$</span>
            <code>{example.install}</code>
            <CopyButton label="Copy install command" value={example.install} onCopied={() => track("copy_install_command", { command: example.install, link_location: "section:developers" })} />
          </div>
          <div
            className="builder-code"
            key={example.id}
            data-lenis-prevent
            tabIndex={0}
            role="region"
            aria-label={`${example.file} code example`}
          >
            <Highlight
              theme={themes.github}
              code={example.code}
              language="typescript"
            >
              {({ tokens, getLineProps, getTokenProps }) => (
                <pre>
                  {tokens.map((line, i) => (
                    <div key={i} {...getLineProps({ line })}>
                      <span className="code-number" aria-hidden="true">
                        {i + 1}
                      </span>
                      {line.map((token, key) => (
                        <span key={key} {...getTokenProps({ token })} />
                      ))}
                    </div>
                  ))}
                </pre>
              )}
            </Highlight>
          </div>
          <div className="editor-bottom">
            <CopyButton value={example.code} label="Copy code" onCopied={() => track("code_copy", { sample_id: example.id })} />
            <a href={link(example.path)}>
              Read the guide
              <Icon name="external" size={13} />
            </a>
          </div>
          <p className="builder-note">{example.note}</p>
        </div>
      </div>
    </section>
  );
}

function Questions() {
  return (
    <section
      id="faq"
      className="questions shell section-pad"
      aria-labelledby="questions-title"
    >
      <div className="question-intro" data-reveal>
        <Kicker>SDK questions</Kicker>
        <h2 id="questions-title">
          Before you integrate.
          <br />
          <em>A few useful details.</em>
        </h2>
        <a className="underlined-link" href={link("/introduction")}>
          Read the documentation
          <Icon name="external" size={15} />
        </a>
      </div>
      <div className="question-list">
        {faqs.map(({ question, answer }) => (
          <details key={question} onToggle={(event) => track("faq_toggle", {
            question_id: question.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, ""),
            state: event.currentTarget.open ? "open" : "closed",
          })}>
            <summary>
              {question}
              <Icon name="plus" size={20} />
            </summary>
            <p>{answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}
function Closing() {
  return (
    <section
      className="closing shell"
      aria-labelledby="closing-title"
      data-reveal
    >
      <div className="closing-art" aria-hidden="true">
        <Atmosphere />
      </div>
      <Kicker>Get started with the SDK</Kicker>
      <h2 id="closing-title">
        Get the SDK.
        <br />
        <em>Start building.</em>
      </h2>
      <p>
        Install core, configure a model provider, and run an agent in your own
        application.
      </p>
      <Action light href={link("/quickstart")} ctaId="final_primary" location="final_cta">
        Follow the quickstart
      </Action>
      <div className="closing-bottom">
        <span>MIT licensed · Run on your infrastructure</span>
        <span>TypeScript · Node.js · MIT</span>
      </div>
    </section>
  );
}
function Footer() {
  return (
    <footer className="footer shell">
      <div className="footer-top">
        <div>
          <Logo />
          <p>
            An open-source TypeScript SDK
            <br />
            for AI applications.
          </p>
        </div>
        <nav aria-label="Product resources">
          <span>SDK capabilities</span>
          <a href={link("/agents/overview")}>Agents</a>
          <a href={link("/harness/overview")}>Harnesses</a>
          <a href={link("/voice/overview")}>Voice & calls</a>
          <a href={link("/toolkits/image-generation")}>Image generation</a>
          <a href={link("/workflows/overview")}>Workflows</a>
        </nav>
        <nav aria-label="Learning resources">
          <span>Developer resources</span>
          <a href={site.docs}>Documentation</a>
          <a href={link("/quickstart")}>Quickstart</a>
          <a href="/examples">Examples</a>
          <a href="/jev">Jev</a>
          <a href={site.github}>GitHub</a>
        </nav>
        <div className="footer-invitation">
          <span>Install core and the OpenAI dependency.</span>
          <div>
            <code>npm i @agentium/core openai</code>
            <CopyButton
              value="npm i @agentium/core openai"
              label="Copy command"
              onCopied={() => track("copy_install_command", { command: "npm i @agentium/core openai", link_location: "footer" })}
            />
          </div>
        </div>
      </div>
      <div className="footer-wordmark" aria-hidden="true">
        agentium<span>.</span>
      </div>
      <div className="footer-base">
        <span>© {new Date().getUTCFullYear()} Agentium</span>
        <span>Open source, under the MIT license.</span>
        <div>
          <a href="/llms.txt">llms.txt</a>
          <a href="https://www.npmjs.com/org/agentium">
            npm
            <Icon name="external" size={12} />
          </a>
          <MotionToggle />
        </div>
      </div>
    </footer>
  );
}
export default function Landing() {
  return (
    <div id="top" className="landing-page">
      <Header />
      <main id="main">
        <Cover />
        <Possibilities />
        <WideOpen />
        <Visibility />
        <Connections />
        <Builders />
        <Questions />
        <Closing />
      </main>
      <Footer />
    </div>
  );
}
