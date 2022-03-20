import { Controller } from "@hotwired/stimulus"
import { main } from "@popperjs/core";

const baseMapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';
const mapboxKey = "1"

const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"
const weatherKey = "1";

// const getWeather = (data) => {
//   const latitude = data["features"][0]["geometry"]["coordinates"][1];
//   const longitude = data["features"][0]["geometry"]["coordinates"][0];
//   fetch(`${baseWeatherUrl}lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`)
//   .then(response => response.json())
//   .then((data2) => {
//     this.cityTarget.innerHTML = `${data2["name"]}, ${data2["sys"]["country"]}`
//     this.descriptionTarget.innerHTML = `${data2["weather"][0]["main"]} - ${data2["weather"][0]["description"]}`
//     this.temperatureTarget.innerHTML = `${Math.round(data2["main"]["temp"])}°C`
//   });
// };

export default class extends Controller {
  static targets = ['form', 'city', 'description', 'temperature']

  connect() {
    console.log("Hello from our first Stimulus controller")
  };


  coordinates(event) {
    // console.log("You clicked on Submit !")
    event.preventDefault();
    // this.cityTarget.innerHTML = this.formTarget.value;
    fetch(`${baseMapboxUrl}${this.formTarget.value}.json?access_token=${mapboxKey}`)
    .then(response => response.json())
    .then((data) => {
        // getWeather(data);
          const latitude = data["features"][0]["geometry"]["coordinates"][1];
          const longitude = data["features"][0]["geometry"]["coordinates"][0];
          fetch(`${baseWeatherUrl}lat=${latitude}&lon=${longitude}&appid=${weatherKey}&units=metric`)
          .then(response => response.json())
          .then((data2) => {
            this.cityTarget.innerHTML = `${data2["name"]}, ${data2["sys"]["country"]}`
            this.descriptionTarget.innerHTML = `${data2["weather"][0]["main"]} - ${data2["weather"][0]["description"]}`
            this.temperatureTarget.innerHTML = `${Math.round(data2["main"]["temp"])}°C`
          });
    });
    this.formTarget.value = "";
  }

}
