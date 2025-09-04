namespace App {
  interface Locals {
    posthog?: import('posthog-node').PostHog & { distinctId: string };
  }
}
