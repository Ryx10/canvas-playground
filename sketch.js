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
    const count = 6;
    const pallette = random.pick(pallettes)


    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 0 ? 1 : x / (count - 1);
        const v = count <= 0 ? 1 : y / (count - 1);
        const radius = Math.abs(random.noise2D(u, v)* .05)
        points.push([u, v])
      };      
    };

    return points;
  };

  // random.setSeed('asdf')

  const points = createGrid()
  const margin = 400
  
  const randomPointsTuple = () => {
    const p = []
    p.push(random.pick(points))
    p.push(random.pick(points))
    console.log(p)
    return p
  }

  return ({ context, width, height }) => {
    context.fillStyle = 'white';
    context.fillRect(0, 0, width, height);

    points.forEach(([u, v]) => {
      const x = lerp(margin, width - margin, u);
      const y = lerp(margin, height - margin, v);

      context.beginPath();
      context.arc(x, y, 10, Math.PI * 2, false);
      context.strokeStyle = 'black'
      context.lineWidth = 10
      context.fillStyle = 'black'
      context.fill();
    });
    const p = randomPointsTuple()

      context.beginPath()
      context.moveTo(lerp(margin, width - margin, p[0][0]), lerp(margin, height - margin, p[0][1]))
      context.lineTo(lerp(margin, width - margin, p[1][0]), lerp(margin, height - margin, p[1][1]))
      context.strokeStyle = 'green'
      context.lineTo(lerp(margin, width - margin, p[1][0]), lerp(margin, height - margin, 1))
      context.lineTo(lerp(margin, width - margin, p[0][0]), lerp(margin, height - margin, 1))
    
      context.strokeStyle = 'black'
      context.lineWidth = 1

      context.fill()
  };
};

canvasSketch(sketch, settings);
