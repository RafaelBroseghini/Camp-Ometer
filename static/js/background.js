let i = 0;
let p = 0;

setInterval(function() {
  let images = ['park2.jpg','park4.jpg',"park.jpg", "park5.jpg"]
      document.body.style.backgroundImage = "url(../static/img/" + images[i] + ")";
      i += 1;
      if (i > images.length) {
        i =  0;
        document.body.style.backgroundImage = "url(../static/img/park3.jpg)";
      }
}, 10000);

function changeName(){
  let the_name = document.querySelector("#natp");
  let pn = ["National Historic Site!", "National Monument!"];
  the_name.textContent = pn[p];
  p++;
  if (p > pn.length) {
    p = 0;
    the_name.textContent = "National Park!"
  }
}
