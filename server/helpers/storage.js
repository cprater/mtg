/*
* Whenever a change happens we notify all clients
*/
function notify(connections, values) {
  connections.forEach(conn => conn.socket.send(JSON.stringify(values)));
}

class Storage {
  constructor() {
    super();

    this.connections = [];
    this.rooms = [];
  }

  get(name) {
    return this[name];
  }

  set(name, value) {
    this[name] = value;

    notify(this.connections, this[name]);
  }

  push(name, value) {
    this[name].push(value);

    notify(this.connections, this[name]);
  }

  remove(name, id) {
    this[name] = this[name].filter(obj => obj.id !== id);

    notify(this.connections, this[name]);
  }
}

export default new Storage();
