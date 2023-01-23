"use strict";

const nextJoke = document.getElementById("fetched-new-joke");
const btnNextJoke = document.getElementById("btn-next-joke");

// EXERCICI 1

const url = "https://icanhazdadjoke.com/";

const options = {
  headers: {
    Accept: "application/json",
  },
};

const getJoke = async () => {
  try {
    const askingNewJoke = await fetch(url, options);
    const data = await askingNewJoke.json();
    const fetchedJoke = data.joke;
    nextJoke.innerHTML = fetchedJoke;
    console.log(fetchedJoke);
  } catch (err) {
    console.log(err);
  }
};

btnNextJoke.addEventListener('click', () => {
    console.log("You've pressed the button!");
    getJoke();
});




