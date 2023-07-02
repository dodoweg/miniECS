/**
 * The `transform` function defines the transformation properties of an entity,
 * such as position, scale, and rotation. It returns an array of nested objects
 * that represent the computed transformation properties for the entity.
 *
 * @param {object} options - The options to customize the transformation properties.
 * @returns {object[]} - The computed transformation properties for the entity.
 */

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

// The transform() function serves as a component and can be utilized as follows:

// Example 1: Using transform() to set the position of an entity to (167, 200)
/*
let world = new EntityManager();
world.createEntity().assign(...transform({ position: { x: 167, y: 200 } }));
console.log(world.entities[0].position.y); // Output: 200
*/

// Example 2: Achieving the same transform component using individual objects
/*
let world = new EntityManager();
let position = { position: { x: 0, y: 0 } };
let scale = { scale: { x: 1, y: 1 } };
let rotation = { rotation: { x: 0, y: 0 } };
world.createEntity().assign(position, scale, rotation);
world.createEntity().assign({ position: { x: 120, y: 250 } }, scale, rotation);
console.log(world.entities[0].position.y); // Output: 0
console.log(world.entities[1].position.y); // Output: 250
console.log(world.entities[1].scale.y); // Output: 1
*/

// Additional Examples:

// Example 3: Using transform() with no options to get the default transformation properties
// console.log(transform());
// Output: [{ position: { x: 0, y: 0 } }, { scale: { x: 1, y: 1 } }, { rotation: { x: 0, y: 0 } }]

// Example 4: Using transform() with only the position option, leaving scale and rotation as defaults
// console.log(transform({ position: { x: 250, y: 10 } }));
// Output: [{ position: { x: 250, y: 10 } }, { scale: { x: 1, y: 1 } }, { rotation: { x: 0, y: 0 } }]

// Example 5: Using transform() with scale and rotation options, leaving position as default
//console.log(transform({ scale: { x: 2, y: 2 }, rotation: { x: 45, y: 90 } }));
// Output: [{ position: { x: 0, y: 0 } }, { scale: { x: 2, y: 2 } }, { rotation: { x: 45, y: 90 } }]

// Now, we can create other components like `physics` and `render` to define entity properties


/**
* The `physics` function defines the physics properties of an entity, such as mass,
* velocity, acceleration, and direction. It returns an array of nested objects that
* represent the computed physics properties for the entity.
*
* @param {object} options - The options to customize the physics properties.
* @returns {object[]} - The computed physics properties for the entity.
*/
let physics = function(options) {
  let defaults = {
    mass: 1,
    velocity: { x: 0, y: 0 },
    pvelocity: { x: 0, y: 0 },
    acceleration: { x: 0, y: 0 },
    direction: { x: 0, y: 0 },
    maxspeed: 0
  };

  return compute(options, defaults); 
  // Output: [{ mass: 1 }, { velocity: { x: 0, y: 0 } }, { pvelocity: { x: 0, y: 0 } }, { acceleration: { x: 0, y: 0 } }, { direction: { x: 0, y: 0 } }, { maxspeed: 0 }]
};

/**
 * The `render` function defines the rendering properties of an entity, such as background color,
 * line color, and shape. It returns an array of nested objects that represent the computed rendering
 * properties for the entity.
 *
 * @param {object} options - The options to customize the rendering properties.
 * @returns {object[]} - The computed rendering properties for the entity.
 */
let render = function(options) {
  let defaults = {
  shape: "box",
    bgcolor: "#39c495",
    linecolor: "#0b845b"
  };

  return compute(options, defaults); 
  // Output: [{ bgcolor: "#39c495" }, { linecolor: "#0b845b" }, { shape: "box" }]
};


