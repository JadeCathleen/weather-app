import { Controller } from "@hotwired/stimulus"
import { main } from "@popperjs/core";

const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

export default class extends Controller {
  static targets = ['input', 'city', 'date', 'description', 'temperature', 'icon', 'card', 'notice']
  static values = { openKey: String}

  connect() {
    console.log("Hello from our weather Stimulus controller")
  };

  getWeather(event) {
    event.preventDefault()
    const city = this.inputTarget.value // get the city from the input value of the form
    fetch(`${baseWeatherUrl}q=${city}&appid=${this.openKeyValue}&units=metric`) // fetch the result of endpoint for the city in Openweather API
    .then(response => response.json()) // parse the result in json
    .then(data => this.#updateCard(data)) // send the data in hash to method updateCard
    }

  #updateCard(data) {
    this.cityTarget.innerHTML = `${data.name}, ${data.sys.country}`; // replace inner HTML of city div
    this.descriptionTarget.innerHTML = `${data.weather[0].main} - ${data.weather[0].description}`; // replace inner HTML of weather description div
    this.temperatureTarget.innerHTML = `${Math.round(data.main.temp)}°C`; // replace inner HTML of temperature div
    this.iconTarget.src = `http://openweathermap.org/img/w/${data.weather[0].icon}.png`; // get the weather icon and display it by adding it to src
    const today = new Date(); // create a Date object from where and when I am
    const localOffset = data.timezone + today.getTimezoneOffset() * 60; // get the data timezone (shift in seconds from UTC) and add it to the local timezone in minutes converted in seconds
    const localDate = new Date(today.setUTCSeconds(localOffset)); // find the date from the shift in seconds from UTC of today date (where and when I am)
    const options = { weekday: 'long', month: 'long', day: 'numeric', hour: 'numeric', minute: 'numeric' }; // set options for display of the date
    const formattedDate = localDate.toLocaleDateString("en-US", options); // format the date
    this.dateTarget.innerText = formattedDate // replace the text of date div by this format date
    this.noticeTarget.innerHTML = "If you want to add this city to your dashboard, you need to be logged in"
    if (this.inputTarget.value !== "") {
      this.cardTarget.classList.remove("invisible"); // if there is something entered in form, the weather card will appear
    } else {
      this.cardTarget.classList.add("invisible"); // it there is nothing entered in form, the weather card will not appear
    };
    this.inputTarget.value = ""; // refresh the content of the form
  };
}
