var app = require('http').createServer();
var io = require('socket.io')(app);

var redis = require("redis"),
    client = redis.createClient();

app.listen(2000);

io.on('connection', function(socket) {
    console.log("Alguem entrou");
    client.incr('online', function(err, reply) {
        io.emit('online', reply);
    });


   socket.on('disconnect', function() {
      console.log("Alguem saiu");
      client.decr('online', function(err, reply) {
        io.emit('online', reply);
      });
  });
});

