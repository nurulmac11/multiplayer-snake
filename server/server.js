
const io = require('socket.io')();

people = {}
names = []
apple = {ax:50,ay:50}
idname = {}
io.on('connection', (client) => {

  client.on('subscribeToTimer', (nick) => { // coming nick
    idname[client.id] = nick;
    console.log('client is subscribing to timer with interval ', nick);
      person = {id:1, name:nick, x:0, y:0, rx:0, ry:0, score:0}
      if(names.indexOf(person.name) === -1) {
        people[nick] = person;
        names.push(person.name)
      }
      client.emit(nick,people);
      client.emit('apple',apple);
      io.sockets.emit('moved', people);
  });

  client.on('Ieat', function(msg){
    apple = msg;
    io.sockets.emit('apple', apple);
  });

  client.on('move', function (msg) {
    people[msg.name] = msg;
    io.sockets.emit('moved', people);
  });

  client.on('disconnect', function(msg){
    Array.prototype.remove = function() {
      var what, a = arguments, L = a.length, ax;
      while (L && this.length) {
        what = a[--L];
        while ((ax = this.indexOf(what)) !== -1) {
          this.splice(ax, 1);
        }
      }
      return this;
    };
    user = idname[client.id];
    names.remove(user);
    delete people[user];
  });

});

const port = 8000;
io.listen(port);
console.log('listening on port ', port);
