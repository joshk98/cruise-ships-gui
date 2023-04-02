(function exportPort() {
  class Port {
    constructor(name) {
      this.name = name;
      this.ships = [];
    }

    addShip(ship) {
      const ships = this.ships;
      ships.push(ship);
    }

    removeShip(ship) {
      const ships = this.ships;
      const shipIndex = ships.indexOf(ship);
      ships.splice(shipIndex, 1);
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Port;
  } else {
    window.Port = Port;
  }
}());