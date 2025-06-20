import type { Metadata } from "next";
import OnboardingFlow from "@/@src/components/onboarding";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Welcome to Vibe Connect | Complete Your Setup",
  description:
    "Complete your profile and business setup to start using Vibe Connect",
};

export default function OnboardingPage() {
  return (
    <Suspense>
      <OnboardingFlow />
    </Suspense>
  );
}
