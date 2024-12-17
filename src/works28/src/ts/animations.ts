import { gsap } from "gsap";
import { EASING } from "./utils/constants";

export class Animations {
  mvFadeIn(webgl: any) {
    gsap.to((webgl.mvMesh.mesh?.material as any).uniforms.uIntensity, {
      value: 1,
      duration: 3,
      ease: EASING.MATERIAL,
    });
  }

  mvFadeOut(webgl: any) {
    const targets = document.querySelectorAll("[data-transition-link]");

    targets.forEach((target) => {
      target.addEventListener("click", (e) => {
        e.preventDefault();
        const href = target.getAttribute("href")!;
        document.body.classList.add("is-transition");

        setTimeout(() => {
          gsap.to((webgl.mvMesh.mesh?.material as any).uniforms.uIntensity, {
            value: 0,
            duration: 3,
            ease: EASING.MATERIAL,
          });
        }, 1000);

        setTimeout(() => {
          window.location.href = href;
        }, 2500);
      });
    });
  }
}
