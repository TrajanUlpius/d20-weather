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
        variation: "-3d10",
        duration: "1d4"
      },
      {
        probability: 40,
        variation: "-2d10",
        duration: "1d6+1"
      },
      {
        probability: 60,
        variation: "-1d10",
        duration: "1d6+2"
      },
      {
        probability: 80,
        variation: 0,
        duration: "1d6+2"
      },
      {
        probability: 95,
        variation: "1d10",
        duration: "1d6+1"
      },
      {
        probability: 99,
        variation: "2d10",
        duration: "1d4"
      },
      {
        probability: 100,
        variation: "3d10",
        duration: "1d2"
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
        variation: "-3d10",
        duration: "1d2"
      },
      {
        probability: 15,
        variation: "-2d10",
        duration: "1d4"
      },
      {
        probability: 35,
        variation: "-1d10",
        duration: "1d4+1"
      },
      {
        probability: 65,
        variation: 0,
        duration: "1d6+1"
      },
      {
        probability: 85,
        variation: "1d10",
        duration: "1d4+1"
      },
      {
        probability: 95,
        variation: "2d10",
        duration: "1d4"
      },
      {
        probability: 100,
        variation: "3d10",
        duration: "1d2"
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
        variation: "-2d10",
        duration: "1d2"
      },
      {
        probability: 25,
        variation: "-1d10",
        duration: "1d2"
      },
      {
        probability: 55,
        variation: 0,
        duration: "1d4"
      },
      {
        probability: 85,
        variation: "1d10",
        duration: "1d4"
      },
      {
        probability: 100,
        variation: "2d10",
        duration: "1d2"
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
  },
  highpeak: {
    precipitationIntensity: precipitationIntensityType.medium,
    temperatureAdjustment: -10,
    precipitationFrequencyAdjustment: -1
  }
};

var season = {
  winter: {
    cold: precipitationFrequencyType.rare,
    temperate: precipitationFrequencyType.rare,
    tropical: precipitationFrequencyType.rare
  },
  spring: {
    cold: precipitationFrequencyType.intermittent,
    temperate: precipitationFrequencyType.intermittent,
    tropical: precipitationFrequencyType.common
  },
  summer: {
    cold: precipitationFrequencyType.common,
    temperate: precipitationFrequencyType.common,
    tropical: precipitationFrequencyType.intermittent
  },
  fall: {
    cold: precipitationFrequencyType.intermittent,
    temperate: precipitationFrequencyType.intermittent,
    tropical: precipitationFrequencyType.common
  }
};

var precipitationForms = {
  lightFog: {
    name: "light fog",
    text: precipitationTexts.lightFog,
    class: "wi-fog",
    severity: 1
  },
  mediumFog: {
    name: "medium fog",
    text: precipitationTexts.mediumFog,
    class: "wi-fog",
    severity: 2
  },
  heavyFog: {
    name: "heavy fog",
    text: precipitationTexts.heavyFog,
    class: "wi-fog",
    severity: 3
  },
  drizzle: {
    name: "drizzle",
    text: precipitationTexts.drizzle,
    class: "wi-rain",
    severity: 1
  },
  rain: {
    name: "rain",
    text: precipitationTexts.rain,
    class: "wi-rain",
    severity: 2
  },
  heavyRain: {
    name: "heavy rain",
    text: precipitationTexts.heavyRain,
    class: "wi-rain",
    severity: 3
  },
  sleet: {
    name: "sleet",
    text: precipitationTexts.sleet,
    class: "wi-sleet",
    severity: 1
  },
  lightSnow: {
    name: "light snow",
    text: precipitationTexts.lightSnow,
    class: "wi-snow",
    severity: 1
  },
  mediumSnow: {
    name: "medium snow",
    text: precipitationTexts.mediumSnow,
    class: "wi-snow",
    severity: 2
  },
  heavySnow: {
    name: "heavy snow",
    text: precipitationTexts.heavySnow,
    class: "wi-snow",
    severity: 3
  },
  thunderstorm: {
    name: "thunderstorm",
    text: precipitationTexts.thunderstorm,
    class: "wi-thunderstorm",
    severity: 4
  },
  lightning: {
    name: "lightning",
    text: precipitationTexts.lightning,
    class: "wi-lightning",
    severity: 4
  },
  blizzard: {
    name: "blizzard",
    text: precipitationTexts.blizzard,
    class: "wi-snow-wind",
    severity: 4
  },
  hail: {
    name: "hail",
    text: precipitationTexts.hail,
    class: "wi-hail",
    severity: 3
  },
  hurricane: {
    name: "hurricane",
    text: precipitationTexts.hurricane,
    class: "wi-hurricane",
    severity: 4
  },
  sandstorm: {
    name: "sandstorm",
    text: precipitationTexts.sandstorm,
    class: "wi-sandstorm",
    severity: 4
  },
  thundersnow: {
    name: "thundersnow",
    text: precipitationTexts.thundersnow,
    class: "wi-day-snow-thunderstorm",
    severity: 4
  },
  tornado: {
    name: "tornado",
    text: precipitationTexts.tornado,
    class: "wi-tornado",
    severity: 5
  },
  wildfire: {
    name: "wildfire",
    text: precipitationTexts.wildfire,
    class: "wi-fire",
    severity: 4
  }
};

/* Table 4–19: Light Unfrozen Precipitation
 * Table 4–20: Light Frozen Precipitation
 * Table 4–21: Medium Unfrozen Precipitation
 * Table 4–22: Medium Frozen Precipitation
 * Table 4–23: Heavy Unfrozen Precipitation
 * Table 4–24: Heavy Frozen Precipitation
 * Table 4–25: Torrential Unfrozen Precipitation
 * Table 4–26: Torrential Frozen Precipitation
 */
var precipitationTable = {
  light: {
    unfrozen: [{
        probability: 20,
        name: "lightFog",
        duration: "1d8"
      },
      {
        probability: 40,
        name: "mediumFog",
        duration: "1d6"
      },
      {
        probability: 50,
        name: "drizzle",
        duration: "1d4"
      },
      {
        probability: 75,
        name: "drizzle",
        duration: "2d12"
      },
      {
        probability: 90,
        name: "rain",
        duration: "1d4"
      },
      {
        probability: 100,
        name: "rain",
        mayBeSleet: true,
        duration: 1
      }
    ],
    frozen: [{
        probability: 20,
        name: "lightFog",
        duration: "1d6"
      },
      {
        probability: 40,
        name: "lightFog",
        duration: "1d8"
      },
      {
        probability: 50,
        name: "mediumFog",
        duration: "1d4"
      },
      {
        probability: 60,
        name: "lightSnow",
        duration: 1
      },
      {
        probability: 75,
        name: "lightSnow",
        duration: "1d4"
      },
      {
        probability: 100,
        name: "lightSnow",
        duration: "2d12"
      }
    ]
  },
  medium: {
    unfrozen: [{
        probability: 10,
        name: "mediumFog",
        duration: "1d8"
      },
      {
        probability: 20,
        name: "mediumFog",
        duration: "1d12"
      },
      {
        probability: 30,
        name: "heavyFog",
        duration: "1d4"
      },
      {
        probability: 35,
        name: "rain",
        duration: "1d4"
      },
      {
        probability: 70,
        name: "rain",
        duration: "1d8"
      },
      {
        probability: 90,
        name: "rain",
        duration: "2d12"
      },
      {
        probability: 100,
        name: "rain",
        mayBeSleet: true,
        duration: "1d4"
      }
    ],
    frozen: [{
        probability: 10,
        name: "mediumFog",
        duration: "1d6"
      },
      {
        probability: 20,
        name: "mediumFog",
        duration: "1d8"
      },
      {
        probability: 30,
        name: "heavyFog",
        duration: "1d4"
      },
      {
        probability: 50,
        name: "mediumSnow",
        duration: "1d4"
      },
      {
        probability: 90,
        name: "mediumSnow",
        duration: "1d8"
      },
      {
        probability: 100,
        name: "mediumSnow",
        duration: "2d12"
      }
    ]
  },
  heavy: {
    unfrozen: [{
        probability: 10,
        name: "heavyFog",
        duration: "1d8"
      },
      {
        probability: 20,
        name: "heavyFog",
        duration: "2d6"
      },
      {
        probability: 50,
        name: "heavyRain",
        duration: "1d12"
      },
      {
        probability: 70,
        name: "heavyRain",
        duration: "2d12"
      },
      {
        probability: 85,
        name: "heavyRain",
        mayBeSleet: true,
        duration: "1d8"
      },
      {
        probability: 90,
        name: "thunderstorm",
        duration: 1
      },
      {
        probability: 100,
        name: "thunderstorm",
        duration: "1d3"
      }
    ],
    frozen: [{
        probability: 10,
        name: "mediumFog",
        duration: "1d8"
      },
      {
        probability: 20,
        name: "heavyFog",
        duration: "2d6"
      },
      {
        probability: 60,
        name: "lightSnow",
        duration: "2d12"
      },
      {
        probability: 90,
        name: "mediumSnow",
        duration: "1d8"
      },
      {
        probability: 100,
        name: "heavySnow",
        duration: "1d6"
      }
    ]
  },
  torrential: {
    unfrozen: [{
        probability: 5,
        name: "heavyFog",
        duration: "1d8"
      },
      {
        probability: 10,
        name: "heavyFog",
        duration: "2d6"
      },
      {
        probability: 30,
        name: "heavyRain",
        duration: "2d6"
      },
      {
        probability: 60,
        name: "heavyRain",
        duration: "2d12"
      },
      {
        probability: 80,
        name: "heavyRain",
        mayBeSleet: true,
        duration: "2d6"
      },
      {
        probability: 95,
        name: "thunderstorm",
        duration: "1d3"
      },
      {
        probability: 100,
        name: "thunderstorm",
        duration: "1d6"
      }
    ],
    frozen: [{
        probability: 5,
        name: "heavyFog",
        duration: "1d8"
      },
      {
        probability: 10,
        name: "heavyFog",
        duration: "2d6"
      },
      {
        probability: 50,
        name: "heavySnow",
        duration: "1d4"
      },
      {
        probability: 90,
        name: "heavySnow",
        duration: "1d8"
      },
      {
        probability: 100,
        name: "heavySnow",
        duration: "2d12"
      }
    ]
  }
};

// Table 4–27: Thunderstorm Winds
var thunderstormWindsTable = [{
    probability: 50,
    name: "strong"
  },
  {
    probability: 90,
    name: "severe"
  },
  {
    probability: 100,
    name: "windstorm"
  }
];

// Table 4–28: Wind Strength
var windspeedTable = [{
    probability: 50,
    name: "light",
    speedMin: 0,
    speedMax: 10,
    penaltyRanged: 0,
    penaltySiege: 0,
    penaltySkill: 0,
    checkSize: "",
    blownAwaySize: "",
    beaufortScale: 1
  },
  {
    probability: 80,
    name: "moderate",
    speedMin: 11,
    speedMax: 20,
    penaltyRanged: 0,
    penaltySiege: 0,
    penaltySkill: 0,
    checkSize: "",
    blownAwaySize: "",
    beaufortScale: 4
  },
  {
    probability: 90,
    name: "strong",
    speedMin: 21,
    speedMax: 30,
    penaltyRanged: -2,
    penaltySiege: 0,
    penaltySkill: -2,
    checkSize: "Tiny",
    blownAwaySize: "",
    beaufortScale: 6
  },
  {
    probability: 95,
    name: "severe",
    speedMin: 31,
    speedMax: 50,
    penaltyRanged: -4,
    penaltySiege: 0,
    penaltySkill: -4,
    checkSize: "Small",
    blownAwaySize: "Tiny",
    beaufortScale: 8
  },
  {
    probability: 100,
    name: "windstorm",
    speedMin: 51,
    penaltyRanged: "Impossible",
    penaltySiege: -4,
    penaltySkill: -8,
    checkSize: "Medium",
    blownAwaySize: "Small",
    beaufortScale: 10
  }
];

// Table 4–29: Cloud Cover
var cloudCoverTable = [{
    probability: 50,
    name: "None"
  },
  {
    probability: 70,
    name: "Light clouds"
  },
  {
    probability: 85,
    name: "Medium clouds"
  },
  {
    probability: 100,
    name: "Overcast"
  }
];