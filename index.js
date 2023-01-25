"use strict";

// EXERCICI 6 - SELECT A RANDOM SVG FORM
const selectRandomSVG = () => {
  const randomSVG = document.querySelector(".joke-container");
  const svgFormsArray = ['assets/svg/blob1.svg','assets/svg/blob2.svg','assets/svg/blob3.svg','assets/svg/blob4.svg','assets/svg/blob5.svg','assets/svg/blob6.svg','assets/svg/blob7.svg','assets/svg/blob8.svg'];
  const svgArraySize = svgFormsArray.length;
  //console.log(`tamaño array`,svgArraySize);
  const svgNumber = Math.floor(Math.random() * svgArraySize);
  //console.log('numero azar',svgNumber);
  randomSVG.style.backgroundImage = `url(${svgFormsArray[svgNumber]})`;
}

// IDEA: SHOW THE TIME(HOUR & MINUTES)
const showTime = () => {
  let timeNow = new Date();
  let hours = timeNow.getHours() <= 9 ? `0${timeNow.getHours()}` : `${timeNow.getHours()}`;
  let minutes = timeNow.getMinutes() <= 9 ? `0${timeNow.getMinutes()}` : `${timeNow.getMinutes()}`;
  let timeToShow = `${hours}:${minutes} hs.`;
  
  return timeToShow;
} 


// EXERCICI 4
window.addEventListener("load", () => {
  
  const weatherIcon = document.querySelector(".weather-img");
  const cityName = document.querySelector(".city");
  const temperatureValue = document.querySelector(".weather-temperature");
  const description = document.querySelector(".weather-description");
  const timeStamp = document.querySelector(".time-stamp");

  const urlWeather = `https://api.weatherapi.com/v1/current.json?key=a2df7834642248acbd3153507232401&q=Barcelona&aqi=no`;

  // SELECT A RANDOM SVG FORM AS BACKGROUND
  selectRandomSVG();

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
      
      // INSERT HOUR!
      timeStamp.innerHTML = showTime();

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
const fetchedJoke1 = "";
const fetchedJoke2 = "";

const urlJokes1 = "https://icanhazdadjoke.com/";
const options1 = {
  headers: {
    Accept: "application/json",
  },
};

const urlJokes2 = "https://api.chucknorris.io/jokes/random";

// JS FUNCTIONALITY

/// SHOW SCORE BUTTONS
const showScoreButtons = () => {
  document.getElementById("score-btn-container").style.display = "block";
};

/// HIDE SCORE BUTTONS
const hideScoreButtons = () => {
  document.getElementById("score-btn-container").style.display = "none";
  document.getElementById("fetched-new-joke").style.display = "none";
};

/// RETRIEVE A DAD JOKE
const getJoke1 = async () => {
  try {
    const askingNewJoke1 = await fetch(urlJokes1, options1);
    const dataDad = await askingNewJoke1.json();
    const fetchedJoke1 = dataDad.joke;

    nextJoke.innerHTML = fetchedJoke1;
    console.log(`The random joke is =>`,fetchedJoke1);
    showScoreButtons();

  } catch (err) {
    console.log(err);
  }
};

/// RETRIEVE CHUCK NORRIS JOKE 
const getJoke2 = async () => {
  try {
    const askingNewJoke2 = await fetch(urlJokes2);
    const fetchedJoke2 = await askingNewJoke2.json();

    nextJoke.innerHTML = fetchedJoke2.value;
    console.log(`The random joke is =>`,fetchedJoke2.value);
    showScoreButtons();

  } catch (err) {
    console.log(err);
  }
};

/// FUNCTION TO CHOOSE API
const randomSelector = () => {
  return Math.floor(Math.random() * 2);
};

/// FUNCTION DETECT VOTE
const detectVote = () => {
  const allOptions = document.getElementsByName("joke-score");
  //console.log('allOptions',allOptions);

  const selectedValue = Array.from(allOptions).find((radio) => radio.checked);
  
  let printedJoke = document.getElementById("fetched-new-joke").innerHTML;
  //console.log('fetched joke => ',printedJoke);

  let reviewedJoke = {
    joke: printedJoke,
    score: parseInt(selectedValue.value),
    date: new Date().toISOString(),
  };
  //console.log('obj joke: ', reviewedJoke);

  reportJokes.push(reviewedJoke);
  console.table(reportJokes);

  allOptions.forEach(option => option.checked = false);
};

/// FUNCTION NEXT JOKE
const askForNextJoke = () => {
  selectRandomSVG();
  console.log("You've pressed the button!");
  let choice = randomSelector();
  choice === 1 ? getJoke1() : getJoke2();
  detectVote();
}