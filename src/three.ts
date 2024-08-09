// import * as Three from "three";
// import gsap from "gsap";
// import { OrbitControls } from "three/addons/controls/OrbitControls.js";
// import GUI from "lil-gui";
// import { enableGui, resize, toggleFullScreen } from "./utils";
// import { texture } from "./threejs-template/textures";
// import { materials } from "./threejs-template/metarials";
// import { ThreeDText } from "./threejs-template/3dText";

import { ThreeDText } from "./threejs-template/3dText";
import { light } from "./threejs-template/Light";
import { materials } from "./threejs-template/metarials";
import { shadows } from "./threejs-template/Shadows";

// export const setupThree = (canvas: HTMLCanvasElement) => {
//   // Scene---
//   const scene = new Three.Scene();

//   const DEBUG_DEFAULT = {
//     color: "#37ff00",
//     wireframe: false,
//   };

//   const material = new Three.MeshBasicMaterial({
//     color: DEBUG_DEFAULT.color,
//     wireframe: DEBUG_DEFAULT.wireframe,
//   });
//   const geoMetry = new Three.BoxGeometry(1, 1, 1, 2, 2, 1);
//   const cube1 = new Three.Mesh(geoMetry, material);

//   scene.add(cube1);

//   // Camera---
//   const sizes = {
//     width: window.innerWidth,
//     height: window.innerHeight,
//   };
//   const aspectRatio = sizes.width / sizes.height;
//   const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);

//   camera.position.z = 3;
//   camera.lookAt(cube1.position);
//   scene.add(camera);

//   // Controls---
//   const controls = new OrbitControls(camera, canvas);
//   controls.enableDamping = true;
//   controls.enabled = true;

//   // Renderer---
//   const rendered = new Three.WebGLRenderer({ canvas });
//   rendered.setSize(sizes.width, sizes.height);
//   rendered.setPixelRatio(Math.min(window.devicePixelRatio, 2));

//   // Animation---
//   const tick = () => {
//     controls.update();
//     rendered.render(scene, camera);
//     window.requestAnimationFrame(tick);
//   };
//   tick();

//   // Utils---
//   resize(sizes, camera, rendered);
//   // toggleFullScreen(canvas);
//   enableGui({
//     mesh: cube1,
//     material,
//     geoMetry,
//     DEBUG_DEFAULT,
//   });
// };

export const setupThree = (canvas: HTMLCanvasElement) => {
  // texture(canvas)
  // materials(canvas)
  // ThreeDText(canvas);
  // light(canvas);
  shadows(canvas)
};
