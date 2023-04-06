(function exportShip() {
  class Ship {
    constructor(itinerary) {
      this.itinerary = itinerary;
      this.currentPort = itinerary.ports[0];
      this.nextPort = itinerary.ports[1];
      this.previousPort = null;
      this.currentPort.addShip(this);
    }

    setSail() {
      const itinerary = this.itinerary;
      const currentPortIndex = itinerary.ports.indexOf(this.currentPort);
      if (currentPortIndex === (itinerary.ports.length - 1)) {
        throw new Error('End of itinerary reached')
      }
      this.previousPort = this.currentPort;
      this.currentPort.removeShip(this);
      this.currentPort = null;
    }

    dock() {
      const itinerary = this.itinerary;
      const previousPortIndex = itinerary.ports.indexOf(this.previousPort);
      this.currentPort = itinerary.ports[previousPortIndex + 1];
      this.currentPort.addShip(this);
      
      const nextPortIndex = itinerary.ports.indexOf(this.nextPort);
      const currentPortIndex = itinerary.ports.indexOf(this.currentPort);
      this.nextPort = itinerary.ports[currentPortIndex + 1];
      if (nextPortIndex === (itinerary.ports.length - 1)) {
        this.nextPort = 'Nothing to see here'
      }
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Ship;
  } else {
    window.Ship = Ship;
  }
}());