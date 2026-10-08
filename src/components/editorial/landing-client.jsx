"use client";

import Landing from "./Landing";
import { MotionProvider } from "../home/Motion";

export function LandingClient() {
  return (
    <MotionProvider>
      <Landing />
    </MotionProvider>
  );
}
