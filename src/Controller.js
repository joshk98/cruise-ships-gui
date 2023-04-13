(function exportController() {
  class Controller {
    constructor(ship) {
      this.ship = ship;
      this.initialiseSea();

      document.querySelector("#sailButton").addEventListener("click", () => {
        this.setSail();
      });

      document.querySelector("#addPortButton").addEventListener("click", () => {
        this.addPort();
      });
    }

    initialiseSea() {
      const backgrounds = ["./images/water0.png", "./images/water1.png"];
      let backgroundIndex = 0;

      window.setInterval(() => {
        document.querySelector("#viewport").style.backgroundImage = `url('${
          backgrounds[backgroundIndex % backgrounds.length]
        }')`;
        backgroundIndex += 1;
      }, 1000);
    }

    renderPorts(ports) {
      const portsElement = document.querySelector("#ports");

      portsElement.style.width = "0px";

      while (portsElement.firstChild) {
        portsElement.removeChild(portsElement.firstChild);
      }

      ports.forEach((port, index) => {
        const newPortElement = document.createElement("div");
        const portsElementWidth = parseInt(portsElement.style.width, 10);

        newPortElement.className = "port";
        newPortElement.dataset.portName = port.name;
        newPortElement.dataset.portIndex = index;

        portsElement.appendChild(newPortElement);
        portsElement.style.width = `${portsElementWidth + 256}px`;
      });
    }

    renderShip() {
      const ship = this.ship;
      const shipPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const portElement = document.querySelector(
        `[data-port-index='${shipPortIndex}']`
      );
      const shipElement = document.querySelector("#ship");

      if (!portElement) return;

      shipElement.style.top = `${portElement.offsetTop + 32}px`;
      shipElement.style.left = `${portElement.offsetLeft - 32}px`;

      this.headsUp();
    }

    setSail() {
      const ship = this.ship;
      const currentPortIndex = ship.itinerary.ports.indexOf(ship.currentPort);
      const nextPortIndex = currentPortIndex + 1;
      const nextPortElement = document.querySelector(
        `[data-port-index='${nextPortIndex}']`
      );

      if (!nextPortElement) {
        return this.renderMessage("End of the line!");
      }

      this.renderMessage(`Now departing ${ship.currentPort.name}`);

      const sailButton = document.getElementById("sailButton");
      const addPortButton = document.getElementById("addPortButton");
      sailButton.disabled = true;
      addPortButton.disabled = true;

      const shipElement = document.querySelector("#ship");
      const sailInterval = setInterval(() => {
        const shipLeft = parseInt(shipElement.style.left, 10);

        if (shipLeft === nextPortElement.offsetLeft - 32) {
          sailButton.disabled = false;
          addPortButton.disabled = false;
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
      const messageElement = document.createElement("div");
      const viewport = document.querySelector("#viewport");

      messageElement.id = "message";
      messageElement.innerHTML = message;

      viewport.appendChild(messageElement);
      setTimeout(() => {
        viewport.removeChild(messageElement);
      }, 2000);
    }

    headsUp() {
      const headsUp = document.querySelector("#headsUp");
      const currentPort = this.ship.currentPort.name;
      const nextPort =
        this.ship.itinerary.ports[
          this.ship.itinerary.ports.indexOf(this.ship.currentPort) + 1
        ]?.name ?? "End of the line!";

      headsUp.innerHTML = `Current Port: ${currentPort}<br>Next Port: ${nextPort}`;
    }

    addPort() {
      const ship = this.ship;
      const portElement = document.getElementById("portNameInput");
      const portName = portElement.value.trim();
      const portExists = ship.itinerary.ports.some(
        (port) => port.name.toLowerCase() === portName.toLowerCase()
      );
      const port = new Port(portName);

      if (!portName) {
        alert("Please enter a valid port name.");
        return;
      }

      if (portExists) {
        alert("This port already exists in the itinerary.");
        return;
      }

      ship.itinerary.ports.push(port);

      if (!ship.currentPort) {
        ship.currentPort = ship.itinerary.ports[0];
        ship.currentPort.addShip(ship);
      }

      this.renderPorts(ship.itinerary.ports);
      this.renderShip();

      portElement.value = "";
    }
  }

  if (typeof module !== "undefined" && module.exports) {
    module.exports = Controller;
  } else {
    window.Controller = Controller;
  }
})();
