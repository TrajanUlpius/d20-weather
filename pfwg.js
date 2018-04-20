Number.prototype.convertToCelsius = function convertToCelsius() {
    return Math.round((this - 32) / 1.8);
};

var throwDie = function throwDie(nbFaces) {
    return 1 + Math.floor(Math.random() * nbFaces);
};

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
            sum += throwDie(diceArray[1] - 1);
        }

        if (formula[0] === '-') {
            sum *= -1;
        }

        return sum;
    }
};

var generateWeather = function generateWeather(input) {
    var base = new Weather (
        climate[input.climate].temperature[input.season] + (elevation[input.elevation].temperatureAdjustment || 0),
        season[input.season][input.climate] + (elevation[input.elevation].precipitationFrequencyAdjustment || 0) + (climate[input.climate].precipitationFrequencyAdjustment || 0),
        elevation[input.elevation].precipitationIntensity + (climate[input.climate].precipitationIntensityAdjustment || 0)
    );

    // add some variation to the temperature
    base.temperatureVariationCheck = throwDie(100);
    var temperatureVariation = climate[input.climate].temperatureVariations.filter(v => base.temperatureVariationCheck <= v.probability)[0];
    base.temperature += readDiceFormula(temperatureVariation.variation);

    // is there any precipitation ?
    base.precipitationCheck = throwDie(100);

    if (base.precipitationCheck < precipitationFrequencyValue[base.precipitationFrequency]) {

        // drought means that precipitation is less intense
        if (base.precipitationFrequency === precipitationFrequencyType.drought) {
            base.precipitationIntensity--;
        }

        base.precipitationFormCheck = throwDie(100);
        var precipitationFormArray = precipitationForm[Object.keys(precipitationForm)[base.precipitationIntensity]][base.temperature <= 32 ? 'frozen' : 'unfrozen'];

        base.precipitation = {
            form: precipitationFormArray.filter(form => base.precipitationFormCheck <= form.probability)[0],
            start: throwDie(24) - 1
        };

        // compute duration
        base.precipitation.duration = readDiceFormula(base.precipitation.form.duration);
    }

    return base;
};