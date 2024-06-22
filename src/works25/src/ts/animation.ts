import gsap from "gsap";
import { EASING } from "./constants";
import { clientRectCoordinate, mouseCoordinate } from "./utils";

type ModalInfo = {
  x: number;
  y: number;
  width: number;
  height: number;
  isShow: boolean;
};

export const loadingAnimation = (
  mesh: THREE.Mesh,
  element: HTMLElement | null
) => {
  if (!element) return;

  const rect = element.getBoundingClientRect();
  const { x, y } = clientRectCoordinate(rect);
  const tl = gsap.timeline();

  tl.to(mesh.scale, {
    x: rect.width,
    y: rect.height,
    duration: 1,
    ease: EASING.transform,
  })
  .to(mesh.rotation, {
    z: (Math.PI / 180) * 360,
    duration: 0.5,
    ease: EASING.transform,
  }, '-=1')
  .to(mesh.position, {
    x,
    y,
    z: 0,
    duration: 1,
    ease: EASING.transform,
  })
};

export const textAnimation = () => {
  // text animation
  const elements = document.querySelectorAll<HTMLElement>(".text__wrapper span p");
  if (!elements) return;
  elements.forEach((element) => {
    const { width } = element.getBoundingClientRect();
    element?.style.setProperty("--text-width", `${String(width)}px`);
  });
};

export const onMeshScaleUp = (mesh: THREE.Mesh, modalInfo: ModalInfo) => {
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

export const onMeshScaleDown = (
  mesh: THREE.Mesh,
  frame: { x: number; y: number; z: number; w: number; h: number }
) => {
  gsap.to(mesh.position, {
    x: frame.x,
    y: frame.y,
    z: frame.z,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.scale, {
    x: frame.w,
    y: frame.h,
    duration: 0.5,
    ease: EASING.transform,
  });

  gsap.to(mesh.rotation, {
    y: (Math.PI / 180) * 180,
  });
};

export const onMouseMove = (
  e: MouseEvent,
  mesh: THREE.Mesh,
  element: HTMLElement | null
) => {
  if (!element) return;

  const { x, y } = mouseCoordinate(e, element);
  (mesh.material as any).uniforms.uMouse.value = { x, y };

  gsap.to(mesh.rotation, {
    x: y * 0.7,
    y: -x * 0.7,
    duration: 0.5,
    ease: "power1.out",
  });
};

export const onMouseLeave = (mesh: THREE.Mesh) => {
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
};

export const backCardAnimation = (mesh: THREE.Mesh) => {
  gsap.to(mesh.position, {
    z: -100,
    duration: 0.5,
    ease: EASING.transform,
  });
};

export const frontCardAnimation = (mesh: THREE.Mesh) => {
  gsap.to(mesh.position, {
    z: 0,
    duration: 0.5,
    ease: EASING.transform,
  });
};
