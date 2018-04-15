"use strict"
class Subject {
  constructor() {
    this.handlers = [];
  }

  subscribe(fn) {
    this.handlers.push(fn);
  }

  publish(msg, someobj){
    var scope = someobj || window;

    for (let fn of this.handlers){
      console.log(msg);
      fn(scope, msg)
    }
  }
}

class Day extends Subject {
  constructor(date, temp_max, icon, description) {
    super()

    this.date            = date;
    this.temp_max        = Number(temp_max);
    this.icon            = icon;
    this.description     = description;
  }
}

class FiveDays extends Subject {
  constructor() {
    super()
    this.items = [];
  }
  addDay(it) {
    this.items.push(it)
    this.publish("Added Day: " + it.date, this)
  }

  deleteAllDays() {
    this.items = [];
  }
}
