module.exports.config = {

  address: "localhost",
	port: 8000,
  get wsAddress() { return `ws://${this.address}:${this.port}`; },
	// Raspberry PI: https://github.com/nebrius/raspi-io/wiki/Pin-Information
	pins: {
		up: 'P1-33',
		bottom: 'P1-35',
		left: 'P1-31',
		right: 'P1-37',
		fire: 'P1-29'
	}
	/*
	// Arduino
	pins: {
		up: 10,
		bottom: 9,
		left: 11,
		right: 8,
		fire: 12
	}
	*/

};
