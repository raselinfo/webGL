import * as Three from "three";
import GUI from "lil-gui";
import gsap from "gsap";
export const resize = (
  sizes: { width: number; height: number },
  camera: Three.PerspectiveCamera,
  rendered: Three.WebGLRenderer
) => {
  window.addEventListener("resize", () => {
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    rendered.setSize(sizes.width, sizes.height);
  });
};

export const toggleFullScreen = (canvas: HTMLCanvasElement) => {
  window.addEventListener("dblclick", () => {
    // Full screen
    if (document.fullscreenElement) {
      document.exitFullscreen();
    } else {
      canvas.requestFullscreen();
    }
  });
};

export const enableGui = ({
  mesh,
  material,
  DEBUG_DEFAULT,
}: {
  mesh: Three.Mesh;
  material: Three.MeshBasicMaterial;
  DEBUG_DEFAULT: any;
  geoMetry: Three.BoxGeometry;
}) => {
  const gui = new GUI({
    width: 300,
    title: "Nice debug ui",
    closeFolders: false,
  });
  //   gui.close();
  window.addEventListener("keydown", (e) => {
    if (e.key === "h") {
      gui.show(gui._hidden);
    }
  });

  // Folder
  const cubeTweaks = gui.addFolder("Awesome Cube");

  //   gui.add(mesh.position, "y", -3, 3, 0.01);
  cubeTweaks
    .add(mesh.position, "y")
    .min(-3)
    .max(3)
    .step(0.01)
    .name("elevation");

  cubeTweaks.add(mesh, "visible");
  cubeTweaks.add(material, "wireframe");

  cubeTweaks.addColor(DEBUG_DEFAULT, "color").onChange(() => {
    material.color.set(DEBUG_DEFAULT.color);
  });

  //   Spin Animation
  DEBUG_DEFAULT.spin = () => {
    gsap.to(mesh.rotation, {
      y: mesh.rotation.y + Math.PI * 2,
    });
  };
  cubeTweaks.add(DEBUG_DEFAULT, "spin");

  //   Subdivision
  DEBUG_DEFAULT.subdivision = 2;
  cubeTweaks
    .add(DEBUG_DEFAULT, "subdivision")
    .min(1)
    .max(20)
    .step(1)
    .name("subdivision")
    .onFinishChange(() => {
      mesh.geometry.dispose();
      mesh.geometry = new Three.BoxGeometry(
        1,
        1,
        1,
        DEBUG_DEFAULT.subdivision,
        DEBUG_DEFAULT.subdivision,
        DEBUG_DEFAULT.subdivision
      );
    });
};
