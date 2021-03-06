// Ensure ThreeJS is in global scope for the 'examples/'
global.THREE = require("three");

// Include any additional ThreeJS examples below
require("three/examples/js/controls/OrbitControls");

const canvasSketch = require("canvas-sketch");
const random = require('canvas-sketch-util/random')
const pallets = require('nice-color-palettes')

const settings = {
  // Make the loop animated
  animate: true,
  duration: 4,
  fps: 24,
  // Get a WebGL canvas rather than 2D
  context: "webgl"
};

const sketch = ({ context }) => {
  // Create a renderer
  const renderer = new THREE.WebGLRenderer({
    canvas: context.canvas
  });

  // WebGL background color
  renderer.setClearColor("#fff", 1);

  // Setup a camera
  const camera = new THREE.OrthographicCamera();

  // Setup your scene
  const scene = new THREE.Scene();

  const palette = random.pick(pallets)
  const box = new THREE.BoxGeometry(1, 1, 1)
  for (let i = 0; i < 40;  i++) {
    const mesh = new THREE.Mesh(
      box,
      new THREE.MeshStandardMaterial({
        color: random.pick(palette)
      })
    )
    mesh.position.set(
      random.range(-1, 1),
      random.range(-1, 1),
      random.range(-1, 1)
    )

    mesh.scale.set(
      random.range(0, 2),
      random.range(0, 2),
      random.range(0, 2)
    )

    mesh.scale.multiplyScalar(0.1)
    scene.add(mesh)
  }
  
  scene.add(new THREE.AmbientLight('hsl(0, 0%, 20%)'))
  const light = new THREE.DirectionalLight('white', 1)
  light.position.set(0, 4, 0)
  scene.add(light)

  // draw each frame
  return {
    // Handle resize events here
    resize({ pixelRatio, viewportWidth, viewportHeight }) {
      const aspect = viewportWidth / viewportHeight;

    // Ortho zoom 
      const zoom = 1

      // Bounds
      camera.left = -zoom * aspect;
      camera.right = zoom * aspect;
      camera.top = zoom;
      camera.bottom = -zoom;

      // Near/Far
      camera.near = -100;
      camera.far = 100;

      // Set position & look at world center
      camera.position.set(zoom, zoom, zoom);
      camera.lookAt(new THREE.Vector3());

      // Update the camera
      camera.updateProjectionMatrix();
    },
    // Update & render your scene here
    render({playhead}) {
      scene.rotation.y = Math.sin(playhead * Math.PI)
      renderer.render(scene, camera);
    },
    // Dispose of events & renderer for cleaner hot-reloading
    unload() {
      renderer.dispose();
    }
  };
};

canvasSketch(sketch, settings);
