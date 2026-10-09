import Image from "next/image";
import { cn } from "cn";
import { Icon, isIconName } from "./icon";

const logos: Record<string, string> = {
  openai: "openai",
  "openai-realtime": "openai",
  "openai-images": "openai",
  anthropic: "anthropic",
  "google-gemini": "googlegemini",
  ollama: "ollama",
  github: "github",
  slack: "slack",
  notion: "notion",
  postgresql: "postgresql",
  redis: "redis",
  elevenlabs: "elevenlabs",
  livekit: "livekit",
  twilio: "twilio",
};

export function IntegrationMark({ id, icon, className }: { id: string; icon: string; className?: string }) {
  const logo = logos[id];
  if (logo) {
    return (
      <Image
        src={`/brands/${logo}.svg`}
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
