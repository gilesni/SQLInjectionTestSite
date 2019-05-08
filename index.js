function makeViewerTabActive() {
  var btnName = $(this).text().toLowerCase();
  $('#viewer-tab-container').children().removeClass('active');
  $('.syntax-viewer-content').addClass('hidden');
  $('#' + btnName + '-btn').addClass('active');
  $('#' + btnName + '-content').removeClass('hidden');
}

function makeViewerActive() {
  $('#syntax-viewer-window').removeClass('hidden');
  $('.viewer-tab-btn').click(makeViewerTabActive);
  $('#options-btn').removeClass('active');
  $('#viewer-btn').addClass('active');
}

$('#viewer-btn').click(makeViewerActive);

function makeOptionsActive() {

}

$('#options-btn').click(makeOptionsActive);

function hideToolbar() {
  $('footer').addClass('hidden');
}

$('#hide-btn').click(hideToolbar);
