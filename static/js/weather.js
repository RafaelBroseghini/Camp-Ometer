function getForecast(obj) {
    fetch("/getweather?lat=" + Math.round(obj.lat) + "&lon=" + Math.round(obj.lon)).then(function(response) {
        return response.json()
    }).then(function(data) {
        fiveDayWeather(data.list)
    })
}
