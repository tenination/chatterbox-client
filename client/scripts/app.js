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

app.init = function() {};
app.send = function(message) {

  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'POST',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });



};
app.fetch = function() {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: undefined,
    type: 'GET',
    data: message,
    contentType: 'application/json',
    success: function (data) {
      console.log('chatterbox: Message sent');
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to send message', data);
    }
  });
};
app.clearMessages = function() {

  $('#chats').empty();

};

app.renderMessage = function(message) {
  var $orig = $('<p></p>');
  $orig.text(message.text);
  $('#chats').append($orig);

};

app.renderRoom = function(room) {
  var $orig = $('<p></p>');
  $orig.text(room);
  $('#roomSelect').append($orig);

};






//Example POST request
