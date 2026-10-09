import Image from "next/image";
import { cn } from "cn";
import { Icon, isIconName } from "./icon";

const logos: Record<string, string> = {
  openai: "openai.svg",
  "openai-realtime": "openai.svg",
  "openai-images": "openai.svg",
  anthropic: "anthropic.svg",
  "google-gemini": "googlegemini.svg",
  "gemini-live": "googlegemini.svg",
  "gemini-images": "googlegemini.svg",
  ollama: "ollama.svg",
  github: "github.svg",
  slack: "slack.svg",
  notion: "notion.svg",
  postgresql: "postgresql.svg",
  redis: "redis.svg",
  elevenlabs: "elevenlabs.svg",
  livekit: "livekit.svg",
  "livekit-sip": "livekit.svg",
  twilio: "twilio.svg",
  sarvam: "sarvam.svg",
  signalwire: "signalwire.svg",
  vonage: "vonage.svg",
  exotel: "exotel.png",
  telnyx: "telnyx.png",
};

export function IntegrationMark({ id, icon, className }: { id: string; icon: string; className?: string }) {
  const logo = logos[id];
  if (logo) {
    return (
      <Image
        src={`/brands/${logo}`}
        alt=""
        width={24}
        height={24}
        unoptimized
        className={cn("shrink-0 object-contain", className)}
      />
    );
  }

  return <Icon name={isIconName(icon) ? icon : "cube"} variant="duotone" className={className} />;
}
