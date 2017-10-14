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

  $( "#target" ).submit(function( event ) {
    //alert( "Handler for .submit() called." );
    event.preventDefault();
    console.log("SUP");
    var value = $("#messageText").val(); 
    var usernameInput = window.location.search.substring(10, window.location.search.length);
    var userText = usernameInput.split("%20").join(' ');
    
    console.log('THE USERNAME IS', userText);
    app.send({
      username: userText,
      text: value,
      roomname: 'MiddleEarth'
    });
    
    $rand = $('<div></div>');
    $rand.text("THIS SHOULD BE ON THE PAGE");
    $('#chats').append($rand);
    $('#chats').html('');
    //app.clearMessages();
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
      var roomNames = [];
      console.log('chatterbox: Data was retreived');
      console.log('DATA is equal to', data);
      for (var i = 0; i < data.results.length; i++) {
        if (data.results[i].text) {
          app.renderMessage(data.results[i]);
        }
        
        //capture all unique roomnames and store them in an array object
        roomNames.push(data.results[i].roomname);
        
        
      }
      roomNames = _.uniq(roomNames);
      console.log(roomNames);
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

  $('body').append(fetch);
  console.log("Fetch: ",fetch);
  console.log("Fetch: ",typeof fetch);
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

  
  //$('#chats').append($username);
  //$('.username').append($message);
  //$('body').append('#chats');
};


// //Version 3.0
// app.renderMessage = function(message) {
//   var $message = $('<div class="message"></div>');
//   var $username = $('<p class="username"></p>');
//   var uniqueID = Math.random();
//   uniqueID = JSON.stringify(uniqueID);
//   // $message.addClass('message');
//   // $username.addClass('username');
//   $username.addClass(uniqueID);
//   $username.text(message.username);
//   $message.text(message.text);
//   $('#chats').append($username);
//   uniqueID = '.' + uniqueID;
//   $(uniqueID).append($message);
//   //$('body').append('#chats');


// };




// //Version 1.0
// app.renderMessage = function(message) {
//   var $message = $('<div></div>');
//   var $username = $('<p></p>');
//   $username.addClass('username');
//   $username.text(message.username);
//   $message.text(message.text);
//   $('#chats').append($username);
//   $('.username').append($message);
//   //$('body').append('#chats');


// };

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
