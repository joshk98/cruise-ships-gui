const Port = require('../src/Port.js');

let port;
let ship;
let titanic;
let queenMary;

beforeEach(() => {
  port = new Port('Dover');
  ship = jest.fn();
  titanic = jest.fn();
  queenMary = jest.fn();
});

describe('Port', () => {
  test('can be instantiated', () => {
    expect(new Port()).toBeInstanceOf(Object);
  });

  test('has a name property', () => {
    expect(port.name).toBe('Dover');
  });

  describe('addShip', () => {
    test('can add a ship', () => {
      port.addShip(ship);

      expect(port.ships).toContain(ship);
    });
  });

  describe('removeShip', () => {
    test('', () => {
      port.addShip(titanic);
      port.addShip(queenMary);
      port.removeShip(queenMary);

      expect(port.ships).toEqual([titanic]);
    });
  });
});
