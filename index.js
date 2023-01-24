"use strict";

// EXERCICI 4
window.addEventListener("load", () => {
  let weatherIcon = document.querySelector(".weather-img");
  let cityName = document.querySelector(".city");
  let temperatureValue = document.querySelector(".weather-temperature");
  let description = document.querySelector(".weather-description");

  const urlWeather = `https://api.weatherapi.com/v1/current.json?key=a2df7834642248acbd3153507232401&q=Barcelona&aqi=no`;

  // RETRIEVE WEATHER
  const getWeather = async () => {
    try {
      const askingWeather = await fetch(urlWeather);
      const weatherData = await askingWeather.json();

      const fetchedCity = weatherData.location.name;
      const fetchedTemperature = weatherData.current.temp_c;
      const fetchedDescription = weatherData.current.condition.text;
      const fetchedImg = weatherData.current.condition.icon;
      console.log(
        "Fetched data=>",
        fetchedCity,
        fetchedTemperature,
        fetchedDescription
      );

      weatherIcon.src = `http:${fetchedImg}`;
      cityName.innerHTML = fetchedCity;
      temperatureValue.innerHTML = ` ${fetchedTemperature}ºC `;
      description.innerHTML = fetchedDescription;
    } catch (error) {
      console.log(error);
    }
  };
  getWeather();
});

// EXERCICIS 1, 2, 3
// JS VARIABLES
const nextJoke = document.getElementById("fetched-new-joke");
const btnNextJoke = document.getElementById("btn-next-joke");
const btnSubmitVote = document.getElementById("btn-submitVote");
const reportJokes = [];
const fetchedJoke = "";

const urlJokes1 = "https://icanhazdadjoke.com/";
const options1 = {
  headers: {
    Accept: "application/json",
  },
};

const urlJokes2 = "https://api.chucknorris.io/jokes/random";

// JS FUNCTIONALITY

// SHOW SCORE BUTTONS
const showScoreButtons = () => {
  document.getElementById("score-btn-container").style.display = "block";
};

//HIDE SCORE BUTTONS
const hideScoreButtons = () => {
  document.getElementById("score-btn-container").style.display = "none";
  document.getElementById("fetched-new-joke").style.display = "none";
};

// RETRIEVE A JOKE
const getJoke1 = async () => {
  try {
    const askingNewJoke = await fetch(urlJokes1, options1);
    const data = await askingNewJoke.json();
    const fetchedJoke = data.joke;

    nextJoke.innerHTML = fetchedJoke;
    console.log(fetchedJoke);
    showScoreButtons();
  } catch (err) {
    console.log(err);
  }
};

// FUNCTION NEXT JOKE
btnNextJoke.addEventListener("click", () => {
  console.log("You've pressed the button!");
  getJoke1();
});

//FUNCTION DETECT VOTE
const detectVote = () => {
  const allOptions = document.getElementsByName("joke-score");
  const selectedValue = Array.from(allOptions).find((radio) => radio.checked);
  //console.log('score =>', selectedValue.value);

  let printedJoke = document.getElementById("fetched-new-joke").innerHTML;
  //console.log('fetched joke => ',printedJoke);

  let reviewedJoke = {
    joke: printedJoke,
    score: parseInt(selectedValue.value),
    date: new Date().toISOString(),
  };
  //console.log('obj joke: ', reviewedJoke);

  reportJokes.push(reviewedJoke);
};

// FUNCTION SCORE JOKE
btnSubmitVote.addEventListener("click", () => {
  detectVote();
  console.table(reportJokes);
});
