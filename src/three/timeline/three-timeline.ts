import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

let registered = false;

export function registerThreeTimeline() {
  if (typeof window === "undefined" || registered) {
    return;
  }

  gsap.registerPlugin(ScrollTrigger);
  registered = true;
}

export function createThreeTimeline() {
  registerThreeTimeline();

  return gsap.timeline({
    paused: true,
    defaults: {
      ease: "power2.out",
    },
  });
}
