import { Controller } from "@hotwired/stimulus"
import { main } from "@popperjs/core";

const baseMapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

// export default class extends Controller {
//   static targets = ["input", "city", "date", "description", "temperature", "icon"]

//   initialize() {
//     this.apiKey = "YOUR-API-KEY"
//   }

//   fetchWeather(event) {
//     event.preventDefault()
//     const city = this.inputTarget.value
//     fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.apiKey}&units=metric`)
//       .then(response => response.json())
//       .then(data => this.#updateCard(data))
//   }

//   fetchWeatherByCoordinates(event) {
//     event.preventDefault()
//     navigator.geolocation.getCurrentPosition((data) => {
//       fetch(`http://api.openweathermap.org/data/2.5/weather?lat=${data.coords.latitude}&lon=${data.coords.longitude}&appid=${this.apiKey}&units=metric`)
//         .then(response => response.json())
//         .then(data => this.#updateCard(data))
//     })
//   }

//   #updateCard(data) {
//     this.iconTarget.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`
//     this.temperatureTarget.innerText = `${Math.round(data.main.temp)} °C`
//     this.descriptionTarget.innerText = data.weather[0].description
//     this.cityTarget.innerText = data.name
//     const today = new Date();
//     const localOffset = data.timezone + today.getTimezoneOffset() * 60
//     const localDate = new Date(today.setUTCSeconds(localOffset))
//     const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }
//     const formattedDate = localDate.toLocaleDateString("en-US", options)
//     this.dateTarget.innerText = formattedDate
//   }
// }

export default class extends Controller {
  static targets = ['form', 'city', 'description', 'temperature', 'icon', 'card', 'add', 'createForm', 'addButton']
  static values = { mapboxKey: String, openKey: String}

  connect() {
    console.log("Hello from our weather Stimulus controller")
  };

  getWeather(event) {
    event.preventDefault();
    const city = this.formTarget.value;
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${this.openKeyValue}&units=metric`)
    .then(response => response.json())
    .then(data => this.#updateCard(data))
    }

  #updateCard(data) {
    const cityInfo = `${data["name"]}, ${data["sys"]["country"]}`
    this.cityTarget.innerHTML = cityInfo;
    this.descriptionTarget.innerHTML = `${data["weather"][0]["main"]} - ${data["weather"][0]["description"]}`;
    this.temperatureTarget.innerHTML = `${Math.round(data["main"]["temp"])}°C`;
    this.iconTarget.src = `http://openweathermap.org/img/w/${data["weather"][0]["icon"]}.png`;
    if (this.formTarget.value !== "") {
      this.cardTarget.classList.remove("invisible");
    } else {
      this.cardTarget.classList.add("invisible");
    };
    this.formTarget.value = "";
  }
}
