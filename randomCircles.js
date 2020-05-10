const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const pallettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 40;
    const pallette = random.pick(pallettes)


    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 0 ? 1 : x / (count - 1);
        const v = count <= 0 ? 1 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)* .05)
        points.push({
          // radius: random.value(),
          radius,
          position:  [u, v],
          color: random.pick(pallette)
        })
      };      
    };

    return points;
  };

  // random.setSeed('asdf')

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position: [u, v],
        radius,
        color
      } = data

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 10;
      context.fillStyle = color
      context.fill();
    });

  };
};

canvasSketch(sketch, settings);
const canvasSketch = require('canvas-sketch');
const {lerp} = require('canvas-sketch-util/math')
const random = require('canvas-sketch-util/random')
const pallettes = require('nice-color-palettes')

const settings = {
  dimensions: [ 2048, 2048 ]
};

const sketch = () => {

  const createGrid = () => {
    const points = [];
    const count = 40;
    const pallette = random.pick(pallettes)


    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 0 ? 1 : x / (count - 1);
        const v = count <= 0 ? 1 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)* .05)
        points.push({
          // radius: random.value(),
          radius,
          position:  [u, v],
          color: random.pick(pallette)
        })
      };      
    };

    return points;
  };

  // random.setSeed('asdf')

  const points = createGrid().filter(() => random.value() > 0.5);
  const margin = 400

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(data => {
      const {
        position: [u, v],
        radius,
        color
      } = data

      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, radius * width, 0, Math.PI * 2, false);
      context.strokeStyle = 'black';
      context.lineWidth = 10;
      context.fillStyle = color
      context.fill();
    });

  };
};

canvasSketch(sketch, settings);
