class Room {
    constructor(name, ...args) {
        this.name = name;
        this.appliances = [...args];
    }

    getAppliancesPower() {
        let turnedOnAppliances = this.appliances.filter(elem => elem.isTurnedOn);
        let result = turnedOnAppliances.reduce((sum, elem) => sum + elem.power, 0);

        return result;
    }

    searchAppliance(applianceName) {
        let appliance = this.appliances.find(elem => elem.name.search(applianceName.toLowerCase()) !== -1);
        
        return appliance ? console.log(appliance) : console.log('Nothing found!');
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