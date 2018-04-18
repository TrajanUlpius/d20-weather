var precipitationTexts = {
    drizzle: 'Drizzle reduces visibility to three-quarters of the normal range, imposing a –2 penalty on Perception checks. It automatically extinguishes tiny unprotected flames (candles and the like, but not torches).',
    lightFog: 'Light fog reduces visibility to three-quarters of the normal ranges, resulting in a –2 penalty on Perception checks and a –2 penalty on ranged attacks. Light fog typically occurs early in the day, late in the day, or sometimes at night, but the heat of the midday usually burns it away. Light fog occurs only when there is no or light wind.',
    mediumFog: 'Medium fog reduces visibility ranges by half, resulting in a –4 penalty on Perception checks and a –4 penalty on ranged attacks. Medium fog typically occurs early in the day, late in the day, or sometimes at night, but the heat of the midday usually burns it away. Medium fog occurs only when there is no or light wind.',
    heavyFog: 'Heavy fog obscures all vision beyond 5 feet, including darkvision. Creatures 5 feet away have concealment. Heavy fog typically occurs early in the day, late in the day, or sometimes at night, but the heat of the midday usually burns it away. Heavy fog occurs only when there is no or light wind.',
    rain: 'Rain reduces visibility ranges by half, resulting in a –4 penalty on Perception checks. Rain automatically extinguishes unprotected flames (candles, torches, and the like) and imposes a –4 penalty on ranged attacks.',
    heavyRain: 'Heavy rain reduces visibility to one-quarter of the normal range, resulting in a –6 penalty on Perception checks. Heavy rain automatically extinguishes unprotected flames and imposes a –6 penalty on ranged attacks.',
    sleet: 'Essentially frozen rain, sleet has the same effect as light snow, but any accumulation typically doesn’t last longer than 1–2 hours after the storm.',
    lightSnow: 'Light snow reduces visibility to three-quarters of the normal range, resulting in a –2 penalty on Perception checks. Light snow has a 75% chance each hour of extinguishing unprotected flames and imposes a –2 penalty on ranged attacks. Light snow does not impede movement unless it continues for 2 or more hours, at which point moving into a square of such snow requires 1 extra 5-foot square of movement (this stacks with difficult terrain). Every 2 hours of light snow leaves 1 inch of snow on the ground. As long as at least 2 inches of snow remain on the ground, the requirement of an extra square of movement to enter a square of snow persists. If at least 1 foot of snow remains on the ground, entering a snow-filled square instead requires 2 extra squares of movement.',
    mediumSnow: 'Medium snow reduces visibility ranges by half, resulting in a –4 penalty on Perception checks. Medium snow extinguishes unprotected flames and imposes a –4 penalty on ranged attacks. Medium snow does not impede movement unless it continues for 1 hour, at which point moving into a square of such snow requires 1 extra 5-foot square of movement (this stacks with difficult terrain). Every hour of medium snow leaves 1 inch of snow on the ground. As long as at least 2 inches of snow remain on the ground, the requirement of an extra square of movement to enter a square of snow persists. If at least 1 foot of snow remains on the ground, entering a snow-filled square instead requires 2 extra squares of movement.',
    heavySnow: 'Heavy snow reduces visibility ranges to one-quarter of the normal range, resulting in a –6 penalty on Perception checks. It extinguishes unprotected flames and imposes a –6 penalty on ranged attacks. Heavy snow impedes movement even before it begins to stick. Moving into a square during a heavy snowstorm requires 1 extra 5-foot square of movement (this stacks with difficult terrain). Every hour of heavy snow leaves 1d4 inches of snow on the ground. As long as at least 2 inches of snow remain on the ground, the requirement of an extra square of movement to enter a square of snow persists. If at least 1 foot of snow remains on the ground, 2 extra squares of movement are required to enter a snow-filled square instead. A heavy snowstorm has a 10% chance of generating thundersnow and has a 40% chance of becoming a blizzard if the wind speed is severe or stronger.',
    thunderstorm: 'Thunderstorms feature powerful winds and heavy rain (see above). To determine the type of wind associated with the thunderstorm, roll on Table 4–27: Thunderstorm Winds.'
};

var hotTemperatureTexts = {
    all: 'Heat deals nonlethal damage that cannot be recovered from until the character gets cooled off (reaches shade, survives until nightfall, gets doused in water, is targeted by endure elements, and so forth). Once a character has taken an amount of nonlethal damage equal to her total hit points, any further damage from a hot environment is lethal damage.',
    veryHot: 'A character in very hot conditions (above 90° F) must make a Fortitude saving throw each hour (DC 15, +1 for each previous check) or take 1d4 points of nonlethal damage. Characters wearing heavy clothing or armor of any sort take a –4 penalty on their saves. A character with the Survival skill may receive a bonus on this saving throw and might be able to apply this bonus to other characters as well (see the skill description). Characters reduced to unconsciousness begin taking lethal damage (1d4 points per hour).',
    severeHeat: 'In severe heat (above 110° F), a character must make a Fortitude save once every 10 minutes (DC 15, +1 for each previous check) or take 1d4 points of nonlethal damage. Characters wearing heavy clothing or armor of any sort take a –4 penalty on their saves. A character with the Survival skill may receive a bonus on this saving throw and might be able to apply this bonus to other characters as well (see the Survival skill in Using Skills). Characters reduced to unconsciousness begin taking lethal damage (1d4 points per each 10-minute period). A character who takes any nonlethal damage from heat exposure now suffers from heatstroke and is fatigued. These penalties end when the character recovers from the nonlethal damage she took from the heat.',
    extremeHeat: 'Extreme heat (air temperature over 140° F, fire, boiling water, lava) deals lethal damage. Breathing air in these temperatures deals 1d6 points of fire damage per minute (no save). In addition, a character must make a Fortitude save every 5 minutes (DC 15, +1 per previous check) or take 1d4 points of nonlethal damage. Those wearing heavy clothing or any sort of armor take a –4 penalty on their saves.'
};

var coldTemperatureTexts = {
    all: 'Cold and exposure deal nonlethal damage to the victim. A character cannot recover from the damage dealt by a cold environment until she gets out of the cold and warms up again. Once a character has taken an amount of nonlethal damage equal to her total hit points, any further damage from a cold environment is lethal damage.',
    veryCold: 'An unprotected character in cold weather (below 40° F) must make a Fortitude save each hour (DC 15, +1 per previous check) or take 1d6 points of nonlethal damage. A character who has the Survival skill may receive a bonus on this saving throw and might be able to apply this bonus to other characters as well (see the skill description).',
    severeCold: 'In conditions of severe cold or exposure (below 0° F), an unprotected character must make a Fortitude save once every 10 minutes (DC 15, +1 per previous check), taking 1d6 points of nonlethal damage on each failed save. A character who has the Survival skill may receive a bonus on this saving throw and might be able to apply this bonus to other characters as well. Characters wearing a cold weather outfit only need check once per hour for cold and exposure damage. A character who takes any nonlethal damage from cold or exposure is beset by frostbite or hypothermia (treat her as fatigued). These penalties end when the character recovers the nonlethal damage she took from the cold and exposure.',
    extremeCold: 'Extreme cold (below –20° F) deals 1d6 points of lethal damage per minute (no save). In addition, a character must make a Fortitude save (DC 15, +1 per previous check) or take 1d4 points of nonlethal damage.'
};

var altitudeTexts = {
    'lowPass': 'Low Pass (lower than 5,000 feet): Most travel in low mountains takes place in low passes, a zone consisting largely of alpine meadows and forests. Travelers might find the going difficult (which is reflected in the movement modifiers for traveling through mountains), but the altitude itself has no game effect.',
    'highPass': 'Low Peak or High Pass (5,000 to 15,000 feet): Ascending to the highest slopes of low mountains, or most normal travel through high mountains, falls into this category. All non-acclimated creatures labor to breathe in the thin air at this altitude. Characters must succeed on a Fortitude save each hour (DC 15, +1 per previous check) or be fatigued. The fatigue ends when the character descends to an altitude with more air. Acclimated characters do not have to attempt the Fortitude save.',
    'highPeak': 'High Peak (more than 15,000 feet): The highest mountains exceed 15,000 feet in height. At these elevations, creatures are subject to both high altitude fatigue (as described above) and altitude sickness, whether or not they’re acclimated to high altitudes. Altitude sickness represents long-term oxygen deprivation, and affects mental and physical ability scores. After each 6-hour period a character spends at an altitude of over 15,000 feet, he must succeed on a Fortitude save (DC 15, +1 per previous check) or take 1 point of damage to all ability scores. Creatures acclimated to high altitude receive a +4 competence bonus on their saving throws to resist high altitude effects and altitude sickness, but eventually even seasoned mountaineers must abandon these dangerous elevations.'
};




//     Table 4–27: Thunderstorm Winds
// d % Thunderstorm	Wind Strength
// 1–50	Strong winds
// 51–90	Severe winds
// 91–100	Windstorm
// In addition, there is a 40 % chance that a thunderstorm features hail either up to an hour before or during the storm.An even greater danger presented by a thunderstorm is the lightning that occurs during the storm.These electrical discharges, generated by the roiling clouds, can pose a hazard to creatures that do not have proper shelters, especially creatures clad in metal armor.Every 10 minutes during a thunderstorm, a bolt of lightning strikes an unsheltered creature at random(though this can strike wildlife as easily as PCs).A creature struck by this lightning must succeed a DC 18 Reflex saving throw or take 10d8 points of electricity damage(a successful saving throw halves the damage).Creatures in metal armor take a –4 penalty on the Reflex saving throw.

// There is a 10 % chance that a thunderstorm with winds of windstorm strength also generates a tornado, while thunderstorms with windstorm - strength winds in temperatures higher than 85° F also have a 20 % chance of being a precursor to a hurricane.There is a 20 % chance that a thunderstorm of any strength in the desert also generates a haboob.

