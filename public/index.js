var url = window.location.origin;

function makeViewerTabActive() {
  var btnName = $(this).text().toLowerCase();
  $('#viewer-tab-container').children().removeClass('active');
  $('.syntax-viewer-content').addClass('hidden');
  $('#' + btnName + '-btn').addClass('active');
  $('#' + btnName + '-content').removeClass('hidden');
}

function makeViewerActive() {
  $('#options-viewer-window').addClass('hidden');
  $('#viewer-tab-container').removeClass('hidden');
  $('#syntax-viewer-window').removeClass('hidden');
  $('.viewer-tab-btn').click(makeViewerTabActive);
  $('#options-btn').removeClass('active');
  $('#viewer-btn').addClass('active');
}

$('#viewer-btn').click(makeViewerActive);

function makeOptionsActive() {
  $('#viewer-tab-container').addClass('hidden');
  $('.viewer-tab-btn').removeClass('active');
  $('.syntax-viewer-content').addClass('hidden');
  $('#options-viewer-window').removeClass('hidden');
  $('#viewer-btn').removeClass('active');
  $('#options-btn').addClass('active');
}

$('#options-btn').click(makeOptionsActive);

function hideToolbar() {
  $('footer').addClass('hidden');
  $('#open-btn').removeClass('hidden');
  $('#open-btn').one('click', openToolbar);
}

function openToolbar() {
  $(this).addClass('hidden');
  $('footer').removeClass('hidden');
  $('#hide-btn').one('click', hideToolbar);
}

$('#open-btn').one('click', openToolbar);

function sendData() {
  var username = $('#uname-input').val();
  var password = $('#pwd-input').val();
  var data = {
    username: username,
    password: password
  }
  console.log(username, password);
  $.ajax({
    url: url + "/send",
    method: "post",
    data: data,
    success: (response) => {
      console.log("Sent object: " + response);
      console.log("username: " + response.username);
      console.log("password: " + response.password);
      console.log("secret: " + response.secret);
      console.log("sqlString: " + response.sqlString);
    },
    error: (response) => {
      console.log(response);
      console.log("err: " + response.responseJSON.err);
      console.log("sqlString: " + response.responseJSON.sqlData.sqlString);
    }
  });
}

$('#login-btn').click(sendData);
