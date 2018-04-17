document.addEventListener('DOMContentLoaded', function() {
    if (document.querySelectorAll('#map').length > 0) {
        if (document.querySelector('html').lang)
            lang = document.querySelector('html').lang;
        else
            lang = 'en';

        let js_file = document.createElement('script');
        js_file.type = 'text/javascript';
        js_file.src = 'https://maps.googleapis.com/maps/api/js?callback=initMap&key=AIzaSyA8G8oMHHJExl4LvmX3LpCWgwQVi7KeZow&language=' + lang;
        document.getElementsByTagName('head')[0].appendChild(js_file);
    }
});

let labels = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
let labelIndex = 0;
let map;
let markers = [];

function initMap() {
    map = new google.maps.Map(document.getElementById('map'),{
        center: {
            lat: 40,
            lng: -100
        },
        zoom: 3,
        mapTypeId: google.maps.MapTypeId.HYBRID
    });
}

function plotMarkers(m) {
    deleteMarkers();
    let bounds;
    bounds = new google.maps.LatLngBounds();

    m.forEach(function(marker) {
        let position = new google.maps.LatLng(marker[1],marker[2]);
        let newMarker = new google.maps.Marker({
            position: position,
            title: marker[0] + " " + marker[5],
            label: labels[labelIndex++ % labels.length],
            map: map,
            animation: google.maps.Animation.DROP
        })

        let content = '<div class="info-window">' + '<h3 id="park_map">' + marker[0] + " " + marker[5] + '</h3>' + '<div class="bodyContent">' +
        '<p style="color:black;font-size:12px;font-family:Montserrat">' + marker[3] + '</p>' + '<span id="coord" style="display:none;">{"lat": ' +
        marker[1] + ', "lon": ' + marker[2] + '}</span>' + '</div>' + '<div class="info-content">' + '<span> Web: ' + '<a href="' + marker[4] +
        '" target="_blank";font-size:10px;>' + marker[0] + '</a></span></p>' + '</div>' + '</div>'

        let infowindow = new google.maps.InfoWindow()

        google.maps.event.addListener(newMarker, 'click', (function(newMarker, content, infowindow) {
            return function() {
                infowindow.setContent(content);
                infowindow.setOptions({
                    maxWidth: 350
                })
                infowindow.open(map, newMarker);
                let parser = new DOMParser();
                let doc = parser.parseFromString(infowindow.content, "application/xml");
                let park_from_map = doc.querySelector("#park_map").textContent
                view.setBlankSpaceTitle(park_from_map)
                try {
                  let coord = JSON.parse(doc.getElementById("coord").textContent)
                  getForecast(coord);
                } catch (error) {
                  alert("Could not retrieve Weather Data for chosen location.");
                }
            }
            ;
        }
        )(newMarker, content, infowindow));

        bounds.extend(position);
        markers.push(newMarker)
    });
    map.fitBounds(bounds);
}

function deleteMarkers() {
    for (let i = 0; i < markers.length; i++) {
        markers[i].setMap(null);
    }
    markers = [];
}
;
