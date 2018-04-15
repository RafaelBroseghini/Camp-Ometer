var fiveDays = new FiveDays();
var view = new View(fiveDays);


var eachcard_title = document.querySelectorAll(".title"),
  icons = document.querySelectorAll(".weather_icon"),
  temp_max = document.querySelectorAll(".temp_max"),
  allcards = document.querySelectorAll(".card");

$('.ui.dropdown').dropdown();

function clickedOn() {
    let state = document.getElementById("states").value
    fetch("/getparks?state=" + state).then(function(response) {
        return response.json();
    }).then(function(parks) {
        var all_parks = [];
        for (let park of parks.data) {
            let park_name = park.name
              , long_lat = park.latLong
              , description = park.description
              , url = park.url
              , designation = park.designation;
            if (long_lat !== "" && park_name !== "") {
                let camp = park.latLong.split(":")
                let long = camp[1].split(",")[0];
                let lat = camp[2].split("}")[0];
                all_parks.push([park_name, long, lat, description, url, designation])
            }
        }
        return all_parks
    }).then(plotMarkers)
}

function fiveDayWeather(lst) {
    fiveDays.deleteAllDays();
    let five_days = {};
    for (let day of lst) {
        let day_dt_txt = day.dt_txt.split(" ")[0]
        if (!(day_dt_txt in five_days)) {
          five_days[day_dt_txt] = 0;

          let a_day = new Day(day_dt_txt, day.main["temp_max"],
          day.weather[0]["icon"], day.weather[0]["description"])

          fiveDays.addDay(a_day);
        }
    }
}
