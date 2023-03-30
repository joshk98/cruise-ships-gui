const Ship = require('../src/Ship.js');

let ship;
let dover;
let calais;
let itinerary;

beforeEach(() => {
  dover = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Dover',
    ships: []
  };

  calais = {
    addShip: jest.fn(),
    removeShip: jest.fn(),
    name: 'Calais',
    ships: []
  };

  itinerary = {
    ports: [dover, calais]
  };

  ship = new Ship(itinerary);
});

describe('Ship', () => {
  test('can be instantiated', () => {
    expect(ship).toBeInstanceOf(Object);
  });

  test('has a starting port', () => {
    expect(ship.currentPort).toBe(dover);
  });

  test('gets added to port on instantiation', () => {
    expect(dover.addShip).toHaveBeenCalledWith(ship);
  });

  describe('setSail', () => {
    test('can set sail', () => {
      ship.setSail();

      expect(ship.currentPort).toBeFalsy();
      expect(dover.removeShip).toHaveBeenCalledWith(ship);
    });

    test('can\'t sail further than its itinerary', () => {
      ship.setSail();
      ship.dock();

      expect(() => ship.setSail()).toThrowError('End of itinerary reached');
    });
  });

  describe('dock', () => {
    test('can dock at a different port', () => {
      ship.setSail();
      ship.dock();

      expect(ship.currentPort).toBe(calais);
      expect(calais.addShip).toHaveBeenCalledWith(ship);
    });
  });
});