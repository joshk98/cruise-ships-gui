const Itinerary = require('../src/Itinerary.js');

let dover;
let calais;
let itinerary;

beforeEach(() => {
  dover = jest.fn();
  calais = jest.fn();
  itinerary = new Itinerary([dover, calais]);
});

describe('Itinerary', () => {
  test('can be instantiated', () => {
    expect(new Itinerary()).toBeInstanceOf(Object);
  });

  test('it can have ports', () => {
    expect(itinerary.ports).toEqual([dover, calais]);
  });
});
