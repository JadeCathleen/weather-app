import { Controller } from "@hotwired/stimulus"
import { main } from "@popperjs/core";

const baseMapboxUrl = 'https://api.mapbox.com/geocoding/v5/mapbox.places/';

const baseWeatherUrl = "https://api.openweathermap.org/data/2.5/weather?"

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
  static targets = ['form', 'city', 'description', 'temperature', 'icon', 'card', 'add', 'createForm', 'addButton']
  static values = { mapboxKey: String, openKey: String}

  connect() {
    // console.log("Hello from our first Stimulus controller")
  };

  displayInformation(event) {
    // console.log("You clicked on Submit !")
    event.preventDefault();
    // this.cityTarget.innerHTML = this.formTarget.value;
    fetch(`${baseMapboxUrl}${this.cityTarget.innerHTML}.json?access_token=${this.mapboxKeyValue}`)
    .then(response => response.json())
    .then((data) => {
        // getWeather(data);
          const latitude = data["features"][0]["geometry"]["coordinates"][1];
          const longitude = data["features"][0]["geometry"]["coordinates"][0];
          fetch(`${baseWeatherUrl}lat=${latitude}&lon=${longitude}&appid=${this.openKeyValue}&units=metric`)
          .then(response => response.json())
          .then((data2) => {
            this.descriptionTarget.innerHTML = `${data2["weather"][0]["main"]} - ${data2["weather"][0]["description"]}`;
            this.temperatureTarget.innerHTML = `${Math.round(data2["main"]["temp"])}°C`;
            this.iconTarget.src = `http://openweathermap.org/img/w/${data2["weather"][0]["icon"]}.png`;
          });
    });
  }


  coordinates(event) {
    // console.log("You clicked on Submit !")
    event.preventDefault();
    // this.cityTarget.innerHTML = this.formTarget.value;
    fetch(`${baseMapboxUrl}${this.formTarget.value}.json?access_token=${this.mapboxKeyValue}`)
    .then(response => response.json())
    .then((data) => {
        // getWeather(data);
          const latitude = data["features"][0]["geometry"]["coordinates"][1];
          const longitude = data["features"][0]["geometry"]["coordinates"][0];
          fetch(`${baseWeatherUrl}lat=${latitude}&lon=${longitude}&appid=${this.openKeyValue}&units=metric`)
          .then(response => response.json())
          .then((data2) => {
            const cityInfo = `${data2["name"]}, ${data2["sys"]["country"]}`
            this.cityTarget.innerHTML = cityInfo;
            this.addTarget.value = cityInfo;
            this.descriptionTarget.innerHTML = `${data2["weather"][0]["main"]} - ${data2["weather"][0]["description"]}`;
            this.temperatureTarget.innerHTML = `${Math.round(data2["main"]["temp"])}°C`;
            this.iconTarget.src = `http://openweathermap.org/img/w/${data2["weather"][0]["icon"]}.png`;
          });
    });
    if (this.formTarget.value !== "") {
      this.cardTarget.classList.remove("invisible");
    } else {
      this.cardTarget.classList.add("invisible");
    };
    this.formTarget.value = "";
  }

  selectCity() {
    this.createFormTarget.classList.remove("invisible");
    this.addButtonTarget.classList.add("invisible");
    // const cityName = this.formTarget.value;
    // const url = '/cities';
    // let formData = new FormData();
    // formData.append("city_name", cityName);
    // console.log(formData.entries());
    // fetch(url, {
    //   method: 'POST',
    //   body: formData
    // }).then(response => response.json())
    // .then(data => console.log(data))
  }
}
