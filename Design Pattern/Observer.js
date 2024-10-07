
///////////////// 3. Observer pattern


// Good example
class Subject {
  constructor() {
    this.observers = [];
  }
  subscribe(observer) {
    this.observers.push(observer);
  }
  unsubscribe(observer) {
    this.observers = this.observers.filter(obs => obs !== observer);
  }
  notify(data) {
    this.observers.forEach(observer => observer.update(data));
  }
}
class Observer {
  constructor(name) {
    this.name = name;
  }
  update(data) {
    console.log(`${this.name} received data: ${data}`);
  }
}



const subject = new Subject();
const observer1 = new Observer("Observer 1");
const observer2 = new Observer("Observer 2");
subject.subscribe(observer1);
subject.subscribe(observer2);
subject.notify("Hello from Subject!");



// Bad example


let observers = [];
function subscribe(callback) {
  observers.push(callback);
}
function unsubscribe(callback) {
  observers = observers.filter(cb => cb !== callback);
}
function notify(data) {
  observers.forEach(callback => callback(data));
}




//// Usage

subscribe(data => console.log("Observer 1 received:", data));
subscribe(data => console.log("Observer 2 received:", data));
notify("Hello from Subject!");
