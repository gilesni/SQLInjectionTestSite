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
	  $('#pre-info-container').addClass('hidden');
	  $('#post-info-container').removeClass('hidden');
	  $('#login-result').text("Log in Successful");
	  $('#request-sent-text').text(response.sqlString);
	  $('#response-text').text("Username: " + response.username + ", Password: " + response.password + ", Secret: " + response.secret);
  	},
    error: (response) => {
      console.log(response);
      console.log("err: " + response.responseJSON.err);
      console.log("sqlString: " + response.responseJSON.sqlData.sqlString);
	  $('#pre-info-container').addClass('hidden');
	  $('#post-info-container').removeClass('hidden');
	  $('#login-result').text("Log in Failed");
	  $('#request-sent-text').text(response.responseJSON.sqlData.sqlString);
	  $('#response-text').text(response.responseJSON.err);
    }
  });
}

$('#login-btn').click(sendData);

function resetPage() {
	$('#post-info-container').addClass('hidden');
	$('#pre-info-container').removeClass('hidden');
	$('#uname-input').val("");
	$('#pwd-input').val("");

}

$('#reset-btn').click(resetPage);


function changeRequestState() {
	$('#request-sent').toggleClass('hidden');
	$('#request-sent-text').toggleClass('hidden');
}

function changeResponseState() {
	$('#response').toggleClass('hidden');
	$('#response-text').toggleClass('hidden');
}

$("input[name=sql-request]").change(changeRequestState);
$("input[name=sql-response]").change(changeResponseState);
