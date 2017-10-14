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
  
  $('.chatRoom').change( function() {
    app.renderRoom(this.value);
  });

  $( "#target" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
    var value = $("#messageText").val(); 
    var usernameInput = window.location.search.substring(10, window.location.search.length);
    var userText = usernameInput.split("%20").join(' ');
    
    console.log('THE USERNAME IS', userText);
    app.send({
      username: userText,
      text: value,
      roomname: $('.chatRoom').val()
    });
    
    console.log('THE SELECTED CHATROOM IS', $('.chatRoom').val());
    
    $rand = $('<div></div>');
    $rand.text("THIS SHOULD BE ON THE PAGE");
    $('#chats').append($rand);
    $('#chats').html('');
    //app.clearMessages();
    app.fetch();
  
  });
  
  $( "#pickRoom" ).submit(function( event ) {
    event.preventDefault();
    var newRoom = $('#room').val();
    var $newRoom = $('<option></option>');
    $newRoom.text(newRoom);
    $('.chatRoom').append($newRoom);
    $('.chatRoom').val(newRoom);
    //$("#mydropdownlist").val("thevalue");
    
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
      var roomNames = [];
      console.log('DATA is equal to', data);
      
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text) {
          app.renderMessage(data.results[i]);

        }
        roomNames.push(data.results[i].roomname);  
      }
      console.log(roomNames);
      roomNames = _.uniq(roomNames);
      $('.chatRoom').html('');
      var $allRooms = $('<option></option');
      $allRooms.text('All Rooms');
      $allRooms.val('All Rooms');
      $('.chatRoom').append($allRooms);
      for (var room of roomNames) {
        var $roomName = $('<option></option>');
        $roomName.text(room);
        if (room !== undefined) {
          $('.chatRoom').append($roomName);  
        }
      }
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });

};
app.clearMessages = function() {

  $('#chats').empty();

};

//Version 2.0
app.renderMessage = function(message) {
  var $message = $('<div></div>');
  var $username = $('<p></p>');
  $message.addClass('message');
  $username.addClass('username');
  $username.text(message.username);
  $message.text(message.text);
 
  $('#chats').append($message);
  $message.append($username);
  $('#chats').append($message);
};


app.renderRoom = function(room) {
  $.ajax({
    // This is the url you should use to communicate with the parse API server.
    url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    type: 'GET',
    data: {order:'-createdAt'},
    contentType: 'application/json',
    success: function (data) {
      console.log('DATA is equal to', data);
      $('#chats').html('');
      for (var i = 0; i < data.results.length; i++) {
        console.log(room);
        if (data.results[i].roomname === room || room === "All Rooms") {
          app.renderMessage(data.results[i]);
        } 
      }
      
    },
    error: function (data) {
      // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
      console.error('chatterbox: Failed to fetch message', data);
    }
  });

};

app.handleUsernameClick = function() {
  //add clicked username to firends
};
app.handleSubmit = function() {
  console.log('Submit pressed!');
};






//Example POST request
