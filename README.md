# miniECS.js - A Minimalist Approach to Entity Component System Library

miniECS.js is a lightweight and streamlined Entity Component System (ECS) library designed to simplify the management of entities and systems in your JavaScript application. If you're looking for a minimal environment setup with fewer classes and complexities, miniECS.js is the perfect choice.

## Introduction

miniECS.js allows you to define components that encapsulate specific properties of an entity, such as its transform or physics attributes. These components can then be manipulated efficiently within specific systems, promoting a clear separation of concerns and facilitating the management of intricate interactions between entities.
To see miniECS.js in action, check out our [example](https://dorweg.github.io/miniECS/). I took inspiration from the [ECSY](https://github.com/ecsyjs/ecsy) library and rewrote its example using miniECS.js. At the end of the README file, you can find two usage examples that demonstrate the same initial setup using miniECS.js and ECSY.js.

Here a sample project :

```javascript
let world = new EntityManager(); // EntityManager
// Components
let position = { position: { x: 0, x: 0 } };
// Queries of Components for Systems
let queries = {
  console: ["position"],
};
// System
class ConsoleSystem extends System {
 update(delta, time) {
    this.getEntities().forEach((entity) => {
  console.log(entity.position);
    });
  }
}
ConsoleSystem.prototype.query = queries.console; // Assign the query 'console' that is a group of 1 component

world.registerSystem(new ConsoleSystem()); // Registering the system
world.createEntity().assign(position); // Create one entity and assign them the position "components" at the root of entity
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
```

This example should call a console.log event each frame that get all the entities that have the `position` component according to the behaviour of our `ConsoleSystem`

## Installation

To use miniECS.js in your project, you can include the `miniECS.js` script in your HTML file:

```html
<script src="https://dorweg.github.io/miniECS/miniECS.js"></script>
```

## Usage

miniECS.js provides flexibility in defining components for your entity-component system. You can define components either as functions or as objects, based on your preference and requirements.

### Defining Components as Functions

Functions in miniECS.js serve as groups of components and allow you to encapsulate the properties or behaviors associated with an entity. You can use functions that return component instances with customizable options and default values.

Here's an example of defining a transform component using a function:

```javascript
function transform(options) {
  // Default transformation properties
  const defaults = {
    position: { x: 0, y: 0 },
    scale: { x: 1, y: 1 },
    rotation: { x: 0, y: 0 }
  };

  // Compute the transformation properties by merging the provided options with the defaults
  return compute(options, defaults);
}
//console.log(transform()); // Output: [{ position: { x: 0, y: 0 } }, { scale: { x: 1, y: 1 } }, { rotation: { x: 0, y: 0 } }]
```

You can assign the transform component to entities using the `assign()` function:

```javascript
let world = new EntityManager();
world.createEntity().assign(...transform({ position: { x: 167, y: 200 } }));
console.log(world.entities[0].position.y); // Output: 200
```
In this example, the transform function creates a component instance with default transformation properties. The function accepts an options parameter to override the default values when assigning the component to an entity.

### Defining Components as Objects

Alternatively, you can define components directly as objects. This approach allows you to assign properties to entities without the need for a function wrapper.

Here's an example of defining components as objects:

```javascript
let position = { position: { x: 0, y: 0 } }; // nested object
let velocity = { x: 0, y: 0 }; // unnested object
let shape = { shape: "box" }; // default value for shape components is "box"
```

You can assign these component objects to entities using the `assign()` method:

```javascript
world.createEntity().assign(position, { velocity }, { shape: "circle" });
```

In this example, we create an entity and assign multiple components to it, including `position`, `velocity`, and `shape`. The components are defined as objects, and you can customize their properties as needed.

Using miniECS.js, you have the flexibility to define components either as functions or as objects, allowing you to structure your entity-component system according to your needs.

### Assigning Components to Entities

To assign components to an existing entity, you can use the `assign(...components)` method of the entity. This method allows you to associate various (infinity) components with the entity by passing them as nested objects.

Here's an example that demonstrates the usage of the `assign()` method:

```javascript
// World initialization
let world = new EntityManager();
// Entity creation
let entity = world.createEntity();
// Component assignment
entity.assign({ position: { x: 50, y: 100 } });
```

In this example, we create a new entity using the `createEntity()` method provided by EntityManager. Then, we use the `assign()` method to associate a position component with the entity. The position component is defined as a nested object with x and y properties.

You can assign multiple components to an entity using different types of nested objects, as shown in this example:

```javascript
// World initialization
let world = new EntityManager();
// Component definition
let position = { position: { x: 0, y: 0 } };
let velocity = { x: 0, y: 0 };
let shape = { shape: "box" };
// Entity creation and component assignment
world.createEntity().assign(position, { velocity }, { shape: "circle" });
```

In this example, we create a new entity using the `createEntity()` method of the world object. We pass three components to the `assign()` method: `position`, `velocity`, and `shape`. The position component is nested within an object, while the velocity component is passed and nested directly in the `assign()` function. The shape component is a modified object from the default one and needs to be nested within the `assign()` method.

By using the `assign()` method in this way, the entity will have the assigned components (position, velocity, and shape) accessible as properties in its root, allowing you to work with these components in your application.

### Component Queries for Systems

miniECS.js allows you to define queries to retrieve entities based on specific component requirements. These queries can be used by systems to operate on entities that match the specified criteria. For example, you can define a query called "movable" that requires the "position" and "velocity" components:

```javascript
let queries = {
  movable: ["position", "velocity"],
  renderable: ["shape"],
};
```
To use this query, you can assign it to your system's prototype, like this:

```javascript
MovableSystem.prototype.query = queries.movable;
RendererSystem.prototype.query = queries.renderable;
```

By assigning the query to your system's prototype, your `MovableSystem` will only operate on entities that have both the `position` and `velocity` components, while the `RendererSystem` will operate on entities that have the `shape` component.

Using component queries in miniECS.js allows you to easily filter and work with entities that have specific components, making it more efficient to handle entity-component relationships in your system.

### Registering Systems

miniECS.js allows you to register systems that operate on entities based on their component composition. Systems define the logic and behavior that manipulate entities and can be updated on each frame of your application.

To register a system in miniECS.js, you'll need to define a class that extends the System base class. Let's take a look at an example of registering a system using miniECS.js:

```javascript
class MovableSystem extends System {
  /**
   * The update method of the MovableSystem class is called on every frame to update the movable entities.
   *
   * @param {number} delta - The time elapsed since the last frame.
   * @param {number} time - The current time.
   */
  update(delta, time) {
    this.getEntities().forEach((entity) => { 
      var velocity = entity.velocity;
      var position = entity.position;
      position.x += velocity.x * delta;
      position.y += velocity.y * delta;

      // Wrap around the canvas if the entity goes beyond the bounds
      if (position.x > canvasWidth + SHAPE_HALF_SIZE)
        position.x = -SHAPE_HALF_SIZE;
      if (position.x < -SHAPE_HALF_SIZE)
        position.x = canvasWidth + SHAPE_HALF_SIZE;
      if (position.y > canvasHeight + SHAPE_HALF_SIZE)
        position.y = -SHAPE_HALF_SIZE;
      if (position.y < -SHAPE_HALF_SIZE)
        position.y = canvasHeight + SHAPE_HALF_SIZE;
    });
  }
}

MovableSystem.prototype.query = queries.movable;
```
The `MovableSystem` class specifies its query by assigning the `queries.movable` array to the query property. This ensures that the system operates only on entities that have the required components (position and velocity).

The `getEntities().forEach(...)` line in the code snippet iterates over all the entities that match the specified query. It allows you to perform operations on each relevant entity in the system's update loop.

Here the `update(delta, time)` method as a template that you can use for your systems :

```javascript
class ExampleSystem extends System {
  update(delta, time) {
    this.getEntities().forEach((entity) => { 
      //... code that operates on `entity` object
    });
  }
}
```

### Updating Systems

To update all registered systems, call the updateSystems method of the `EntityManage`r instance. This will invoke the update method of each registered system, allowing them to process entities.

```javascript
// Update all registered systems
entityManager.updateSystems(delta, time);
```

## Usage Example

### miniECS.js Example

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Hello!</title>
  <meta charset="utf-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <style>
    html, body {
      margin: 0;
      padding: 0;
    }
  </style>
</head>
<body>
  <canvas width="500" height="500"></canvas>
</body>
<script src="miniECS.js"></script>
<script>
  // Create an entity manager
  let world = new EntityManager();

  // Entities Global
  const NUM_ELEMENTS = 50;
  const SPEED_MULTIPLIER = 0.3;
  const SHAPE_SIZE = 50;
  const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

  // Initialize canvas
  let canvas = document.querySelector("canvas");
  let canvasWidth = (canvas.width = window.innerWidth);
  let canvasHeight = (canvas.height = window.innerHeight);
  let ctx = canvas.getContext("2d");

  //----------------------
  // Components
  //----------------------

  // Velocity component
  let velocity = { velocity: { x: 0, y: 0 } };

  // Position component
  let position = { position: { x: 0, y: 0 } };

  // Shape component
  let shape = { shape: "box" };

  // Renderable component from ECSY will be a query for our systems to use:
  const queries = {
    movable: ["position", "velocity"],
    renderable: ["shape"],
  };

  //----------------------
  // Systems
  //----------------------

  // MovableSystem
  class MovableSystem extends System {
    // This method will get called on every frame by default
    update(delta, time) {
      this.getEntities().forEach((entity) => {
        var velocity = entity.velocity;
        var position = entity.position;
        position.x += velocity.x * delta;
        position.y += velocity.y * delta;

        if (position.x > canvasWidth + SHAPE_HALF_SIZE)
          position.x = -SHAPE_HALF_SIZE;
        if (position.x < -SHAPE_HALF_SIZE)
          position.x = canvasWidth + SHAPE_HALF_SIZE;
        if (position.y > canvasHeight + SHAPE_HALF_SIZE)
          position.y = -SHAPE_HALF_SIZE;
        if (position.y < -SHAPE_HALF_SIZE)
          position.y = canvasHeight + SHAPE_HALF_SIZE;
      });
    }
  }
  MovableSystem.prototype.query = queries.movable;

  // RendererSystem
  class RendererSystem extends System {
    // This method will get called on every frame by default
    update(delta, time) {
      ctx.fillStyle = "#d4d4d4";
      ctx.fillRect(0, 0, canvasWidth, canvasHeight);

      // Iterate through all the entities on the query
      this.getEntities().forEach((entity) => {
        if (entity.shape === "box") {
          this.drawBox(entity);
        } else {
          this.drawCircle(entity);
        }
      });
    }

    drawCircle(entity) {
      ctx.beginPath();
      ctx.arc(entity.position.x, entity.position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
      ctx.fillStyle = "#39c495";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#0b845b";
      ctx.stroke();
    }

    drawBox(entity) {
      ctx.beginPath();
      ctx.rect(
        entity.position.x - SHAPE_HALF_SIZE,
        entity.position.y - SHAPE_HALF_SIZE,
        SHAPE_SIZE,
        SHAPE_SIZE
      );
      ctx.fillStyle = "#e2736e";
      ctx.fill();
      ctx.lineWidth = 2;
      ctx.strokeStyle = "#b74843";
      ctx.stroke();
    }
  }
  RendererSystem.prototype.query = queries.renderable;

  // System registering
  world.registerSystem(new RendererSystem());
  world.registerSystem(new MovableSystem());

  function getRandomVelocity() {
    return {
      velocity: {
        x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
        y: SPEED_MULTIPLIER * (2 * Math.random() - 1),
      },
    };
  }

  function getRandomPosition() {
    return {
      position: {
        x: Math.random() * canvasWidth,
        y: Math.random() * canvasHeight,
      },
    };
  }

  function getRandomShape() {
    return {
      shape: Math.random() >= 0.5 ? "circle" : "box",
    };
  }

  // Create entities with random positions, velocities, and rendering properties
  for (let i = 0; i < NUM_ELEMENTS; i++) {
    world.createEntity().assign(getRandomPosition(), getRandomVelocity(), getRandomShape());
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
</script>
</html>
```
### ECSY Example
```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <title>Hello!</title>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
      html, body: {
        margin: 0;
        padding: 0;
      }
    </style>

    <script type="module">
      import { World, System, Component, TagComponent, Types } from "https://ecsyjs.github.io/ecsy/build/ecsy.module.js";

      const NUM_ELEMENTS = 50;
      const SPEED_MULTIPLIER = 0.3;
      const SHAPE_SIZE = 50;
      const SHAPE_HALF_SIZE = SHAPE_SIZE / 2;

      // Initialize canvas
      let canvas = document.querySelector("canvas");
      let canvasWidth = canvas.width = window.innerWidth;
      let canvasHeight = canvas.height = window.innerHeight;
      let ctx = canvas.getContext("2d");

      //----------------------
      // Components
      //----------------------

      // Velocity component
      class Velocity extends Component {}

      Velocity.schema = {
        x: { type: Types.Number },
        y: { type: Types.Number }
      };

      // Position component
      class Position extends Component {}

      Position.schema = {
        x: { type: Types.Number },
        y: { type: Types.Number }
      };

      // Shape component
      class Shape extends Component {}

      Shape.schema = {
        primitive: { type: Types.String, default: 'box' }
      };

      // Renderable component
      class Renderable extends TagComponent {}

      //----------------------
      // Systems
      //----------------------

      // MovableSystem
      class MovableSystem extends System {
        // This method will get called on every frame by default
        execute(delta, time) {
          // Iterate through all the entities on the query
          this.queries.moving.results.forEach(entity => {
            var velocity = entity.getComponent(Velocity);
            var position = entity.getMutableComponent(Position);
            position.x += velocity.x * delta;
            position.y += velocity.y * delta;

            if (position.x > canvasWidth + SHAPE_HALF_SIZE) position.x = - SHAPE_HALF_SIZE;
            if (position.x < - SHAPE_HALF_SIZE) position.x = canvasWidth + SHAPE_HALF_SIZE;
            if (position.y > canvasHeight + SHAPE_HALF_SIZE) position.y = - SHAPE_HALF_SIZE;
            if (position.y < - SHAPE_HALF_SIZE) position.y = canvasHeight + SHAPE_HALF_SIZE;
          });
        }
      }

      // Define a query of entities that have "Velocity" and "Position" components
      MovableSystem.queries = {
        moving: {
          components: [Velocity, Position]
        }
      }

      // RendererSystem
      class RendererSystem extends System {
        // This method will get called on every frame by default
        execute(delta, time) {

          ctx.fillStyle = "#d4d4d4";
          ctx.fillRect(0, 0, canvasWidth, canvasHeight);

          // Iterate through all the entities on the query
          this.queries.renderables.results.forEach(entity => {
            var shape = entity.getComponent(Shape);
            var position = entity.getComponent(Position);
            if (shape.primitive === 'box') {
              this.drawBox(position);
            } else {
              this.drawCircle(position);
            }
          });
        }

        drawCircle(position) {
          ctx.beginPath();
          ctx.arc(position.x, position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
          ctx.fillStyle= "#39c495";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#0b845b";
          ctx.stroke();
        }

        drawBox(position) {
          ctx.beginPath();
          ctx.rect(position.x - SHAPE_HALF_SIZE, position.y - SHAPE_HALF_SIZE, SHAPE_SIZE, SHAPE_SIZE);
          ctx.fillStyle= "#e2736e";
          ctx.fill();
          ctx.lineWidth = 2;
          ctx.strokeStyle = "#b74843";
          ctx.stroke();
        }
      }

      // Define a query of entities that have "Renderable" and "Shape" components
      RendererSystem.queries = {
        renderables: { components: [Renderable, Shape] }
      }

      // Create world and register the components and systems on it
      var world = new World();
      world
        .registerComponent(Velocity)
        .registerComponent(Position)
        .registerComponent(Shape)
        .registerComponent(Renderable)
        .registerSystem(MovableSystem)
        .registerSystem(RendererSystem);

      // Some helper functions when creating the components
      function getRandomVelocity() {
        return {
          x: SPEED_MULTIPLIER * (2 * Math.random() - 1),
          y: SPEED_MULTIPLIER * (2 * Math.random() - 1)
        };
      }

      function getRandomPosition() {
        return {
          x: Math.random() * canvasWidth,
          y: Math.random() * canvasHeight
        };
      }

      function getRandomShape() {
         return {
           primitive: Math.random() >= 0.5 ? 'circle' : 'box'
         };
      }

      for (let i = 0; i < NUM_ELEMENTS; i++) {
        world
          .createEntity()
          .addComponent(Velocity, getRandomVelocity())
          .addComponent(Shape, getRandomShape())
          .addComponent(Position, getRandomPosition())
          .addComponent(Renderable)
      }

      // Run!
      function run() {
        // Compute delta and elapsed time
        var time = performance.now();
        var delta = time - lastTime;

        // Run all the systems
        world.execute(delta, time);

        lastTime = time;
        requestAnimationFrame(run);
      }

      var lastTime = performance.now();
      run();
    </script>
    </head>
    <body>
      <canvas width="500" height="500"></canvas>
    </body>
  </html>
```
## Contributing

Contributions to miniECS.js are welcome!
## License

miniECS.js is licensed under the MIT License
