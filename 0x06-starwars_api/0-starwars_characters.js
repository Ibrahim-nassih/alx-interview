#!/usr/bin/node

const request = require('request');

const movieId = process.argv[2];
const movieEndpoint = `https://swapi-api.alx-tools.com/api/films/${movieId}`;

function sendRequest(characterList, index) {
  if (index >= characterList.length) {
    return;
  }

  request(characterList[index], (error, response, body) => {
    if (error) {
      console.error(error);
    } else {
      console.log(JSON.parse(body).name);
      sendRequest(characterList, index + 1);
    }
  });
}

request(movieEndpoint, (error, response, body) => {
  if (error) {
    console.error(error);
  } else {
    const characterList = JSON.parse(body).characters;
    sendRequest(characterList, 0);
  }
});

