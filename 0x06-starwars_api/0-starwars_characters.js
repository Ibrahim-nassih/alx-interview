import requests
import sys

def get_movie_characters(movie_id):
    # Base URL for the Star Wars API
    base_url = "https://swapi.dev/api/films/"
    
    # Get the details of the movie by ID
    response = requests.get(f"{base_url}{movie_id}/")
    
    if response.status_code != 200:
        print("Error fetching movie details")
        sys.exit(1)
    
    # Parse the response JSON
    movie_data = response.json()
    
    # Get the list of character URLs
    characters = movie_data.get("characters", [])
    
    # Fetch each character's details and print their name
    for character_url in characters:
        char_response = requests.get(character_url)
        if char_response.status_code == 200:
            char_data = char_response.json()
            print(char_data["name"])
        else:
            print("Error fetching character details")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <Movie ID>")
        sys.exit(1)
    
    movie_id = sys.argv[1]
    
    get_movie_characters(movie_id)

