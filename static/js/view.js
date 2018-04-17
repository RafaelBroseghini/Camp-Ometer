class View {
  constructor(model) {
    model.subscribe(this.populateCards.bind(this))
  }

 displayELem(class_name) {
    let domElem = document.querySelector(class_name)
    if (domElem.style.visibility == "hidden") {
        domElem.style.visibility = "visible";
    }
  }

  setBlankSpaceTitle(elem) {
      let park_from_map = document.querySelectorAll(".park_from_map")
      for (let i = 0; i < park_from_map.length; i++) {
        park_from_map[i].textContent = elem
      }
  }

  makeCard(day, i) {
    let split_date = day["date"].split("-");
    allcards[i].style.background = "#2b2626";
    eachcard_title[i].textContent = split_date[1] + "/" + split_date[2]
    eachcard_title[i].style.color = "white";
    icons[i].src = "http://openweathermap.org/img/w/" + day["icon"] + ".png"
    icons[i].title = day["description"].charAt(0).toUpperCase() + day["description"].slice(1);
    temp_max[i].textContent = "Average °F: " + (Math.round(day["temp_max"]/8)) + "°F"
  }

  populateCards(fiveDays, msg) {
    this.displayELem(".cards")
    this.displayELem(".weatherHeader")
    let i = 0;
    for (let day of fiveDays.items) {
      this.makeCard(day,i)
      i++;
    }
  }
}
