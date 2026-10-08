import { createContext, useContext, useEffect, useRef, useState } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { Icon } from "./UI";

const MotionContext = createContext({ enabled: false });
export const usePageMotion = () => useContext(MotionContext);
const easeOut = "cubic-bezier(0.23, 1, 0.32, 1)";

export function MotionProvider({ children }) {
  const [paused, setPaused] = useState(false);
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(preference.matches);
    update();
    preference.addEventListener("change", update);
    return () => preference.removeEventListener("change", update);
  }, []);
  const enabled = !paused && !reduced;
  useEffect(() => {
    document.documentElement.dataset.motion = enabled ? "on" : "off";
    return () => delete document.documentElement.dataset.motion;
  }, [enabled]);
  return (
    <MotionContext.Provider value={{ enabled, reduced, paused, setPaused }}>
      <PageMotion enabled={enabled} />
      {children}
    </MotionContext.Provider>
  );
}

export function MotionToggle() {
  const { enabled, reduced, setPaused } = usePageMotion();
  return (
    <button
      className="motion-toggle"
      aria-label={enabled ? "Pause animations" : "Enable animations"}
      aria-pressed={!enabled}
      onClick={() => setPaused(enabled)}
      disabled={reduced}
    >
      <Icon name={enabled ? "pause" : "play"} size={13} />
      {reduced ? "Reduced motion" : enabled ? "Motion on" : "Motion paused"}
    </button>
  );
}

function PageMotion({ enabled }) {
  const revealed = useRef(new WeakSet());
  useEffect(() => {
    if (
      !enabled ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches
    )
      return;
    const animations = new Set();
    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.12,
      smoothWheel: true,
      syncTouch: false,
      anchors: false,
      prevent: (node) => node.hasAttribute?.("data-lenis-prevent"),
    });
    const animate = (element, delay = 0) => {
      const animation = element.animate(
        [
          { opacity: 0.15, transform: "translateY(22px)" },
          { opacity: 1, transform: "translateY(0)" },
        ],
        { duration: 650, delay, easing: easeOut },
      );
      animations.add(animation);
      animation.onfinish = () => animations.delete(animation);
    };
    // Content is always rendered and visible; motion is progressive enhancement.
    const observer = new IntersectionObserver(
      (entries) => {
        let index = 0;
        entries.forEach(({ isIntersecting, target }) => {
          if (!isIntersecting || revealed.current.has(target)) return;
          revealed.current.add(target);
          observer.unobserve(target);
          animate(target, index++ * 60);
        });
      },
      { threshold: 0.08, rootMargin: "0px 0px -30px 0px" },
    );
    document
      .querySelectorAll("[data-reveal]")
      .forEach((element) => observer.observe(element));
    const waveObserver = new IntersectionObserver((entries) => {
      entries.forEach(({ isIntersecting, target }) => {
        target.dataset.waveActive = String(isIntersecting);
      });
    });
    const waves = document.querySelectorAll(".studio-mini-wave, .voice-signal");
    waves.forEach((element) => waveObserver.observe(element));
    const onAnchor = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (
        !link ||
        event.defaultPrevented ||
        event.button !== 0 ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey
      )
        return;
      const href = link.getAttribute("href");
      const target = document.getElementById(href.slice(1));
      if (!target) return;
      // Keyboard navigation and skip links remain immediate and native.
      if (event.detail === 0 || link.classList.contains("skip-link")) {
        lenis.scrollTo(target, { immediate: true, offset: -96 });
        return;
      }
      event.preventDefault();
      if (window.location.hash !== href)
        window.history.pushState(null, "", href);
      lenis.scrollTo(target, {
        offset: -96,
        duration: 0.9,
        onComplete: () => {
          const hadTabIndex = target.hasAttribute("tabindex");
          if (!hadTabIndex) target.setAttribute("tabindex", "-1");
          target.focus({ preventScroll: true });
          if (!hadTabIndex)
            target.addEventListener(
              "blur",
              () => target.removeAttribute("tabindex"),
              { once: true },
            );
        },
      });
    };
    const onToggle = (event) => {
      if (event.target.tagName !== "DETAILS" || !event.target.open) return;
      const content = event.target.querySelector("p");
      if (content) {
        const animation = content.animate(
          [
            { opacity: 0, transform: "translateY(-5px)" },
            { opacity: 1, transform: "translateY(0)" },
          ],
          { duration: 200, easing: easeOut },
        );
        animations.add(animation);
        animation.onfinish = () => animations.delete(animation);
      }
    };
    const onVisibility = () => (document.hidden ? lenis.stop() : lenis.start());
    document.addEventListener("click", onAnchor);
    document.addEventListener("toggle", onToggle, true);
    document.addEventListener("visibilitychange", onVisibility);
    return () => {
      lenis.destroy();
      observer.disconnect();
      waveObserver.disconnect();
      waves.forEach((element) => delete element.dataset.waveActive);
      animations.forEach((animation) => animation.cancel());
      document.removeEventListener("click", onAnchor);
      document.removeEventListener("toggle", onToggle, true);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [enabled]);
  return null;
}
