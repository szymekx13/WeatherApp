const apiKey = "paste_your_api_here";
const searchBtn = document.getElementById("searchBtn");
const cityInput = document.getElementById("cityInput");

const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const desc = document.getElementById("desc");
const icon = document.getElementById("icon");
const weatherResult = document.getElementById("weatherResult");

searchBtn.addEventListener("click", () => {
  const city = cityInput.value.trim();
  if (city === "") return;

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric&lang=en`;

  fetch(url)
    .then(res => {
      if (!res.ok) throw new Error("City not found");
      return res.json();
    })
    .then(data => {
      const { name } = data;
      const { icon: iconCode, description } = data.weather[0];
      const { temp: temperature } = data.main;

      cityName.textContent = name;
      temp.textContent = `${temperature.toFixed(1)} °C`;
      desc.textContent = description.charAt(0).toUpperCase() + description.slice(1);
      icon.src = `https://openweathermap.org/img/wn/${iconCode}@2x.png`;

      weatherResult.classList.remove("hidden");
    })
    .catch(err => {
      cityName.textContent = "Not found 😢";
      temp.textContent = "";
      desc.textContent = "";
      icon.src = "images/cloud-sun-solid.svg";
      weatherResult.classList.remove("hidden");
    });
});
