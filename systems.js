 // Queries for the systems based on component assigned to the entity
const queries = {
  movable: ["position", "velocity"],
  renderable: ["shape"],
};

// MovableSystem
class MovableSystem extends System {
  /**
   * The update method of the MovableSystem class is called on every frame to update the movable entities.
   *
   * @param {number} delta - The time elapsed since the last frame.
   * @param {number} time - The current time.
   */
  update(delta, time) {
    this.getEntities().forEach((entity) => { // this.getEntities().forEach((entity) => { ...you can now manipulate entity based on the query of this system... }); 
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
MovableSystem.prototype.query = queries.movable; // We assign an array of query to the system => ['position', 'velocity']


// RendererSystem
class RendererSystem extends System {
  /**
   * The update method of the RendererSystem class is called on every frame to update the rendering of entities.
   *
   * @param {number} delta - The time elapsed since the last frame.
   * @param {number} time - The current time.
   */
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

  /**
   * Draws a circle entity on the canvas.
   *
   * @param {object} entity - The entity with circle shape to be drawn.
   */
  drawCircle(entity) {
    ctx.beginPath();
    ctx.arc(entity.position.x, entity.position.y, SHAPE_HALF_SIZE, 0, 2 * Math.PI, false);
    ctx.fillStyle = entity.bgcolor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = entity.linecolor;
    ctx.stroke();
  }

  /**
   * Draws a box entity on the canvas.
   *
   * @param {object} entity - The entity with box shape to be drawn.
   */
  drawBox(entity) {
    ctx.beginPath();
    ctx.rect(
      entity.position.x - SHAPE_HALF_SIZE,
      entity.position.y - SHAPE_HALF_SIZE,
      SHAPE_SIZE,
      SHAPE_SIZE
    );
    ctx.fillStyle = entity.bgcolor;
    ctx.fill();
    ctx.lineWidth = 2;
    ctx.strokeStyle = entity.linecolor;
    ctx.stroke();
  }
}


// UI System
class UISystem extends System {
  /**
   * The update method of the UISystem class is called on every frame to update the UI.
   *
   * @param {number} delta - The time elapsed since the last frame.
   * @param {number} time - The current time.
   */
  update(delta, time) {
    ctx.fillStyle = 'black';
    ctx.font = '16px Arial';
    ctx.fillText('FPS: ' + 1000/delta, 10, 20);
  }
}
