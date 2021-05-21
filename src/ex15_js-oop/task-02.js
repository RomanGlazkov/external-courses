class Room {
    constructor(name, ...args) {
        this.name = name;
        this.appliances = [...args];
    }

    getAppliancesPower() {
        let result = 0;

        this.appliances.forEach(elem => {
            if (elem.isTurnedOn) {
                result += elem.power;
            }
        });

        return result;
    }

    searchAppliance(applianceName) {
        let isFound = false;

        this.appliances.forEach(elem => {
            if (elem.name.search(applianceName.toLowerCase()) !== -1) {
                console.log(elem);
                isFound = true;
            }
        });

        if (!isFound) {
            console.log('Nothing found!');
        }
    }
}

class ElectricalAppliance {
    constructor(name, power, isTurnedOn) {
        this.name = name;
        this.power = power;
        this.isTurnedOn = isTurnedOn;
    }
}

class Lamp extends ElectricalAppliance {
    constructor(name, power, isTurnedOn, type) {
        super(name, power, isTurnedOn);
        this.type = type;
    }

    blink() {
        console.log('Blink blink');
    }
}

class Notebook extends ElectricalAppliance {
    constructor(name, power, isTurnedOn, model) {
        super(name, power, isTurnedOn);
        this.model = model;
    }
}

const lamp = new Lamp('lamp', 20, true, 'diode');
const notebook = new Notebook('notebook', 80, false, 'lenovo');
const coffeeMachine = new ElectricalAppliance('coffee machine', 120, true);
const refrigerator = new ElectricalAppliance('refrigerator', 180, true);
const room = new Room('kitchen', lamp, notebook, coffeeMachine, refrigerator);