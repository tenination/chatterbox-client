// YOUR CODE HERE:
// http://parse.atx.hackreactor.com/chatterbox/classes/messages

// POST requests should be in this format
var app = {
  username: 'shawndrost',
  text: 'trololo',
  roomname: '4chan'
};

// var message = {
//   username: 'Mel Brooks',
//   text: 'It\'s good to be the king',
//   roomname: 'lobby'
// };

app.init = function() {
  app.fetch();
  $('.username').on('click', function(){
    app.handleUsernameClick();
  });
  $('#send').on('submit', function(){
    console.log('BUTTON CLICKED');
    app.handleSubmit();
  });

  $( "#target" ).submit(function( event ) {
    alert( "Handler for .submit() called." );
    event.preventDefault();
    app.send({
      username: 'shawndrost',
      text: 'SATURDAYS ARE AWESOME!!',
      roomname: '4chan'
    });
    app.fetch();
  
  });

};
app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: JSON.stringify(message),
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
      console.log('This is the console log of data', data);
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });



};
app.fetch = function() {
  var fetch = $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order:'-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Data was retreived');
      console.log(data);
      for (var i = 0; i < data.results.length; i++) {
        app.renderMessage(data.results[i]);
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });

  $('body').append(fetch);
  console.log("Fetch: ",fetch);
  console.log("Fetch: ",typeof fetch);
};
app.clearMessages = function() {

  $('#chats').empty();

};

app.renderMessage = function(message) {
  var $message = $('<div></div>');
  var $username = $('<p></p>');
  $username.addClass('username');
  $username.text(message.username);
  $message.text(message.text);
  $('#chats').append($username);
  $('.username').append($message);
  //$('body').append('#chats');


};

app.renderRoom = function(room) {
  var $orig = $('<p></p>');
  $orig.text(room);
  $('#roomSelect').append($orig);

};

app.handleUsernameClick = function() {
  //add clicked username to firends
};
app.handleSubmit = function() {
  console.log('Submit pressed!');
};






//Example POST request
