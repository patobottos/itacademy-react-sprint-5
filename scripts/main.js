"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
;
const reportJokes = [];
// EXERCICI 6 - SELECT A RANDOM SVG FORM
const selectRandomSVG = () => {
    const randomSVG = document.querySelector(".joke-container");
    const svgFormsArray = ['assets/svg/blob1.svg', 'assets/svg/blob2.svg', 'assets/svg/blob3.svg', 'assets/svg/blob4.svg', 'assets/svg/blob5.svg', 'assets/svg/blob6.svg', 'assets/svg/blob7.svg', 'assets/svg/blob8.svg'];
    const svgArraySize = svgFormsArray.length;
    //console.log(`tamaño array`,svgArraySize);
    const svgNumber = Math.floor(Math.random() * svgArraySize);
    //console.log('numero azar',svgNumber);
    randomSVG.style.backgroundImage = `url(${svgFormsArray[svgNumber]})`;
};
// IDEA: SHOW THE TIME(HOUR & MINUTES)
const showTime = () => {
    let timeNow = new Date();
    let hours = timeNow.getHours() <= 9 ? `0${timeNow.getHours()}` : `${timeNow.getHours()}`;
    let minutes = timeNow.getMinutes() <= 9 ? `0${timeNow.getMinutes()}` : `${timeNow.getMinutes()}`;
    let timeToShow = `${hours}:${minutes} hs.`;
    return timeToShow;
};
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
    const getWeather = () => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const askingWeather = yield fetch(urlWeather);
            const weatherData = yield askingWeather.json();
            const fetchedCity = weatherData.location.name;
            const fetchedTemperature = weatherData.current.temp_c;
            const fetchedDescription = weatherData.current.condition.text;
            const fetchedImg = weatherData.current.condition.icon;
            console.log("Fetched data=>", fetchedCity, fetchedTemperature, fetchedDescription);
            weatherIcon.src = `http:${fetchedImg}`;
            cityName.innerHTML = fetchedCity;
            temperatureValue.innerHTML = ` ${fetchedTemperature}ºC `;
            description.innerHTML = fetchedDescription;
            // INSERT HOUR!
            timeStamp.innerHTML = showTime();
        }
        catch (error) {
            console.log(error);
        }
    });
    getWeather();
});
// EXERCICIS 1, 2, 3
// JS VARIABLES
const fetchedNewJoke = document.querySelector("fetched-new-joke");
const btnNextJoke = document.querySelector("btn-next-joke");
const btnSubmitVote = document.querySelector("btn-submitVote");
const scoreButton = document.querySelector("score-btn-container");
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
    scoreButton.style.display = "block";
};
/// HIDE SCORE BUTTONS
const hideScoreButtons = () => {
    scoreButton.style.display = "none";
    fetchedNewJoke.style.display = "none";
};
/// RETRIEVE A DAD JOKE
const getJoke1 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const askingNewJoke1 = yield fetch(urlJokes1, options1);
        const dataDad = yield askingNewJoke1.json();
        const fetchedJoke1 = dataDad.joke;
        fetchedNewJoke.innerHTML = fetchedJoke1;
        console.log(`The random joke is =>`, fetchedJoke1);
        showScoreButtons();
    }
    catch (err) {
        console.log(err);
    }
});
/// RETRIEVE CHUCK NORRIS JOKE 
const getJoke2 = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const askingNewJoke2 = yield fetch(urlJokes2);
        const fetchedJoke2 = yield askingNewJoke2.json();
        fetchedNewJoke.innerHTML = fetchedJoke2.value;
        console.log(`The random joke is =>`, fetchedJoke2.value);
        showScoreButtons();
    }
    catch (err) {
        console.log(err);
    }
});
/// FUNCTION TO CHOOSE API
const randomSelector = () => {
    return Math.floor(Math.random() * 2);
};
/// FUNCTION DETECT VOTE
const detectVote = () => {
    const allOptions = document.getElementsByName("joke-score");
    console.log('allOptions', allOptions);
    console.log('tipo allOptions', typeof allOptions);
    const selectedValue = Array.from(allOptions).find((radio) => radio.checked);
    let printedJoke = fetchedNewJoke.innerHTML;
    //console.log('fetched joke => ',printedJoke);
    let newReviewedJoke = {
        joke: printedJoke,
        score: parseInt(selectedValue.value),
        date: new Date().toISOString(),
    };
    //console.log('obj joke: ', reviewedJoke);
    reportJokes.push(newReviewedJoke);
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
};
