# miniECS.js - Minimal Entity Component System Library

miniECS.js is a minimal Entity Component System (ECS) library that allows you to manage entities and systems in your JavaScript application. It provides a flexible way to define and organize your game objects and their behaviors using entities, components, and systems.

## Table of Contents

- [Introduction](#introduction)
- [Installation](#installation)
- [Usage](#usage)
  - [Defining Components](#defining-components)
  - [Creating an Entity](#creating-an-entity)
  - [Assigning Components to an Entity](#assigning-components-to-an-entity)
  - [Registering Systems](#registering-systems)
  - [Updating Systems](#updating-systems)
- [Contributing](#contributing)
- [License](#license)

## Introduction

miniECS.js provides a simple and efficient way to implement the ECS pattern in your application. It allows you to define entities as a collection of components, each representing a specific aspect or behavior of the entity. Systems then operate on entities based on their component composition, enabling clean separation of concerns and ease of managing complex interactions between entities.

## Installation

To use miniECS.js in your project, you can include the `miniECS.js` script in your HTML file:

```html
<script src="path/to/miniECS.js"></script>
```

## Usage
### Defining Components

miniECS.js allows you to define components as functions that encapsulate specific properties or behaviors of an entity. These functions can be used to create component instances with customizable options and default values.

Let's take a look at some examples of defining components using miniECS.js:

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
  // Output: [{ position: { x: 0, y: 0 } }, { scale: { x: 1, y: 1 } }, { rotation: { x: 0, y: 0 } }]
}
```

The transform function can be used as a component and assigned to entities. Here's an example of assigning the transform component to an entity:

```javascript

let world = new EntityManager();
world.createEntity().assign(...transform({ position: { x: 167, y: 200 } }));
console.log(world.entities[0].position.y); // Output: 200
```
### Creating an Entity

An entity in miniECS.js is a collection of components. To create an entity, you first need to define its components using the transform, physics, and render functions (you can create other components as needed). Then, you can create the entity and assign its components using the assign method.

```javascript

// Create an entity with transform and render components
let entityManager = new EntityManager();
let entity = entityManager.createEntity().assign(
  ...transform({ position: { x: 100, y: 200 } }),
  ...render({ shape: "circle", bgcolor: "#FF0000", linecolor: "#FFFFFF" })
);
```
### Assigning Components to an Entity

To assign components to an existing entity, you can use the assign method of the entity. Here's an example:

```javascript

let entity = world.createEntity();
entity.assign(...transform({ position: { x: 50, y: 100 } }));
```
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
The MovableSystem class specifies its query by assigning the queries.movable array to the query property. This ensures that the system operates only on entities that have the required components (position and velocity).
### Updating Systems

To update all registered systems, call the updateSystems method of the EntityManager instance. This will invoke the update method of each registered system, allowing them to process entities.

```javascript

// Update all registered systems
entityManager.updateSystems(delta, time);
```
### Contributing

Contributions to miniECS.js are welcome!
### License

miniECS.js is licensed under the MIT License
