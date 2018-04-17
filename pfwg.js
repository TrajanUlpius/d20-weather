var readDiceFormula = function readDiceFormula(formula) {
    if (typeof (formula) === 'number') {
        return base.precipitation.form.duration;
    }
    else {
        var modificator = 0;
        var plusSignIndex = formula.indexOf('+');
        if (plusSignIndex > 0) {
            modificator = parseInt(formula.substr(plusSignIndex));
        }

        var minusSignIndex = formula.indexOf('-');
        if (minusSignIndex > 0) {
            modificator = -parseInt(formula.substr(minusSignIndex));
        }

        var diceArray = formula.split('d').map(str => Math.abs(parseInt(str)));
        var sum = modificator;
        for (var die = 0; die < diceArray[0]; die++) {
            sum += 1 + Math.random() * (diceArray[1] - 1);
        }

        if (formula[0] === '-') {
            sum *= -1;
        }

        return sum;
    }
};

var input = {
    climate: 'temperate',
    elevation: 'lowland',
    season: 'fall'
};


var precipitationFrequencyType = {
    drought: 0,
    rare: 1,
    intermittent: 2,
    common: 3,
    constant: 4
};

var precipitationFrequencyValue = [0.05, 0.15, 0.30, 0.60, 0.95];

var precipitationIntensityType = {
    light: 0,
    medium: 1,
    heavy: 2,
    torretial: 3
};

var climate = {
    cold: {
        temperature: {
            winter: 20,
            spring: 30,
            summer: 40,
            fall: 30
        },
        precipitationFrequencyAdjustment: -1,
        precipitationIntensityAdjustment: -1,
        temperatureVariations: [
            {
                probability: 0.2,
                variation: '-3d10',
                duration: '1d4'
            },
            {
                probability: 0.4,
                variation: '-2d10',
                duration: '1d6+1'
            },
            {
                probability: 0.6,
                variation: '-1d10',
                duration: '1d6+2'
            },
            {
                probability: 0.8,
                variation: 0,
                duration: '1d6+2'
            },
            {
                probability: 0.95,
                variation: '1d10',
                duration: '1d6+1'
            },
            {
                probability: 0.99,
                variation: '2d10',
                duration: '1d4'
            },
            {
                probability: 1,
                variation: '3d10',
                duration: '1d2'
            }
        ]
    },
    temperate: {
        temperature: {
            winter: 20,
            spring: 30,
            summer: 40,
            fall: 30
        },
        temperatureVariations: [
            {
                probability: 0.05,
                variation: '-3d10',
                duration: '1d2'
            },
            {
                probability: 0.15,
                variation: '-2d10',
                duration: '1d4'
            },
            {
                probability: 0.35,
                variation: '-1d10',
                duration: '1d4+1'
            },
            {
                probability: 0.65,
                variation: 0,
                duration: '1d6+1'
            },
            {
                probability: 0.85,
                variation: '1d10',
                duration: '1d4+1'
            },
            {
                probability: 0.95,
                variation: '2d10',
                duration: '1d4'
            },
            {
                probability: 1,
                variation: '3d10',
                duration: '1d2'
            }
        ]
    },
    tropical: {
        temperature: {
            winter: 20,
            spring: 30,
            summer: 40,
            fall: 30
        },
        precipitationFrequencyAdjustment: 1,
        precipitationIntensityAdjustment: 1,
        temperatureVariations: [
            {
                probability: 0.1,
                variation: '-2d10',
                duration: '1d2'
            },
            {
                probability: 0.25,
                variation: '-1d10',
                duration: '1d2'
            },
            {
                probability: 0.55,
                variation: 0,
                duration: '1d4'
            },
            {
                probability: 0.85,
                variation: '1d10',
                duration: '1d4'
            },
            {
                probability: 1,
                variation: '2d10',
                duration: '1d2'
            }
        ]
    }
};

var elevation = {
    seaLevel: {
        precipitationIntensity: precipitationIntensityType.heavy,
        temperatureAdjustment: 10
    },
    lowland: {
        precipitationIntensity: precipitationIntensityType.medium
    },
    highland: {
        precipitationIntensity: precipitationIntensityType.medium,
        temperatureAdjustment: -10,
        precipitationFrequencyAdjustment: -1
    }
};

var season = {
    winter: {
        cold: precipitationFrequencyType.rare,
        temperate: precipitationFrequencyType.rare,
        tropical: precipitationFrequencyType.rare,
    },
    spring: {
        cold: precipitationFrequencyType.intermittent,
        temperate: precipitationFrequencyType.intermittent,
        tropical: precipitationFrequencyType.common,
    },
    summer: {
        cold: precipitationFrequencyType.common,
        temperate: precipitationFrequencyType.common,
        tropical: precipitationFrequencyType.intermittent,
    },
    fall: {
        cold: precipitationFrequencyType.intermittent,
        temperate: precipitationFrequencyType.intermittent,
        tropical: precipitationFrequencyType.common,
    }
};

var precipitationForm = {
    light: {
        unfrozen: [
            {
                probability: 0.2,
                name: 'light fog',
                duration: '1d8'
            },
            {
                probability: 0.4,
                name: 'medium fog',
                duration: '1d6'
            },
            {
                probability: 0.5,
                name: 'drizzle',
                duration: '1d4'
            },
            {
                probability: 0.75,
                name: 'drizzle',
                duration: '2d12'
            },
            {
                probability: 0.9,
                name: 'light rain',
                duration: '1d4'
            },
            {
                probability: 1,
                name: 'light rain (sleet if below 40°F)',
                duration: 1
            }
        ],
        frozen: [
            {
                probability: 0.2,
                name: 'light fog',
                duration: '1d6'
            },
            {
                probability: 0.4,
                name: 'light fog',
                duration: '1d8'
            },
            {
                probability: 0.5,
                name: 'medium fog',
                duration: '1d4'
            },
            {
                probability: 0.6,
                name: 'light snow',
                duration: 1
            },
            {
                probability: 0.75,
                name: 'light snow',
                duration: '1d4'
            },
            {
                probability: 1,
                name: 'light snow',
                duration: '2d12'
            }
        ]
    },
    medium: {
        unfrozen: [
            {
                probability: 0.1,
                name: 'medium fog',
                duration: '1d8'
            },
            {
                probability: 0.2,
                name: 'medium fog',
                duration: '1d12'
            },
            {
                probability: 0.3,
                name: 'heavy fog',
                duration: '1d4'
            },
            {
                probability: 0.35,
                name: 'rain',
                duration: '1d4'
            },
            {
                probability: 0.7,
                name: 'rain',
                duration: '1d8'
            },
            {
                probability: 0.9,
                name: 'rain',
                duration: '2d12'
            },
            {
                probability: 1,
                name: 'rain (sleet if below 40°F)',
                duration: '1d4'
            }
        ],
        frozen: [
            {
                probability: 0.1,
                name: 'medium fog',
                duration: '1d6'
            },
            {
                probability: 0.2,
                name: 'medium fog',
                duration: '1d8'
            },
            {
                probability: 0.3,
                name: 'heavy fog',
                duration: '1d4'
            },
            {
                probability: 0.5,
                name: 'medium snow',
                duration: '1d4'
            },
            {
                probability: 0.9,
                name: 'medium snow',
                duration: '1d8'
            },
            {
                probability: 1,
                name: 'medium snow',
                duration: '2d12'
            }
        ]
    }
};

var base = {
    temperature: climate[input.climate].temperature[input.season] + (elevation[input.elevation].temperatureAdjustment || 0),
    precipitationFrequency: season[input.season][input.climate] + (elevation[input.elevation].precipitationFrequencyAdjustment || 0) + (climate[input.climate].precipitationFrequencyAdjustment || 0),
    precipitationIntensity: elevation[input.elevation].precipitationIntensity + (climate[input.climate].precipitationIntensityAdjustment || 0)
};

console.info({ base });

// add some variation to the temperature
var temperatureVariationCheck = Math.random();
var temperatureVariation = climate[input.climate].temperatureVariations.filter(v => temperatureVariationCheck <= v.probability)[0];
base.temperature += readDiceFormula(temperatureVariation.variation);

console.info({ temperatureVariationCheck, temperatureVariation, base });

// is there any precipitation ?
var precipitationCheck = Math.random();
console.info({ precipitationCheck, threshold: precipitationFrequencyValue[base.precipitationFrequency] });

if (precipitationCheck < precipitationFrequencyValue[base.precipitationFrequency]) {

    // drought means that precipitation is less intense
    if (base.precipitationFrequency === precipitationFrequencyType.drought) {
        base.precipitationIntensity--;
    }

    var precipitationFormCheck = Math.random();
    var precipitationFormArray = precipitationForm[Object.keys(precipitationForm)[base.precipitationIntensity]][base.temperature <= 32 ? 'frozen' : 'unfrozen'];

    base.precipitation = {
        form: precipitationFormArray.filter(form => precipitationFormCheck <= form.probability)[0],
        start: Math.random() * 23
    };

    // compute duration
    base.precipitation.duration = readDiceFormula(base.precipitation.form.duration);

    console.info({ precipitationFormCheck });
}


console.log(base);