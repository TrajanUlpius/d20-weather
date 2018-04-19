var precipitationFrequencyType = {
    drought: 0,
    rare: 1,
    intermittent: 2,
    common: 3,
    constant: 4
};

var precipitationFrequencyValue = [5, 15, 30, 60, 95];

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
                probability: 20,
                variation: '-3d10',
                duration: '1d4'
            },
            {
                probability: 40,
                variation: '-2d10',
                duration: '1d6+1'
            },
            {
                probability: 60,
                variation: '-1d10',
                duration: '1d6+2'
            },
            {
                probability: 80,
                variation: 0,
                duration: '1d6+2'
            },
            {
                probability: 95,
                variation: '1d10',
                duration: '1d6+1'
            },
            {
                probability: 99,
                variation: '2d10',
                duration: '1d4'
            },
            {
                probability: 100,
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
                probability: 5,
                variation: '-3d10',
                duration: '1d2'
            },
            {
                probability: 15,
                variation: '-2d10',
                duration: '1d4'
            },
            {
                probability: 35,
                variation: '-1d10',
                duration: '1d4+1'
            },
            {
                probability: 65,
                variation: 0,
                duration: '1d6+1'
            },
            {
                probability: 85,
                variation: '1d10',
                duration: '1d4+1'
            },
            {
                probability: 95,
                variation: '2d10',
                duration: '1d4'
            },
            {
                probability: 100,
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
                probability: 10,
                variation: '-2d10',
                duration: '1d2'
            },
            {
                probability: 25,
                variation: '-1d10',
                duration: '1d2'
            },
            {
                probability: 55,
                variation: 0,
                duration: '1d4'
            },
            {
                probability: 85,
                variation: '1d10',
                duration: '1d4'
            },
            {
                probability: 100,
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
                probability: 20,
                name: 'lightFog',
                duration: '1d8'
            },
            {
                probability: 40,
                name: 'mediumFog',
                duration: '1d6'
            },
            {
                probability: 50,
                name: 'drizzle',
                duration: '1d4'
            },
            {
                probability: 75,
                name: 'drizzle',
                duration: '2d12'
            },
            {
                probability: 90,
                name: 'rain',
                duration: '1d4'
            },
            {
                probability: 100,
                name: 'rain',
                mayBeSleet: true,
                duration: 1
            }
        ],
        frozen: [{
                probability: 20,
                name: 'lightFog',
                duration: '1d6'
            },
            {
                probability: 40,
                name: 'lightFog',
                duration: '1d8'
            },
            {
                probability: 50,
                name: 'mediumFog',
                duration: '1d4'
            },
            {
                probability: 60,
                name: 'lightSnow',
                duration: 1
            },
            {
                probability: 75,
                name: 'lightSnow',
                duration: '1d4'
            },
            {
                probability: 100,
                name: 'lightSnow',
                duration: '2d12'
            }
        ]
    },
    medium: {
        unfrozen: [{
                probability: 10,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 20,
                name: 'mediumFog',
                duration: '1d12'
            },
            {
                probability: 30,
                name: 'heavyFog',
                duration: '1d4'
            },
            {
                probability: 35,
                name: 'rain',
                duration: '1d4'
            },
            {
                probability: 70,
                name: 'rain',
                duration: '1d8'
            },
            {
                probability: 90,
                name: 'rain',
                duration: '2d12'
            },
            {
                probability: 100,
                name: 'rain',
                mayBeSleet: true,
                duration: '1d4'
            }
        ],
        frozen: [{
                probability: 10,
                name: 'mediumFog',
                duration: '1d6'
            },
            {
                probability: 20,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 30,
                name: 'heavyFog',
                duration: '1d4'
            },
            {
                probability: 50,
                name: 'mediumSnow',
                duration: '1d4'
            },
            {
                probability: 90,
                name: 'mediumSnow',
                duration: '1d8'
            },
            {
                probability: 100,
                name: 'mediumSnow',
                duration: '2d12'
            }
        ]
    },
    heavy: {
        unfrozen: [{
                probability: 10,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 20,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 50,
                name: 'heavyRain',
                duration: '1d12'
            },
            {
                probability: 70,
                name: 'heavyRain',
                duration: '2d12'
            },
            {
                probability: 85,
                name: 'heavyRain',
                mayBeSleet: true,
                duration: '1d8'
            },
            {
                probability: 90,
                name: 'thunderstorm',
                duration: 1
            },
            {
                probability: 100,
                name: 'thunderstorm',
                duration: '1d3'
            }
        ],
        frozen: [{
                probability: 10,
                name: 'mediumFog',
                duration: '1d8'
            },
            {
                probability: 20,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 60,
                name: 'lightSnow',
                duration: '2d12'
            },
            {
                probability: 90,
                name: 'mediumSnow',
                duration: '1d8'
            },
            {
                probability: 100,
                name: 'heavySnow',
                duration: '1d6'
            }
        ]
    },
    torrential: {
        unfrozen: [{
                probability: 5,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 10,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 30,
                name: 'heavyRain',
                duration: '2d6'
            },
            {
                probability: 60,
                name: 'heavyRain',
                duration: '2d12'
            },
            {
                probability: 80,
                name: 'heavyRain',
                mayBeSleet: true,
                duration: '2d6'
            },
            {
                probability: 95,
                name: 'thunderstorm',
                duration: '1d3'
            },
            {
                probability: 100,
                name: 'thunderstorm',
                duration: '1d6'
            }
        ],
        frozen: [{
                probability: 5,
                name: 'heavyFog',
                duration: '1d8'
            },
            {
                probability: 10,
                name: 'heavyFog',
                duration: '2d6'
            },
            {
                probability: 50,
                name: 'heavySnow',
                duration: '1d4'
            },
            {
                probability: 90,
                name: 'heavySnow',
                duration: '1d8'
            },
            {
                probability: 100,
                name: 'heavySnow',
                duration: '2d12'
            }
        ]
    }
};