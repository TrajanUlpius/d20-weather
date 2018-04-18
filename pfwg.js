var readDiceFormula = function readDiceFormula(formula) {
    if (typeof (formula) === 'number') {
        return formula;
    } else {
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
        temperatureVariations: [{
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
            winter: 30,
            spring: 60,
            summer: 80,
            fall: 60
        },
        temperatureVariations: [{
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
            winter: 50,
            spring: 75,
            summer: 95,
            fall: 75
        },
        precipitationFrequencyAdjustment: 1,
        precipitationIntensityAdjustment: 1,
        temperatureVariations: [{
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

var precipitationFormTypes = {
    lightFog: {
        name: 'light fog',
        text: precipitationTexts.lightFog,
        class: 'wi-fog light'
    },
    mediumFog: {
        name: 'medium fog',
        text: precipitationTexts.mediumFog,
        class: 'wi-fog medium'
    },
    heavyFog: {
        name: 'heavy fog',
        text: precipitationTexts.heavyFog,
        class: 'wi-fog heavy'
    },
    drizzle: {
        name: 'drizzle',
        text: precipitationTexts.drizzle,
        class: 'wi-day-rain light'
    },
    rain: {
        name: 'rain',
        text: precipitationTexts.rain,
        class: 'wi-rain medium'
    },
    heavyRain: {
        name: 'heavy rain',
        text: precipitationTexts.heavyRain,
        class: 'wi-day-rain heavy'
    },
    sleet: {
        name: 'sleet',
        text: precipitationTexts.sleet,
        class: 'wi-sleet heavy'
    },
    lightSnow: {
        name: 'light snow',
        text: precipitationTexts.lightSnow,
        class: 'wi-snow light'
    },
    mediumSnow: {
        name: 'medium snow',
        text: precipitationTexts.mediumSnow,
        class: 'wi-snow medium'
    },
    heavySnow: {
        name: 'heavy snow',
        text: precipitationTexts.heavySnow,
        class: 'wi-day-rain heavy'
    },
    thunderstorm: {
        name: 'thunderstorm',
        text: precipitationTexts.thunderstorm,
        class: 'wi-thunderstorm heavy'
    }

};

var precipitationForm = {
    light: {
        unfrozen: [{
                probability: 0.2,
                name: 'lightFog',
                duration: '1d8'
            },
            {
                probability: 0.4,
                name: 'mediumFog',
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
                name: 'rain',
                duration: '1d4'
            },
            {
                probability: 1,
                name: 'rain',
                mayBeSleet: true,
                duration: 1
            }
        ],
        frozen: [{
                probability: 0.2,
                name: 'lightFog',
                duration: '1d6'
            },
            {
                probability: 0.4,
                name: 'lightFog',
                duration: '1d8'
            },
            {
                probability: 0.5,
                name: 'mediumFog',
                duration: '1d4'
            },
            {
                probability: 0.6,
                name: 'lightSnow',
                duration: 1
            },
            {
                probability: 0.75,
                name: 'lightSnow',
                duration: '1d4'
            },
            {
                probability: 1,
                name: 'lightSnow',
                duration: '2d12'
            }
        ]
    },
    medium: {
        unfrozen: [{
                probability: 0.1,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 0.2,
                name: 'mediumFog',
                duration: '1d12'
            },
            {
                probability: 0.3,
                name: 'heavyFog',
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
                name: 'rain',
                mayBeSleet: true,
                duration: '1d4'
            }
        ],
        frozen: [{
                probability: 0.1,
                name: 'mediumFog',
                duration: '1d6'
            },
            {
                probability: 0.2,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 0.3,
                name: 'heavyFog',
                duration: '1d4'
            },
            {
                probability: 0.5,
                name: 'mediumSnow',
                duration: '1d4'
            },
            {
                probability: 0.9,
                name: 'mediumSnow',
                duration: '1d8'
            },
            {
                probability: 1,
                name: 'mediumSnow',
                duration: '2d12'
            }
        ]
    },
    heavy: {
        unfrozen: [{
                probability: 0.1,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 0.2,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 0.5,
                name: 'heavyRain',
                duration: '1d12'
            },
            {
                probability: 0.7,
                name: 'heavyRain',
                duration: '2d12'
            },
            {
                probability: 0.85,
                name: 'heavyRain',
                mayBeSleet: true,
                duration: '1d8'
            },
            {
                probability: 0.9,
                name: 'thunderstorm',
                duration: 1
            },
            {
                probability: 1,
                name: 'thunderstorm',
                duration: '1d3'
            }
        ],
        frozen: [{
                probability: 0.1,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 0.2,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 0.6,
                name: 'lightSnow',
                duration: '2d12'
            },
            {
                probability: 0.9,
                name: 'mediumSnow',
                duration: '1d8'
            },
            {
                probability: 1,
                name: 'heavySnow',
                duration: '1d6'
            }
        ]
    },
    torrential: {
        unfrozen: [{
                probability: 0.05,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 0.1,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 0.3,
                name: 'heavyRain',
                duration: '2d6'
            },
            {
                probability: 0.6,
                name: 'heavyRain',
                duration: '2d12'
            },
            {
                probability: 0.8,
                name: 'heavyRain',
                mayBeSleet: true,
                duration: '2d6'
            },
            {
                probability: 0.95,
                name: 'thunderstorm',
                duration: '1d3'
            },
            {
                probability: 1,
                name: 'thunderstorm',
                duration: '1d6'
            }
        ],
        frozen: [{
                probability: 0.05,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 0.1,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 0.5,
                name: 'heavySnow',
                duration: '1d4'
            },
            {
                probability: 0.9,
                name: 'heavySnow',
                duration: '1d8'
            },
            {
                probability: 1,
                name: 'heavySnow',
                duration: '2d12'
            }
        ]
    }
};

var generateWeather = function generateWeather(input) {
    var base = {
        temperature: climate[input.climate].temperature[input.season] + (elevation[input.elevation].temperatureAdjustment || 0),
        precipitationFrequency: season[input.season][input.climate] + (elevation[input.elevation].precipitationFrequencyAdjustment || 0) + (climate[input.climate].precipitationFrequencyAdjustment || 0),
        precipitationIntensity: elevation[input.elevation].precipitationIntensity + (climate[input.climate].precipitationIntensityAdjustment || 0)
    };

    // add some variation to the temperature
    base.temperatureVariationCheck = Math.random();
    var temperatureVariation = climate[input.climate].temperatureVariations.filter(v => base.temperatureVariationCheck <= v.probability)[0];
    base.temperature += readDiceFormula(temperatureVariation.variation);

    // is there any precipitation ?
    base.precipitationCheck = Math.random();

    if (base.precipitationCheck < precipitationFrequencyValue[base.precipitationFrequency]) {

        // drought means that precipitation is less intense
        if (base.precipitationFrequency === precipitationFrequencyType.drought) {
            base.precipitationIntensity--;
        }

        base.precipitationFormCheck = Math.random();
        var precipitationFormArray = precipitationForm[Object.keys(precipitationForm)[base.precipitationIntensity]][base.temperature <= 32 ? 'frozen' : 'unfrozen'];

        base.precipitation = {
            form: precipitationFormArray.filter(form => base.precipitationFormCheck <= form.probability)[0],
            start: Math.random() * 23
        };

        // compute duration
        base.precipitation.duration = readDiceFormula(base.precipitation.form.duration);
    }

    return base;
};