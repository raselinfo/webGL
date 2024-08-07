import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import { resize } from "../utils";

export const ThreeDText = (canvas: HTMLCanvasElement) => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const aspectRatio = sizes.width / sizes.height;
  const scene = new Three.Scene();

  const geometry = new Three.BoxGeometry(1, 1, 1);
  const material = new Three.MeshBasicMaterial({
    color: 0xffffff,
  });
  const mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);

  //   Camera------
  const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.z = 3;

  //   Controls------
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  // Renderer------
  const renderer = new Three.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const tick = () => {
    controls.update();

    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });
};
