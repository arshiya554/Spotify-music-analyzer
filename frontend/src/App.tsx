import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend
} from "recharts";
import { useEffect, useState } from "react";

type Track = {
  name: string;
  artist: string;
  image: string;
  popularity: number;
};

type Analysis = {
  mood: string;
  average_popularity: number;
  favorite_genre: string;
  top_artist: string;
  personality: string;
};

function App() {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [analysis, setAnalysis] = useState<Analysis | null>(null);
  const genreData = [
  { name: "Pop", value: 5 },
  { name: "Rock", value: 1 },
  { name: "Dance Pop", value: 1 },
  { name: "R&B", value: 1 },
  { name: "Afrobeats", value: 1 },
  { name: "Indie Rock", value: 1 }
];

const artistData = [
  { artist: "The Weeknd", popularity: 95 },
  { artist: "Ed Sheeran", popularity: 92 },
  { artist: "Dua Lipa", popularity: 90 },
  { artist: "Imagine Dragons", popularity: 85 },
  { artist: "Harry Styles", popularity: 93 }
];
  useEffect(() => {
    fetch("http://127.0.0.1:5000/tracks")
      .then(res => res.json())
      .then(data => setTracks(data))
      .catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("http://127.0.0.1:5000/analysis")
      .then(res => res.json())
      .then(data => setAnalysis(data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="flex min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Sidebar */}
      <div className="w-64 bg-gray-900 p-5 hidden md:block">
        <h1 className="text-2xl font-bold text-green-400 mb-8 drop-shadow-[0_0_10px_rgba(34,197,94,0.6)]">
          Spotify Music Analyzer
          <p className="text-gray-400 text-sm mt-2">
  Analyze tracks, genres and music trends
</p>
        </h1>

        <ul className="space-y-4 text-gray-300">
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">🏠 Dashboard</li>
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">🎵 Tracks</li>
          <li className="hover:text-white hover:translate-x-1 transition cursor-pointer">📊 Analytics</li>
        </ul>
      </div>

      {/* Main */}
      <div className="flex-1 p-6 overflow-y-auto">

        {/* Cards */}
        {analysis ? (
  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/20  transition">
      <h2 className="text-gray-400">Mood</h2>
      <p className="text-2xl font-bold">{analysis.mood}</p>
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/20 transition">
      <h2 className="text-gray-400">Avg Popularity</h2>
      <p className="text-2xl font-bold">{analysis.average_popularity}</p>
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/20 transition">
      <h2 className="text-gray-400">Genre</h2>
      <p className="text-2xl font-bold">{analysis.favorite_genre}</p>
    </div>

    <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl shadow-lg hover:scale-105 hover:shadow-green-500/20 transition">
      <h2 className="text-gray-400">Top Artist</h2>
      <p className="text-2xl font-bold">{analysis.top_artist}</p>
    </div>
<div className="bg-white/5 backdrop-blur-lg border border-white/10 p-5 rounded-2xl">
  <h2 className="text-gray-400">Listener Type</h2>
  <p className="text-xl font-bold">{analysis.personality}</p>
</div>
  </div>
) : (
  <p>Your Music analysis🎶🎧</p>
)}
{analysis && (
  <p className="text-gray-400 mb-8">
    Based on your listening habits, you prefer {analysis.favorite_genre} music and tend to enjoy {analysis.mood} tracks.
  </p>
)}

        {/* Tracks */}
        <div className="mb-10">
          <h2 className="text-xl mb-4">Top Tracks</h2>

          {tracks.length > 0 ? (
            tracks.map((track, index) => (
              <div
                key={index}
                className="bg-gray-800/80 backdrop-blur-md p-4 rounded-xl flex items-center gap-4 mb-3 hover:bg-gray-700/80 hover:scale-[1.02] transition group"
              >
                {/* Image + Play */}
                <div className="relative">
                  <img
                    src={track.image}
                    alt={track.name}
                    className="w-14 h-14 rounded-lg object-cover group-hover:scale-105 transition"
                    onError={(e: React.SyntheticEvent<HTMLImageElement>) => {
                      e.currentTarget.src = "https://upload.wikimedia.org/wikipedia/commons/8/84/Spotify_icon.svg";
                    }}
                  />

                  <div className="absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 transition rounded-lg">
                    <button className="bg-green-500 p-2 rounded-full text-black font-bold">
                      ▶
                    </button>
                  </div>
                </div>

                {/* Info */}
                <div className="flex-1">
                  <p className="font-semibold">{track.name}</p>
                  <p className="text-gray-400 text-sm">{track.artist}</p>
                </div>

                {/* Popularity */}
                <span className="text-gray-400">{track.popularity}</span>
              </div>
            ))
          ) : (
  <div className="flex items-center justify-center h-40">
    <div className="text-center">
      <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin mx-auto mb-3"></div>
      <p className="text-gray-400 text-lg">
        Analyzing your music taste...
      </p>
    </div>
  </div>
)}
          
        </div>

        {/* Chart */}
        {tracks.length > 0 && (
          <div>
            <h2 className="text-xl mb-4">📊 Popularity Chart</h2>
            <div className="bg-gray-800 p-4 rounded-xl h-72">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={tracks}>
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="popularity" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        )}
        {/* Genre Chart */}
<div className="grid md:grid-cols-2 gap-6 mt-10">

  <div className="bg-gray-800 p-4 rounded-xl h-80">
    <h2 className="text-xl mb-4">
      🎵 Genre Distribution
    </h2>

    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={genreData}
          dataKey="value"
          nameKey="name"
          outerRadius={100}
          label
        >
          {genreData.map((_, index) => (
            <Cell key={index} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  </div>

  {/* Artist Chart */}
  <div className="bg-gray-800 p-4 rounded-xl h-80">
    <h2 className="text-xl mb-4">
      🎤 Top Artists
    </h2>

    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={artistData}>
        <XAxis dataKey="artist" />
        <YAxis />
        <Tooltip />
        <Bar dataKey="popularity" />
      </BarChart>
    </ResponsiveContainer>
  </div>

</div>

      </div>
    </div>
  );
}

export default App;