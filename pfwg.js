Number.prototype.convertToCelsius = function convertToCelsius() {
  return Math.round((this - 32) / 1.8);
};

Number.prototype.convertToKilometers = function convertToKilometers() {
  return this * 1.60934;
};

Number.prototype.toAmPmString = function toAmPmString() {
  var hour;
  if (this === 0 || this === 12) {
    hour = 12;
  } else {
    hour = this % 12;
  }

  return hour + (this >= 12 ? " pm" : " am");
};

Date.prototype.getSeason = function getSeason() {
  switch (this.getMonth()) {
    case 0: // january
      return 'winter';
    case 1:
      return 'winter';
    case 2:
      return this.getDate() >= 22 ? 'spring' : 'winter';
    case 3:
      return 'spring';
    case 4:
      return 'spring';
    case 5:
      return this.getDate() >= 22 ? 'summer' : 'spring';
    case 6:
      return 'summer';
    case 7:
      return 'summer';
    case 8:
      return this.getDate() >= 22 ? 'fall' : 'summer';
    case 9:
      return 'fall';
    case 10:
      return 'fall';
    case 11:
      return this.getDate() >= 22 ? 'winter' : 'fall';
  }
}

var throwDie = function throwDie(nbFaces) {
  return 1 + Math.floor(Math.random() * nbFaces);
};

var readDiceFormula = function readDiceFormula(formula) {
  if (typeof formula === "number") {
    return formula;
  } else {
    var modificator = 0;
    var plusSignIndex = formula.indexOf("+");
    if (plusSignIndex > 0) {
      modificator = parseInt(formula.substr(plusSignIndex));
    }

    var minusSignIndex = formula.indexOf("-");
    if (minusSignIndex > 0) {
      modificator = -parseInt(formula.substr(minusSignIndex));
    }

    var diceArray = formula.split("d").map(str => Math.abs(parseInt(str)));
    var sum = modificator;
    for (var die = 0; die < diceArray[0]; die++) {
      sum += throwDie(diceArray[1] - 1);
    }

    if (formula[0] === "-") {
      sum *= -1;
    }

    return sum;
  }
};

var generateWeather = function generateWeather(input) {
  var base = new Weather(
    climate[input.climate].temperature[input.season] + (elevation[input.elevation].temperatureAdjustment || 0),
    season[input.season][input.climate] + (elevation[input.elevation].precipitationFrequencyAdjustment || 0) + (climate[input.climate].precipitationFrequencyAdjustment || 0),
    elevation[input.elevation].precipitationIntensity + (climate[input.climate].precipitationIntensityAdjustment || 0)
  );

  // roll for clouds
  base.cloudCheck = throwDie(100);
  base.cloud = {
    form: cloudCoverTable.filter(effect => base.cloudCheck <= effect.probability)[0]
  };

  // roll for wind effect
  base.windspeedCheck = throwDie(100);
  base.wind = {
    form: windspeedTable.filter(effect => base.windspeedCheck <= effect.probability)[0],
    direction: windDirection[throwDie(16) - 1]
  };

  // add some variation to the temperature
  base.temperatureVariationCheck = throwDie(100);
  var temperatureVariation = climate[input.climate].temperatureVariations.filter(v => base.temperatureVariationCheck <= v.probability)[0];
  base.temperature += readDiceFormula(temperatureVariation.variation);
  // add some variation due to cloud cover
  if (base.cloud.form.name === "Cloudcast") {
    base.temperature += input.season === "spring" || input.season === "summer" ? -10 : 10;
  }
  base.temperatureNight = base.temperature + readDiceFormula("-3d6");

  // is there any precipitation ?
  base.precipitationCheck = throwDie(100);

  if (base.precipitationCheck >= 100 - precipitationFrequencyValue[base.precipitationFrequency]) {
    // drought means that precipitation is less intense
    if (base.precipitationFrequency === precipitationFrequencyType.drought) {
      base.precipitationIntensity--;
    }

    var precipitationIntensityName = Object.keys(precipitationTable)[base.precipitationIntensity];

    base.precipitationFormCheck = throwDie(100);

    // TODO: apply night temperature if precipitation occurs at night (sunset hour based on season)
    var precipitationFormArray = precipitationTable[precipitationIntensityName][base.temperature <= 32 ? "frozen" : "unfrozen"];

    var precipitationForm = precipitationFormArray.filter(form => base.precipitationFormCheck <= form.probability)[0];

    base.precipitation = [{
      form: precipitationForms[precipitationForm.name],
      start: throwDie(24) - 1,
      duration: readDiceFormula(precipitationForm.duration)
    }];

    // additional computation for thunderstorms
    if (precipitationForm.name === "thunderstorm") {
      // thunderstorm features heavy rain
      base.precipitation.push({
        form: precipitationForms.heavyRain
      });

      // 40 % chance of hail
      if (throwDie(100) > 60) {
        base.precipitation.push({
          form: precipitationForms.hail
        });
      }

      // thunderstorm features winds
      base.rolls = {
        thunderstormWindCheck: throwDie(100)
      };
      var windforce = thunderstormWindsTable.filter(form => base.rolls.thunderstormWindCheck <= form.probability)[0];
      base.wind = {
        form: windspeedTable.filter(effect => effect.name === windforce.name)[0]
      };

      // thunderstorm features lightning
      base.precipitation.push({
        form: precipitationForms.lightning
      });

      // There is a 20 % chance that a thunderstorm of any strength in the desert also generates a haboob.
      if (throwDie(100) > 80) {
        base.precipitation.push({
          form: precipitationForms.sandstorm
        });
      }

      if (base.wind.form.name === "windstorm") {
        if (throwDie(100) > 90) {
          base.precipitation.push({
            form: precipitationForms.tornado
          });
        }

        if (throwDie(100) > 80 && base.temperature > 85) {
          base.precipitation.push({
            form: precipitationForms.hurricane
          });
        }
      }
    }
  }

  return base;
};