/* Golarion initialisation for the jQuery UI date picker plugin. */
/* Written by Trajan Marcus of the Ulpii (trajanulpius{at}ludilogie.fr) */
(function (factory) {
	if (typeof define === "function" && define.amd) {

		// AMD. Register as an anonymous module.
		define(["../widgets/datepicker"], factory);
	} else {

		// Browser globals
		factory(jQuery.datepicker);
	}
}(function (datepicker) {

	datepicker.regional.go = {
		//closeText: "Fermer",
		//prevText: "Précédent",
		//nextText: "Suivant",
		//currentText: "Aujourd'hui",
		monthNames: ["abadius", "calistril", "pharast", "gozran", "desnus", "sarenith", "erastus", "arodus", "rova", "lamashan", "neth", "kuthona"],
		monthNamesShort: ["aba.", "cali.", "pha.", "goz.", "des.", "sar.", "era.", "aro.", "rova", "lam.", "neth", "kut."],
		dayNames: ["sunday", "moonday", "toilday", "wealday", "oathday", "fireday", "starday"],
		dayNamesShort: ["sun.", "moon.", "toi.", "wea.", "oath.", "fire.", "star."],
		dayNamesMin: ["S", "M", "T", "W", "O", "F", "S"],
		//weekHeader: "Sem.",
		//dateFormat: "dd/mm/yy",
		firstDay: 1,
		//isRTL: false,
		//showMonthAfterYear: false,
		yearSuffix: " AR"
	};

	datepicker.setDefaults(datepicker.regional.go);

	return datepicker.regional.go;

}));