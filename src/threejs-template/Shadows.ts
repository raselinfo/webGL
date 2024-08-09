import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

import GUI from "lil-gui";

/**
 Shadows
 Following lights can cast the shadows
  - Point Light
  - Directional Light
  - Spot Light
 */

export const shadows = (canvas: HTMLCanvasElement) => {
  const gui = new GUI();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  const scene = new Three.Scene();

  //   Texture
  const textureLoader = new Three.TextureLoader();
  const bakedTexture = textureLoader.load("/public/textures/bakedShadow.jpg");
  const simpleTexture = textureLoader.load("/public/textures/simpleShadow.jpg");

  // Lights
  const ambientLight = new Three.AmbientLight(0xffffff, 0.5);
  scene.add(ambientLight);

  const directionalLight = new Three.DirectionalLight(0xffffff, 0.5);
  directionalLight.position.set(2, 2, -1);

  directionalLight.castShadow = true;
  directionalLight.shadow.mapSize.width = 1024;
  directionalLight.shadow.mapSize.height = 1024;
  directionalLight.shadow.camera.top = 2;
  directionalLight.shadow.camera.bottom = -2;
  directionalLight.shadow.camera.left = -2;
  directionalLight.shadow.camera.right = 2;
  directionalLight.shadow.camera.near = 1;
  directionalLight.shadow.camera.far = 6;
  //   directionalLight.shadow.radius = 5;
  scene.add(directionalLight);

  //   Spot Light
  const spotLight = new Three.SpotLight(0xffffff, 5, 10, Math.PI * 0.3);
  spotLight.castShadow = true;
  spotLight.position.set(0, 2, 2);
  spotLight.shadow.mapSize.width = 1024;
  spotLight.shadow.mapSize.height = 1024;
  spotLight.shadow.camera.fov = 30;
  spotLight.shadow.camera.near = 1;
  spotLight.shadow.camera.far = 5;
  scene.add(spotLight);
  scene.add(spotLight.target);

  //   Point Light
  const pointLight = new Three.PointLight(0xffffff, 1.5);
  pointLight.castShadow = true;
  pointLight.shadow.mapSize.width = 1024;
  pointLight.shadow.mapSize.height = 1024;
  pointLight.shadow.camera.near = 0.1;
  pointLight.shadow.camera.far = 5;
  pointLight.position.set(-1, 1, 0);
  scene.add(pointLight);

  //   Light Camera Helper
  const directionalLightCamera = new Three.CameraHelper(
    directionalLight.shadow.camera
  );
  //   scene.add(directionalLightCamera);
  const spotLightCamera = new Three.CameraHelper(spotLight.shadow.camera);
  // scene.add(spotLightCamera);

  const pointLightCamera = new Three.CameraHelper(pointLight.shadow.camera);
  //   scene.add(pointLightCamera);

  //   Material
  const material = new Three.MeshStandardMaterial();
  material.roughness = 0.4;

  //   Objects
  const sphere = new Three.Mesh(
    new Three.SphereGeometry(0.5, 32, 32),
    material
  );
  sphere.castShadow = true;

  const plane = new Three.Mesh(
    new Three.PlaneGeometry(5, 5),
    new Three.MeshBasicMaterial({
    //   map: bakedTexture,
    })
  );
  plane.receiveShadow = true;

  plane.rotation.x = -Math.PI * 0.5;
  plane.position.y = -0.5;

  const sphereShadow = new Three.Mesh(
    new Three.PlaneGeometry(1.5, 1.5),
    new Three.MeshBasicMaterial({
      color: "black",
      alphaMap: simpleTexture,
      transparent: true,
    })
  );
  sphereShadow.rotation.x = -Math.PI * 0.5;
  sphereShadow.position.y = plane.position.y + 0.001;
  scene.add(sphere, plane, sphereShadow);
  //   gui.add(plane.position, "x").name("position x").min(-10).max(10).step(0.1);
  //   gui.add(plane.position, "y").name("position y").min(-10).max(10).step(0.1);
  //   gui.add(plane.position, "z").name("position z").min(-10).max(10).step(0.1);
  //   gui.add(plane.rotation, "x").name("rotation x").min(-10).max(10).step(0.1);
  //   gui.add(plane.rotation, "y").name("rotation y").min(-10).max(10).step(0.1);
  //   gui.add(plane.rotation, "z").name("rotation z").min(-10).max(10).step(0.1);

  // Camera
  const aspectRatio = sizes.width / sizes.height;
  const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.x = 1;
  camera.position.y = 1;
  camera.position.z = 2;

  //   Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //   Renderer
  const renderer = new Three.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  //   renderer.shadowMap.enabled = true;
  //   renderer.shadowMap.type = Three.PCFSoftShadowMap;

  //  Animation
  const clock = new Three.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();

    sphere.position.x = Math.cos(elapsedTime) * 1.5;
    sphere.position.z = Math.sin(elapsedTime) * 1.5;
    sphere.position.y = Math.abs(Math.sin(elapsedTime *2));


    sphereShadow.position.x= sphere.position.x
    sphereShadow.position.z= sphere.position.z

    sphereShadow.material.opacity= (1-sphere.position.y) * 0.3

    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(tick);
  };
  tick();

  //   resize
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
  });
};
