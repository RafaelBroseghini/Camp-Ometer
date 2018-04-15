class View {
  constructor(model) {
    //Subscribe to shoppingCart model passing redrawTable.
    //Every time that a change is made to the model
    //the view calls functions in models handlers, which in
    //this case redraws the table.
    model.subscribe(this.populateCards.bind(this))
  }

 displayCards(class_name) {
    let domElem = document.querySelector(class_name)
    if (domElem.style.visibility == "hidden") {
        domElem.style.visibility = "visible";
    }
  }

  setBlankSpaceTitle(elem) {
      let park_from_map = document.querySelector("#park_from_map")
      park_from_map.textContent = elem
  }

  makeCard(day, i) {
    let split_date = day["date"].split("-");
    allcards[i].style.background = "#2b2626";
    eachcard_title[i].textContent = split_date[1] + "/" + split_date[2]
    eachcard_title[i].style.color = "white";
    icons[i].src = "http://openweathermap.org/img/w/" + day["icon"] + ".png"
    icons[i].title = day["description"].charAt(0).toUpperCase() + day["description"].slice(1);
    temp_max[i].textContent = "Average °F: " + (day["temp_max"]) + "°F"
  }

  populateCards(fiveDays, msg) {
    this.displayCards(".cards")
    let i = 0;
    for (let day of fiveDays.items) {
      this.makeCard(day,i)
      i++;
    }
  }
}
