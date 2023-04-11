(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();
      document.querySelector('#sailButton').addEventListener('click', () => {
        this.setSail();
      });
      document.querySelector('#addPortButton').addEventListener('click', () => {
        this.addPort();
      });
    }

    initialiseSea() {
      const backgrounds = [
        './images/water0.png',
        './images/water1.png',
      ];
      let backgroundIndex = 0;
      window.setInterval(() => {
        document.querySelector('#viewport').style.backgroundImage = `url('${backgrounds[backgroundIndex % backgrounds.length]}')`;
        backgroundIndex += 1;
      }, 1000);
    }

    renderPorts(ports) {
      const portsElement = document.querySelector('#ports');
      portsElement.style.width = '0px';
      while (portsElement.firstChild) {
        portsElement.removeChild(portsElement.firstChild);
      }
      ports.forEach((port, index) => {
        const newPortElement = document.createElement('div');
        newPortElement.className = 'port';
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;
        portsElement.appendChild(newPortElement);
        const portsElementWidth = parseInt(portsElement.style.width, 10);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      })
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(`[data-port-index='${shipPortIndex}']`);
      const shipElement = document.querySelector('#ship');
      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;
      this.headsUp();
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(`[data-port-index='${nextPortIndex}']`);
      if (!nextPortElement) {
        return this.renderMessage('End of the line!');
      }
      this.renderMessage(`Now departing ${ship.currentPort.name}`);
      const shipElement = document.querySelector('#ship');
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);
        if (shipLeft === (nextPortElement.offsetLeft - 32)) {
          ship.setSail();
          ship.dock();
          this.renderMessage(`Arrived at ${ship.currentPort.name}`);
          this.headsUp();
          clearInterval(sailInterval);
        }
        shipElement.style.left = `${shipLeft + 1}px`;
      }, 20);
    }

    renderMessage(message) {
      const messageElement = document.createElement('div');
      messageElement.id = 'message';
      messageElement.innerHTML = message;
      const viewport = document.querySelector('#viewport');
      viewport.appendChild(messageElement);
      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000);
    }

    headsUp() {
      const headsUp = document.querySelector('#headsUp');
      const currentPort = this.ship.currentPort.name;
      const nextPort = this.ship.itinerary.ports[this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1]?.name ?? 'End of the line!';
      headsUp.innerHTML = `Current Port: ${currentPort}<br>Next Port: ${nextPort}`;
    }

    addPort() {
      const ship = this.ship
      const portName = document.getElementById("portNameInput").value.trim();
      if (!portName) {
        alert("Please enter a valid port name.");
        return;
      }
      const portExists = ship.itinerary.ports.some(port => port.name.toLowerCase() === portName.toLowerCase());
      if (portExists) {
        alert("This port already exists in the itinerary.");
        return;
      }
      const port = new Port(portName);
      ship.itinerary.ports.push(port);
      if (!ship.currentPort) {
        ship.currentPort = ship.itinerary.ports[0];
        ship.currentPort.addShip(ship);
      }
      this.renderPorts(ship.itinerary.ports);
      this.renderShip();
      document.getElementById("portNameInput").value = '';
    }
  }

  if (typeof module !== 'undefined' && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
}());