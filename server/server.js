
const io = require('socket.io')();

people = {}
names = []
apple = {ax:50,ay:50}
io.on('connection', (client) => {

  client.on('subscribeToTimer', (nick) => { // coming nick

    console.log('client is subscribing to timer with interval ', nick);
      person = {id:1, name:nick, x:0, y:0, rx:0, ry:0, score:0}
      if(names.indexOf(person.name) === -1) {
        people[nick] = person;
        names.push(person.name)
      }
      client.emit(nick,people);
      client.emit('apple',apple);
  });

client.on('Ieat', function(msg){
  apple = msg;
  io.sockets.emit('apple', apple);
});
client.on('move', function (msg) {
  people[msg.name] = msg;
  io.sockets.emit('moved', people);
});
});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
