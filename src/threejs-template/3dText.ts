import * as Three from "three";
import { OrbitControls, TextGeometry } from "three/examples/jsm/Addons.js";
import { resize } from "../utils";

import { FontLoader } from "three/examples/jsm/Addons.js";

export const ThreeDText = (canvas: HTMLCanvasElement) => {
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const aspectRatio = sizes.width / sizes.height;
  const scene = new Three.Scene();

  // Texture Loader ----
  const textureLoader = new Three.TextureLoader();
  const matCapTexture = textureLoader.load("/public/matcaps/1.png");
  matCapTexture.colorSpace = Three.SRGBColorSpace;

  // Font Loader ----
  const fontLoader = new FontLoader();
  fontLoader.load("/public/fonts/helvetiker_regular.typeface.json", (font) => {
    const textGeometry = new TextGeometry("Hello three.js", {
      font: font,
      size: 0.5,
      depth: 0.2,
      curveSegments: 4,
      bevelEnabled: true,
      bevelThickness: 0.03,
      bevelSize: 0.02,
      bevelOffset: 0,
      bevelSegments: 4,
    });

    textGeometry.computeBoundingBox();
    textGeometry.center();
    // textGeometry.translate(
    //   -textGeometry.boundingBox!.max.x * 0.5,
    //   -textGeometry.boundingBox!.max.y * 0.5,
    //   -textGeometry.boundingBox!.max.z * 0.5
    // );

    const textMaterial = new Three.MeshMatcapMaterial({
      matcap: matCapTexture,
    });
    const textMesh = new Three.Mesh(textGeometry, textMaterial);

    scene.add(textMesh);

    // Add Donuts
    const donutsGeometry = new Three.TorusGeometry(0.3, 0.2, 20, 45);

    for (let i = 0; i < 200; i++) {
      const donut = new Three.Mesh(donutsGeometry, textMaterial);
      donut.position.x= (Math.random() - 0.5) * 10;
      donut.position.y= (Math.random() - 0.5) * 10;
      donut.position.z= (Math.random() - 0.5) * 10;

      donut.rotation.x = Math.random() * Math.PI;
      donut.rotation.y = Math.random() * Math.PI;

      const scale= Math.random()
      donut.scale.set(scale, scale, scale)

      scene.add(donut);
    }
  });

  // Axes Helper ----
  // const axesHelper = new Three.AxesHelper(10);
  // scene.add(axesHelper);

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
