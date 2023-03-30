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
};

module.exports = Port;