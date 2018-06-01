var metricSystem = (navigator.language || navigator.userLanguage) !== 'en-US';

var drawCanvas = function drawCanvas(weather, selectedDate) {
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext("2d");
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    // TODO: make this color changeable. Until then, leave the bakcground transparent
    // ctx.fillStyle = "rgba(245,245,220,0.35)";
    // ctx.fillRect(0,0,canvas.width, canvas.height);
    ctx.fillStyle = "rgb(33, 37, 41)";

    var weatherDetailsYOrigin = 0;
    if (typeof (selectedDate) === 'string' && selectedDate.length > 0) {
        // write date
        ctx.font = "18px Alegreya";
        ctx.fillText(selectedDate, 10, 25);
        weatherDetailsYOrigin = 35;
    }
    // write weather informations
    ctx.font = "16px Alegreya";
    ctx.fillText("T°: " + buildTemperature(weather.temperature), 10, weatherDetailsYOrigin + 25);
    ctx.fillText("Night: " + buildTemperature(weather.temperatureNight), 10, weatherDetailsYOrigin + 50);
    ctx.fillText("Wind: " + buildSpeed(weather.wind.form.speedMin, weather.wind.form.speedMax), 10, weatherDetailsYOrigin + 75);
    ctx.fillText("Clouds: " + weather.cloud.form.name.replace(/clouds$/i, '').trim(), 10, weatherDetailsYOrigin + 100);

    $("#canvas-thumbnail-download").show().tooltip('show').off().on({
        click: function (e) {
            var dataURL = canvas.toDataURL({
                format: "png"
            });
            var w = window.open("about:blank", "Export");
            if (w != null) {
                w.document.write("<img src=\"" + dataURL + "\"/>");
                w.document.close();
            } else {
                document.write("<img src=\"" + dataURL + "\"/>")
            }
        },
        mouseleave: function (e) {
            $(e.currentTarget).tooltip('show');
        },
        mouseleave: function (e) {
            $(e.currentTarget).tooltip('hide');
        }
    });

    window.setTimeout(x => $("#canvas-thumbnail-download").tooltip('hide'), 2000);
};

var buildTile = function buildTile(p, tooltipOptions) {

    var $time = null;
    if (p.hasOwnProperty('start') && p.hasOwnProperty('duration')) {
        $time = $('<span>', {
            class: 'precipitation-time',
            text: p.start.toAmPmString() + ' - ' + (p.start + p.duration).toAmPmString()
        });
    }

    tooltipOptions = Object.assign({
        trigger: 'manual',
        container: 'body'
    }, tooltipOptions);

    if (p.form.text.length > 400) {
        tooltipOptions.template = '<div class="tooltip" role="tooltip"><div class="arrow"></div><div class="tooltip-inner large-tooltip-inner"></div></div>';
    }

    return $('<div>', {
            class: 'wi ' + p.form.class + ' severity-' + p.form.severity,
            'data-toggle': 'tooltip',
            title: p.form.text,
            'data-precipitation': p.form.name
        })
        .append($time)
        .css('transform', 'rotate(' + $time == null ? 0 : (Math.random() * 5) + 'deg)')
        .on({
            click: function (e) {
                if ($(window).width() > 576) {
                    var $target = $(e.target);
                    $target.parents('section').find('.selected-weather-effects').html($target.data('uiTooltipTitle') || $target.data('original-title'));
                } else {
                    $('#modal').modal('show', $(this));
                }
            },
            mouseenter: function (e) {
                if ($(window).width() > 576) {
                    $(e.target).tooltip('show');
                }
            },
            mouseleave: function (e) {
                if ($(window).width() > 576) {
                    $(e.target).tooltip('hide');
                }
            }
        })
        .tooltip(tooltipOptions);
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

    drawCanvas(result, $('#selected-date').text());

    $('#result-temperature').text(buildTemperature(result.temperature));
    $('#result-night').text(buildTemperature(result.temperatureNight));
    $('#result-wind').text(buildSpeed(result.wind.form.speedMin, result.wind.form.speedMax));
    $('#result-wind-direction').attr('class', 'wi wi-wind wi-towards-' + result.wind.direction);
    $('#result-clouds').text(result.cloud.form.name);

    $('#weather-effects').empty();

    // checkif precipitation has in-game effects
    if (result.hasOwnProperty('precipitation')) {

        var $tiles = result.precipitation.map(p => buildTile(p));

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
                        severity: 4,
                        text: coldTemperatureTexts.extremeCold
                    }
                }));
        } else if (result.temperature <= 0) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-snowflake-cold',
                        severity: 3,
                        text: coldTemperatureTexts.severeCold
                    }
                }));
        } else if (result.temperature <= 40) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-snowflake-cold',
                        severity: 2,
                        text: coldTemperatureTexts.severeCold
                    }
                }));
        } else if (result.temperature >= 90) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot',
                        severity: 2,
                        text: hotTemperatureTexts.veryHot
                    }
                }));
        } else if (result.temperature >= 110) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot',
                        severity: 3,
                        text: hotTemperatureTexts.severeHot
                    }
                }));
        } else if (result.temperature >= 140) {

            displayHeatWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-hot',
                        severity: 4,
                        text: hotTemperatureTexts.extremeHot
                    }
                }));
        }
    }

    // check if night is meaningfully colder than day
    if (result.hasOwnProperty('temperature') && result.hasOwnProperty('temperatureNight')) {
        if (result.temperatureNight <= -20 && result.temperature > 20) {

            displayColdWarning = true;

            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear',
                        severity: 4,
                        text: coldTemperatureTexts.extremeCold
                    }
                }));
        } else if (result.temperatureNight <= 0 && result.temperature > 0) {
            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear',
                        severity: 3,
                        text: coldTemperatureTexts.severeCold
                    }
                }));
        } else if (result.temperatureNight <= 40 && result.temperature > 40) {
            $('#weather-effects')
                .append(buildTile({
                    form: {
                        class: 'wi-night-clear',
                        severity: 2,
                        text: coldTemperatureTexts.veryCold
                    }
                }));
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
                    severity: Math.round(result.wind.form.beaufortScale * 0.44),
                    text: beaufortTooltip
                }
            }, {
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

var buildTemperature = function buildTemperature(temperature) {
    if (metricSystem) {
        return temperature.convertToCelsius() + "°C";
    } else {
        return temperature + "°F";
    }
};

var buildSpeed = function buildSpeed(speedMin, speedMax) {
    if (typeof (speedMin) === 'string')
        return speedMin;

    if (metricSystem) {
        return speedMin.convertToKilometers() + (typeof (speedMax) === "undefined" ? "+" : ("-" + speedMax.convertToKilometers())) + " km/h";
    } else {
        return speedMin + (typeof (speedMax) === "undefined" ? "+" : ("-" + speedMax)) + " mph";
    }
};