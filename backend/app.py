import os
import spotipy
from spotipy.oauth2 import SpotifyOAuth
from flask import Flask, jsonify, redirect, request
from flask_cors import CORS
from dotenv import load_dotenv

load_dotenv()

app = Flask(__name__)

sp_oauth = SpotifyOAuth(
    client_id=os.getenv("SPOTIFY_CLIENT_ID"),
    client_secret=os.getenv("SPOTIFY_CLIENT_SECRET"),
    redirect_uri=os.getenv("SPOTIFY_REDIRECT_URI"),
    scope=""
)

CORS(app)
tracks_data = [
    {
        "name": "Blinding Lights",
        "artist": "The Weeknd",
        "genre": "Pop",
        "popularity": 95,
        "image": "https://upload.wikimedia.org/wikipedia/en/c/c1/The_Weeknd_-_After_Hours.png"
    },
    {
        "name": "Shape of You",
        "artist": "Ed Sheeran",
        "genre": "Pop",
        "popularity": 92,
        "image": "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png"
    },
    {
        "name": "Levitating",
        "artist": "Dua Lipa",
        "genre": "Dance Pop",
        "popularity": 90,
        "image": "https://upload.wikimedia.org/wikipedia/en/f/f5/Dua_Lipa_-_Future_Nostalgia_%28Official_Album_Cover%29.png"
    },
    {
        "name": "Believer",
        "artist": "Imagine Dragons",
        "genre": "Rock",
        "popularity": 85,
        "image": "https://upload.wikimedia.org/wikipedia/en/b/b5/ImagineDragonsEvolve.jpg"
    },
    {
        "name": "Perfect",
        "artist": "Ed Sheeran",
        "genre": "Pop",
        "popularity": 89,
        "image": "https://upload.wikimedia.org/wikipedia/en/4/45/Divide_cover.png"
    },
    {
        "name": "Starboy",
        "artist": "The Weeknd",
        "genre": "R&B",
        "popularity": 91,
        "image": "https://upload.wikimedia.org/wikipedia/en/3/39/The_Weeknd_-_Starboy.png"
    },
    {
        "name": "Stay",
        "artist": "Justin Bieber",
        "genre": "Pop",
        "popularity": 88,
        "image": "https://picsum.photos/200"
    },
    {
        "name": "Calm Down",
        "artist": "Rema",
        "genre": "Afrobeats",
        "popularity": 87,
        "image": "https://picsum.photos/200"
    },
    {
        "name": "Heat Waves",
        "artist": "Glass Animals",
        "genre": "Indie Rock",
        "popularity": 86,
        "image": "https://picsum.photos/200"
    },
    {
        "name":"Finding Her",
        "artist":"Saaheal",
        "genre":"romantic",
        "popularity":100,
        "image": "https://picsum.photos/200"

    },
    {
        "name": "As It Was",
        "artist": "Harry Styles",
        "genre": "Pop",
        "popularity": 93,
        "image":"https://picsum.photos/200"
    }
]
# Route 1: Get tracks
@app.route('/tracks')
def get_tracks():
    return jsonify(tracks_data)

# Route 2: Analysis
@app.route('/analysis')
def analyze():
    avg_popularity = sum(
        t['popularity'] for t in tracks_data
    ) / len(tracks_data)

    mood = "Energetic 🔥" if avg_popularity > 85 else "Chill 😌"

    genres = [t['genre'] for t in tracks_data]
    fav_genre = max(set(genres), key=genres.count)

    artists = [t['artist'] for t in tracks_data]
    top_artist = max(set(artists), key=artists.count)

    personality = (
        "Trend Listener 🎧"
        if avg_popularity > 90
        else "Casual Listener 😎"
    )

    return jsonify({
        "average_popularity": round(avg_popularity, 1),
        "mood": mood,
        "favorite_genre": fav_genre,
        "top_artist": top_artist,
        "personality": personality
    })
if __name__ == '__main__':
    app.run(debug=True)