// Create an entity manager
let world = new EntityManager();

// Entities Global
const NUM_ELEMENTS = 100;
const SPEED_MULTIPLIER = 0.3;
const SHAPE_SIZE = 25;
const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

// Initialize canvas
let canvas = document.querySelector("canvas");
let canvasWidth = (canvas.width = window.innerWidth);
let canvasHeight = (canvas.height = window.innerHeight);
let ctx = canvas.getContext("2d");
ctx.imageSmoothingEnabled = false;

// System registering
world.registerSystem(new RendererSystem());
world.registerSystem(new MovableSystem());
world.registerSystem(new UISystem());

// Some helper functions when creating the components

/**
 * Generates a random velocity object.
 *
 * @returns {object} - The velocity object with random x and y values.
 */
function getRandomVelocity() {
  return {
    velocity: {
      x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
      y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
    },
  };
}

/**
 * Generates a random position object.
 *
 * @returns {object} - The position object with random x and y values.
 */
function getRandomPosition() {
  return {
    position: {
      x: Math.random() * canvasWidth,
      y: Math.random() * canvasHeight,
    },
  };
}

/**
 * Generates a random render object.
 *
 * @returns {object} - The render object with random shape, background color, and line color.
 */
function getRandomRender() {
  // Generate a random hexadecimal color code
  let randbg = Math.floor(Math.random() * 16777215);
  let randline = Math.floor(Math.random() * 16777215);
  // Convert the number to a six-digit hexadecimal string
  let bg = "#" + randbg.toString(16).padStart(6, "0");
  let line = "#" + randline.toString(16).padStart(6, "0");
  return { shape: Math.random() >= 0.5 ? "circle" : "box", bgcolor: "" + bg, linecolor: "" + line };
}

// Create entities with random positions, velocities, and rendering properties
for (let i = 0; i < NUM_ELEMENTS; i++) {
  world.createEntity().assign(...transform(getRandomPosition()), ...physics(getRandomVelocity()), ...render(getRandomRender()));
  console.log(world.entities[i].shape + world.entities[i].bgcolor + world.entities[i].linecolor);
}

// Run the game loop
function run() {
  // Compute delta and elapsed time
  var time = performance.now();
  var delta = time - lastTime;

  // Run all the systems
  world.update(delta, time);

  lastTime = time;
  requestAnimationFrame(run);
}

var lastTime = performance.now();
run();
