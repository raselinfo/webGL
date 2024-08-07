import * as Three from "three";
import { OrbitControls } from "three/examples/jsm/Addons.js";
import GUI from "lil-gui";
import { RGBELoader } from "three/examples/jsm/Addons.js";
export const materials = (canvas: HTMLCanvasElement) => {
  const gui = new GUI();
  const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
  };
  const scene = new Three.Scene();

  // Light
  const ambientLight = new Three.AmbientLight(0xffffff, 1);
  scene.add(ambientLight);

  const pointLight = new Three.PointLight(0xffffff, 30);
  pointLight.position.set(-2, 2, 4);
  scene.add(pointLight);

  // Environment Map
  const rgbeLoader = new RGBELoader();
  rgbeLoader.load("/public/environmentMap/goldHouse.hdr", (environmentMap) => {
    environmentMap.mapping = Three.EquirectangularReflectionMapping;
    scene.background = environmentMap;
    scene.environment = environmentMap;
  });

  //   Texture
  const textureLoader = new Three.TextureLoader();
  const doorColorTexture = textureLoader.load(
    "/public/textures/door/color.jpg"
  );
  const doorAlphaTexture = textureLoader.load(
    "/public/textures/door/alpha.jpg"
  );
  const doorAmbientOcclusionTexture = textureLoader.load(
    "/public/textures/door/ambientOcclusion.jpg"
  );
  const doorHeightTexture = textureLoader.load(
    "/public/textures/door/height.jpg"
  );
  const doorNormalTexture = textureLoader.load(
    "/public/textures/door/normal.jpg"
  );
  const doorMetalnessTexture = textureLoader.load(
    "/public/textures/door/metalness.jpg"
  );
  const doorRoughnessTexture = textureLoader.load(
    "/public/textures/door/roughness.jpg"
  );
  const mateCapTexture = textureLoader.load("/public/matcaps/7.png");
  const gradientTexture = textureLoader.load("/public/gradients/5.jpg");

  doorColorTexture.colorSpace = Three.SRGBColorSpace;
  mateCapTexture.colorSpace = Three.SRGBColorSpace;

  //   MeshBasic Material---------
  // const material = new Three.MeshBasicMaterial({
  // map: doorColorTexture,
  // });
  // material.map = doorColorTexture;
  // material.color = new Three.Color("red");
  // material.wireframe = true;
  // material.transparent= true;
  // material.opacity = 0.6;
  // material.alphaMap = doorAlphaTexture
  // material.side = Three.DoubleSide;

  // Mesh Normal Material---------
  // const material = new Three.MeshNormalMaterial({});
  // material.wireframe= true
  // material.flatShading = true;

  // Mesh Matcap Material---------
  // const material = new Three.MeshMatcapMaterial({matcap: mateCapTexture})

  // Mesh Depth Material---------
  // const material = new Three.MeshDepthMaterial({});

  // Mesh Lambert Material---------
  // const material = new Three.MeshLambertMaterial();

  // Mesh Phong Material---------
  // const material = new Three.MeshPhongMaterial();
  // material.shininess = 10;
  // material.specular = new Three.Color("#fff");

  // Mesh Toon Material---------
  // const material = new Three.MeshToonMaterial();
  // gradientTexture.minFilter= Three.NearestFilter
  // gradientTexture.magFilter = Three.NearestFilter;
  // gradientTexture.generateMipmaps = false;
  // material.gradientMap = gradientTexture;

  // Stander Material---------
  // const material = new Three.MeshStandardMaterial();
  // material.metalness =1
  // material.roughness = 1;
  // material.map = doorColorTexture;
  // material.aoMap = doorAmbientOcclusionTexture;
  // material.aoMapIntensity = 1
  // material.displacementMap = doorHeightTexture;
  // material.displacementScale = 0.1;
  // material.metalnessMap = doorMetalnessTexture;
  // material.roughnessMap = doorRoughnessTexture;
  // material.normalMap = doorNormalTexture;
  // material.normalScale.set(3, 3);
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture;

  // Mesh Physical Material---------
  const material = new Three.MeshPhysicalMaterial();
  material.metalness = 0;
  material.roughness = 0;
  // material.map = doorColorTexture;
  // material.aoMap = doorAmbientOcclusionTexture;
  // material.aoMapIntensity = 1;
  // material.displacementMap = doorHeightTexture;
  // material.displacementScale = 0.1;
  // material.metalnessMap = doorMetalnessTexture;
  // material.roughnessMap = doorRoughnessTexture;
  // material.normalMap = doorNormalTexture;
  // material.normalScale.set(3, 3);
  // material.transparent = true;
  // material.alphaMap = doorAlphaTexture;

  // Clearcoat
  // material.clearcoat=1
  // material.clearcoatRoughness=0

  // Sheen
  // material.sheen = 1;
  // material.sheenRoughness = 0.25;
  // material.sheenColor.set("blue");

  // Iridesence
  // material.iridescence = 1;
  // material.iridescenceIOR = 1;
  // material.iridescenceThicknessRange = [100, 800];

  // Transmission
  material.transmission = 1;
  material.ior = 1.5;
  material.thickness = 0.5;

  // GUI---------
  gui.add(material, "metalness").min(0).max(1).step(0.0001);
  gui.add(material, "roughness").min(0).max(1).step(0.0001);
  gui.add(material, "clearcoat").min(0).max(1).step(0.0001);
  gui.add(material, "clearcoatRoughness").min(0).max(1).step(0.0001);
  gui.add(material, "sheen").min(0).max(1).step(0.0001);
  gui.add(material, "sheenRoughness").min(0).max(1).step(0.0001);
  gui.addColor(material, "sheenColor");
  gui.add(material, "iridescence").min(0).max(1).step(0.0001);
  gui.add(material, "iridescenceIOR").min(0).max(2.333).step(0.0001);
  gui.add(material.iridescenceThicknessRange, "0").min(0).max(1000).step(1);
  gui.add(material.iridescenceThicknessRange, "1").min(0).max(1000).step(1);
  gui.add(material, "transmission").min(0).max(1).step(0.0001);
  gui.add(material, "ior").min(0).max(2.333).step(0.0001);
  gui.add(material, "thickness").min(0).max(1000).step(1);



  const sphere = new Three.Mesh(
    new Three.SphereGeometry(0.5, 64, 64),
    material
  );
  sphere.position.x = -1.5;
  const plane = new Three.Mesh(
    new Three.PlaneGeometry(1, 1, 100, 100),
    material
  );

  const torus = new Three.Mesh(
    new Three.TorusGeometry(0.3, 0.2, 64, 128),
    material
  );
  torus.position.x = 1.5;
  scene.add(sphere, plane, torus);

  //   Camera
  const aspectRatio = sizes.width / sizes.height;
  const camera = new Three.PerspectiveCamera(75, aspectRatio, 0.1, 100);
  camera.position.z = 5;

  //   Controls
  const controls = new OrbitControls(camera, canvas);
  controls.enableDamping = true;

  //   Renderer
  const renderer = new Three.WebGLRenderer({ canvas });
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

  //   Tick
  const clock = new Three.Clock();
  const tick = () => {
    const elapsedTime = clock.getElapsedTime();
    // Update Object
    sphere.rotation.y = 0.1 * elapsedTime;
    plane.rotation.y = 0.1 * elapsedTime;
    torus.rotation.y = 0.1 * elapsedTime;

    sphere.rotation.x = -0.15 * elapsedTime;
    plane.rotation.x = -0.15 * elapsedTime;
    torus.rotation.x = -0.15 * elapsedTime;

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
