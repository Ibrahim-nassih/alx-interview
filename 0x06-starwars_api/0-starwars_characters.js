#!/usr/bin/node

const request = require('request');

if (process.argv.length !== 3) {
    console.log('Usage: ./0-starwars_characters.js <Movie ID>');
    process.exit(1);
}

const movieId = process.argv[2];
const apiUrl = `https://swapi.dev/api/films/${movieId}/`;

request(apiUrl, (error, response, body) => {
    if (error) {
        console.error('Error:', error);
        return;
    }
    
    if (response.statusCode !== 200) {
        console.error('Failed to fetch movie details');
        return;
    }

    const filmData = JSON.parse(body);
    const characters = filmData.characters;

    characters.forEach((characterUrl) => {
        request(characterUrl, (charError, charResponse, charBody) => {
            if (charError) {
                console.error('Error:', charError);
                return;
            }
            
            const charData = JSON.parse(charBody);
            console.log(charData.name);
        });
    });
});

