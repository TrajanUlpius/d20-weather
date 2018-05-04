var drawCanvas = function drawCanvas(weather) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    ctx.fillStyle = "rgb(33, 37, 41)";
    ctx.font = "16px Alegreya";
    ctx.fillText("T°: " + weather.temperature + "°F / " + weather.temperature.convertToCelsius() + "°C", 10,
        25);
    ctx.fillText("Night: " + weather.temperatureNight + "°F / " + weather.temperatureNight.convertToCelsius() +
        "°C", 10, 50);
    ctx.fillText("Wind: " + weather.wind.form.speed, 10, 75);
    ctx.fillText("Clouds: " + weather.cloud.form.name.replace(/clouds$/i, '').trim(), 10, 100);

    document.getElementById('canvas-thumbnail').src = canvas.toDataURL();
    $('#canvas-thumbnail').tooltip();
};

var buildTile = function buildTile(p) {

    var $time;
    if (p.hasOwnProperty('start') && p.hasOwnProperty('duration')) {
        $time = $('<span>', {
            class: 'precipitation-time',
            text: p.start.toAmPmString() + ' - ' + (p.start + p.duration).toAmPmString()
        });
    }

    return $('<div>', {
        class: 'wi ' + p.form.class,
        'data-toggle': 'tooltip',
        title: p.form.text,
        'data-precipitation': p.form.name
    }).append($time).on('click', function (e) {
        $('#selected-weather-effects').html($(e.target).data('original-title'));
    });
};

var readValues = function readValues() {

    var input = {
        climate: $('#select-climate').val(),
        elevation: $('#select-elevation').val(),
        season: $('#select-season').val(),
    };

    var result = generateWeather(input);

    // display elevation rules
    if (altitudeTexts.hasOwnProperty(input.elevation)) {
        $('#altitude-effects').html(altitudeTexts[input.elevation]);
    }

    console.info(result);

    drawCanvas(result);

    $('#result-temperature-f').text(result.temperature);
    $('#result-temperature-c').text(result.temperature.convertToCelsius());
    $('#result-night-f').text(result.temperatureNight);
    $('#result-night-c').text(result.temperatureNight.convertToCelsius());
    $('#result-wind').text(result.wind.form.speed);
    $('#result-wind-direction').attr('class', 'wi wi-wind wi-towards-' + result.wind.direction);
    $('#result-clouds').text(result.cloud.form.name);

    $('#weather-effects').empty();

    // checkif precipitation has in-game effects
    if (result.hasOwnProperty('precipitation')) {

        var $tiles = result.precipitation.map(p => buildTile(p));

        $tiles.forEach($t => $t.tooltip());

        if ($tiles.filter($t => $t.data('precipitation').indexOf('fog') > 0).length > 0) {
            $('#weather-effects').prepend($('<header>', {
                html: precipitationTexts.allFog
            }));
        }

        $('#weather-effects').append($tiles);
    }

    // check if temperature has in-game effects
    var displayColdWarning = false,
        displayHeatWarning = false;
    if (result.hasOwnProperty('temperature')) {
        if (result.temperature <= -20) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-snowflake-cold heavy',
                        text: coldTemperatureTexts.extremeCold
                    }
                }).tooltip());
        } else if (result.temperature <= 0) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-snowflake-cold medium',
                        text: coldTemperatureTexts.severeCold
                    }
                }).tooltip());
        } else if (result.temperature <= 40) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-snowflake-cold light',
                        text: coldTemperatureTexts.severeCold
                    }
                }).tooltip());
        } else if (result.temperature >= 90) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot light',
                        text: hotTemperatureTexts.veryHot
                    }
                }).tooltip());
        } else if (result.temperature >= 110) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot medium',
                        text: hotTemperatureTexts.severeHot
                    }
                }).tooltip());
        } else if (result.temperature >= 140) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot heavy',
                        text: hotTemperatureTexts.extremeHot
                    }
                }).tooltip());
        }
    }

    // check if night is meaningfully colder than day
    if (result.hasOwnProperty('temperature') && result.hasOwnProperty('temperatureNight')) {
        if (result.temperatureNight <= -20 && result.temperature > 20) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear heavy',
                        text: coldTemperatureTexts.extremeCold
                    }
                }).tooltip());
        } else if (result.temperatureNight <= 0 && result.temperature > 0) {
            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear medium',
                        text: coldTemperatureTexts.severeCold
                    }
                }).tooltip());
        } else if (result.temperatureNight <= 40 && result.temperature > 40) {
            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear light',
                        text: coldTemperatureTexts.veryCold
                    }
                }).tooltip());
        }
    }

    if (displayColdWarning === true) {
        $('#weather-effects').prepend($('<header>', {
            html: coldTemperatureTexts.all
        }));
    } else if (displayHeatWarning === true) {
        $('#weather-effects').prepend($('<header>', {
            html: hotTemperatureTexts.all
        }));
    }

    // check if wind has in-game effects
    if (result.hasOwnProperty('wind') && result.wind.form.beaufortScale > 5) {

        // TODO: handle windstorms
        $('#weather-effects').prepend($('<header>', {
            html: windTexts.all
        }));

        var beaufortTooltip = '<b>' + result.wind.form.name + '</b>' +
            '<ul class="wind-effects"><li>ranged attacks: ' + result.wind.form.penaltyRanged +
            '</li><li>siege attacks: ' + result.wind.form.penaltySiege +
            '</li><li>skills: ' + result.wind.form.penaltySkill +
            '</li><li>checkSize: ' + result.wind.form.checkSize +
            '</li><li>blownAwaySize: ' + result.wind.form.blownAwaySize + '</li></ul>';

        $('#weather-effects')
            .append(buildTile({
                form: {
                    class: 'wi-wind-beaufort-' + result.wind.form.beaufortScale,
                    text: beaufortTooltip
                }
            }).tooltip({
                html: true,
                title: beaufortTooltip
            }));
    }

    // default display
    if ($('#weather-effects *').length === 0) {
        $('#weather-effects').append($('<h2>', {
            text: 'None'
        }));
    }
};