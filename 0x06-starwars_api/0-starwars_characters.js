import requests
import sys

def get_movie_characters(movie_id):
    # Base URL for the Star Wars API
    base_url = f"https://swapi.dev/api/films/{movie_id}/"
    
    try:
        # Get the details of the movie by ID
        response = requests.get(base_url)
        response.raise_for_status()
        
        # Parse the response JSON
        movie_data = response.json()
        
        # Get the list of character URLs
        characters = movie_data.get("characters", [])
        
        # Fetch and print each character's name
        for character_url in characters:
            char_response = requests.get(character_url)
            char_data = char_response.json()
            print(char_data["name"])
    
    except requests.exceptions.HTTPError as errh:
        print(f"HTTP Error: {errh}")
    except requests.exceptions.ConnectionError as errc:
        print(f"Error Connecting: {errc}")
    except requests.exceptions.Timeout as errt:
        print(f"Timeout Error: {errt}")
    except requests.exceptions.RequestException as err:
        print(f"Something went wrong: {err}")

if __name__ == "__main__":
    if len(sys.argv) != 2:
        print("Usage: python script.py <Movie ID>")
        sys.exit(1)
    
    movie_id = sys.argv[1]
    
    get_movie_characters(movie_id)

