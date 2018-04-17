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
    if (this.items.length == 0) {
      console.log("First:", it.date);
      this.items.push(it)
    }
    let notFound = true;
    for (let day = 0; day < this.items.length; day++) {
      if (it.date == this.items[day].date) {
        console.log("Updating existing: ", it.date);
        notFound = false;
        this.items[day].temp_max += it.temp_max
      }
    }
    if (notFound) {
      console.log("New: ", it.date);
      this.items.push(it)
    }
    this.publish("Added Day: " + it.date, this)
  }

  deleteAllDays() {
    this.items = [];
  }
}
