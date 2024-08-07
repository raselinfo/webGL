import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";

export const texture = (canvas: HTMLCanvasElement) => {
  const scene = new Three.Scene();
  const DEBUG_DEFAULT = {
    color: 0x37ff00,
    wireframe: false,
  };

  // Texture
  //   const image = new Image();
  //   const texture = new Three.Texture(image);
  //   image.onload = () => {
  //     texture.needsUpdate = true;
  //   };
  //   image.src = "/public/textures/door/color.jpg";

  const loadingManager = new Three.LoadingManager();
  const textureLoader = new Three.TextureLoader(loadingManager);
  const imageTexture = textureLoader.load("/public/textures/door/color.jpg");

  loadingManager.onStart = () => {
    console.log("start");
  };
  loadingManager.onLoad = () => {
    console.log("loaded");
  };
  loadingManager.onProgress = () => {
    console.log("progress");
  };
  loadingManager.onError = () => {
    console.log("error");
  };

  //   Rest of the Texture
//   const colorTexture = textureLoader.load("/public/textures/door/color.jpg");
//   const colorTexture = textureLoader.load("/public/textures/checkerboard-1024x1024.png");
  const colorTexture = textureLoader.load("/public/textures/checkerboard-8x8.png");
//   const colorTexture = textureLoader.load("/public/textures/minecraft.png");
  const alphaTexture = textureLoader.load("/public/textures/door/alpha.jpg");
  const heightTexture = textureLoader.load("/public/textures/door/height.jpg");
  const normalTexture = textureLoader.load("/public/textures/door/normal.jpg");
  const ambientOcclusionTexture = textureLoader.load(
    "/public/textures/door/ambientOcclusion.jpg"
  );
  const metalnessTexture = textureLoader.load(
    "/public/textures/door/metalness.jpg"
  );
  const roughnessTexture = textureLoader.load(
    "/public/textures/door/roughness.jpg"
  );

//   colorTexture.repeat.x = 2;
//   colorTexture.repeat.y = 3;
//   colorTexture.wrapS = Three.RepeatWrapping;
//   colorTexture.wrapT = Three.RepeatWrapping;

//   colorTexture.offset.x = 0.5;
//   colorTexture.offset.y = 0.5;

//   colorTexture.rotation = Math.PI / 4;
//   colorTexture.center.x = 0.5;
//   colorTexture.center.y = 0.5;

colorTexture.generateMipmaps=true
colorTexture.minFilter=Three.NearestFilter
colorTexture.magFilter=Three.NearestFilter

  //   Mesh
  const geometry = new Three.BoxGeometry(2, 2, 2, 1, 1, 1);
  //   const geometry = new Three.SphereGeometry(1, 32, 32)
  //   const geometry = new Three.ConeGeometry(1,1, 32)
  //   const geometry = new Three.TorusGeometry(1, 0.5, 32, 100)
  const material = new Three.MeshBasicMaterial({
    map: colorTexture,
  });
  const mesh = new Three.Mesh(geometry, material);
  scene.add(mesh);

  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };

  //   Camera
  const aspectRatio = sizes.width / sizes.height;
  const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.z = 5;
  scene.add(camera);

  // controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //   Renderer
  const renderer = new Three.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //   Animation
  const tick = () => {
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
