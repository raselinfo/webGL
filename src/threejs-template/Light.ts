import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { RectAreaLightHelper } from "three/examples/jsm/Addons.js";

export const light = (canvas: HTMLCanvasElement) => {
  const gui = new GUI();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new Three.Scene();

  // Light
  const ambientLight = new Three.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const directionLight = new Three.DirectionalLight(0x00fffc, 2);
  directionLight.position.set(1, 1, 1);
  scene.add(directionLight);

  const hemisphereLight = new Three.HemisphereLight(0xff0000, 0x000ff, 0.3);
  scene.add(hemisphereLight);

  const pointLight = new Three.PointLight(0xff9000, 0.5);
  pointLight.position.set(0.5, -0.5, 1);
  scene.add(pointLight);

  const rectAreaLight = new Three.RectAreaLight(0x00ff00, 5, 0.5, 0.5);
  rectAreaLight.position.set(-2, -0.5, 1.5);
  rectAreaLight.lookAt(new Three.Vector3());
  scene.add(rectAreaLight);

  const spotLight = new Three.SpotLight(0x00ff00, 5, 6, Math.PI * 0.1, 0.25, 1);
  spotLight.position.set(0, 2, 3);
  scene.add(spotLight);
  spotLight.target.position.z = 0.5;
  scene.add(spotLight.target);

  // Light Helper
  const hemisphereLightHelper = new Three.HemisphereLightHelper(
    hemisphereLight,
    0.5
  );
  scene.add(hemisphereLightHelper);
  const pointLightHelper = new Three.PointLightHelper(pointLight, 0.5);
  scene.add(pointLightHelper);
  const sportLightHelper = new Three.SpotLightHelper(spotLight);
  scene.add(sportLightHelper);
  const directionLightHelper = new Three.DirectionalLightHelper(
    directionLight,
    0.2
  );
  scene.add(directionLightHelper);
  const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
  scene.add(rectAreaLightHelper);

  // Material
  const material = new Three.MeshStandardMaterial();
  material.roughness = 0.4;
  // Objects
  const sphere = new Three.Mesh(
    new Three.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.position.x = -1.5;

  const cube = new Three.Mesh(
    new Three.BoxGeometry(0.75, 0.75, 0.75),
    material
  );

  const torus = new Three.Mesh(
    new Three.TorusGeometry(0.3, 0.2, 32, 64),
    material
  );

  torus.position.x = 1.5;

  const plane = new Three.Mesh(new Three.PlaneGeometry(5, 5), material);

  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.65;

  scene.add(sphere, cube, torus, plane);

  // Camera
  const aspectRatio = sizes.width / sizes.height;
  const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;
  scene.add(camera);

  // Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //   Renderer
  const renderer = new Three.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  const clock = new Three.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    // Update objects
    sphere.rotation.y = 0.1 * elapsedTime;
    cube.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = 0.15 * elapsedTime;
    cube.rotation.x = 0.15 * elapsedTime;
    torus.rotation.x = 0.15 * elapsedTime;

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

  // GUI
  gui.add(ambientLight, "intensity").min(0).max(1).step(0.0001);
  gui.addColor(ambientLight, "color");
};
