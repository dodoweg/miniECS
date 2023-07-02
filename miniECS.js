/**
 * The `EntityManager` class represents a manager for entities and systems in an application.
 * It allows registering systems, creating and destroying entities, and performing updates.
 */
class EntityManager {
    constructor() {
      this.entities = [];
      this.systems = [];
    }
  
    /**
     * Registers a system with the entity manager.
     * @param {System} system - The system to register.
     * @returns {System} - The registered system.
     */
    registerSystem(system) {
      system.entityManager = this;
      this.systems.push(system);
      return system;
    }
  
    /**
     * Performs the update for all registered systems.
     * @param {number} delta - The time delta since the last update.
     * @param {number} time - The current time.
     */
    update(delta, time) {
      // Sort systems based on their priority
      this.systems.sort((a, b) => a.priority - b.priority);
  
      // Update each system in order
      for (const system of this.systems) {
        system._update(delta, time);
      }
    }
  
    /**
     * Creates a new entity with the given priority.
     * @param {number} priority - The priority of the entity (optional, defaults to 0).
     * @returns {Entity} - The created entity.
     */
    createEntity(priority) {
      const entity = new Entity(priority);
      entity.entityManager = this;
      this.entities.push(entity);
      return entity;
    }
  
    /**
     * Destroys an entity by removing it from the entity manager.
     * @param {Entity} entity - The entity to destroy.
     */
    destroyEntity(entity) {
      const index = this.entities.indexOf(entity);
      if (index !== -1) {
        this.entities.splice(index, 1);
      }
    }
  
    /**
     * Retrieves entities that match the given query.
     * @param {string[]} query - An array of property names to match against.
     * @returns {Entity[]} - The entities that match the query.
     */
    getEntities(query) {
      return this.entities.filter(entity => {
        let entityProperties = Object.getOwnPropertyNames(entity);
        return query.every(prop => entityProperties.includes(prop));
      });
    }
  
    /**
     * Sorts the entities based on their priority.
     */
    sortEntities() {
      this.entities.sort((a, b) => a.priority - b.priority);
    }
  
    /**
     * Pauses the entity manager by clearing all entities.
     */
    pause() {
      this.entities.length = 0;
    }
  }
  
  /**
   * The `Entity` class represents an entity in the application.
   * It allows assigning components to the entity.
   */
  class Entity {
    constructor(priority) {
      this.entityManager = null;
      this.priority = priority || 0;
    }
  
    /**
     * Assigns components to the entity.
     * @param {...object} components - The components to assign to the entity.
     * @returns {Entity} - The modified entity.
     */
    assign(...components) {
      for (const component of components) {
        for (const key in component) {
          if (typeof component[key] === 'object' && typeof this[key] === 'object') {
            this[key] = Object.assign({}, this[key], component[key]);
          } else {
            if (!this.hasOwnProperty(key)) {
              this[key] = {};
            }
            this[key] = component[key];
          }
        }
      }
      return this;
    }
  }
  
  /**
   * The `System` class represents a system in the application.
   * It provides a way to perform updates on entities that match a certain query.
   */
  class System {
    constructor(priority, query) {
      this.entityManager = null;
      this.priority = priority || 0;
      this.query = query || [];
    }
  
    /**
     * Retrieves entities that match the system's query.
     * @returns {Entity[]} - The entities that match the system's query.
     */
    getEntities() {
      return this.entityManager.getEntities(this.query);
    }
  
    /**
     * Internal method to invoke the system's update function.
     * @param {number} delta - The time delta since the last update.
     * @param {number} time - The current time.
     */
    _update(delta, time) {
      this.update(delta, time);
    }
  
    /**
     * The update function to be implemented by the system.
     * @param {number} delta - The time delta since the last update.
     * @param {number} time - The current time.
     */
    update(delta, time) {}
  }
  
  /**
   * The `compute` function computes the merged options by combining the provided options
   * with the defaults and returns an array of nested objects representing the computed properties.
   * @param {object} options - The options to compute.
   * @param {object} defaults - The default values for the options.
   * @returns {object[]} - The computed properties.
   */
  function compute(options, defaults) {
    let computedOptions = { ...defaults };
  
    for (let key in options) {
      if (key in computedOptions) {
        if (typeof options[key] === 'object') {
          computedOptions[key] = { ...defaults[key], ...options[key] };
        } else {
          computedOptions[key] = options[key];
        }
      }
    }
  
    let obj = [];
    for (let key in computedOptions) {
      obj.push({ [key]: computedOptions[key] });
    }
  
    return obj;
  }
  