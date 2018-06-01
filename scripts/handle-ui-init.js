var $listTiles = Object.keys(precipitationForms).map(key => buildTile({
    form: precipitationForms[key]
}));

$('#list-effects').append($listTiles);

$('#modal').on('show.bs.modal', function (event) {
    // Extract info from data-* attributes
    var text = event.relatedTarget.data('original-title');
    // set modal content
    $(this).find('.modal-body').html(text);
});

$('#select-elevation').tooltip({
    title: '<ul style="text-align:left; list-style:none;padding-left:0"><li>sea level: 0-1000 ft</li><li>lowland: 1000-5000 ft</li><li>highland: 5000-15000 ft</li><li>high peak: 15000+ ft</li>'
});

$('#canvas-thumbnail-download').tooltip({
    container: 'body'
});

$('#btn-calendar input').on('change', function (e) {
    $('#selected-date').text(e.target.value);
});

$("#btn-calendar").datepicker({
    autoclose: true,
    defaultViewDate: '+2700y',
    format: 'DD d MM yyyy',
    language: 'go',
    orientation: 'auto left'
}).on('changeDate', function (e) {
    var season = e.date.getSeason();
    $('#select-season').val(season).change();
    var canvas = document.getElementById('canvas');
    canvas.width = 190;
    canvas.height = 150;
});