import gsap from "gsap";
import { EASING } from "./constants";
import { mouseCoordinate } from "./utils";

type ModalInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  isShow: boolean;
};

export const clickMouseEvent = (mesh: THREE.Mesh, modalInfo: ModalInfo) => {
  gsap.to(mesh.position, {
    x: modalInfo.x,
    y: modalInfo.y,
    z: 10,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.scale, {
    x: modalInfo.width,
    y: modalInfo.height,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.rotation, {
    y: 0,
    duration: 0.5,
    ease: EASING.transform,
  });
};

export const closeModal = (
  mesh: THREE.Mesh,
  saveMeshInfo: { x: number; y: number; z: number; w: number; h: number }
) => {
  gsap.to(mesh.position, {
    x: saveMeshInfo.x,
    y: saveMeshInfo.y,
    z: saveMeshInfo.z,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.scale, {
    x: saveMeshInfo.w,
    y: saveMeshInfo.h,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.rotation, {
    y: (Math.PI / 180) * 180
  })
};

export const moveMouseEvent = (
  mesh: THREE.Mesh,
  element: HTMLElement | null
) => {
  if (!element) return;

  element.addEventListener("mousemove", (e) => {
    const { x, y } = mouseCoordinate(e, element);
    (mesh.material as any).uniforms.uMouse.value = { x, y };

    gsap.to(mesh.rotation, {
      x: y * 0.7,
      y: -x * 0.7,
      duration: 0.5,
      ease: "power1.out",
    });
  });

  element.addEventListener("mouseleave", () => {
    gsap.to(mesh.rotation, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASING.transform,
    });

    gsap.to((mesh.material as any).uniforms.uMouse.value, {
      x: 0,
      y: 0,
      duration: 0.5,
      ease: EASING.transform,
    });
  });
};

export const hideCardAnimation = (mesh: THREE.Mesh) => {
  gsap.to(mesh.position, {
    z: -100,
    duration: 0.5,
    ease: EASING.transform,
  });
};

export const textAnimation = () => {
  // text animation
  const elements = document.querySelectorAll<HTMLElement>(".text__wrapper p");
  if (!elements) return;
  elements.forEach((element) => {
    const { width } = element.getBoundingClientRect();
    element?.style.setProperty("--text-width", `${String(width)}px`);
  });
};

export const loadingAnimation = (element: HTMLElement) => {
  element.classList.add("is-active");
};
