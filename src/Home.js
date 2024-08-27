import React, { useState, useEffect } from 'react';
import Sidebar from './components/SideBar';
import SongList from './components/SongList';
import Player from './components/player';
import { fetchSongs } from './api';

const Home = () => {
  const [songs, setSongs] = useState([]);
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [accent, setAccentColor] = useState('#ffffff');
  const [backgroundColor, setBackgroundColor] = useState('#121212');

  useEffect(() => {
    const loadSongs = async () => {
      const data = await fetchSongs();
      setSongs(data);
      setLoading(false);
    };
    loadSongs();
  }, []);

  useEffect(() => {
    if (songs.length > 0) {
      const currentSong = songs[currentSongIndex];
      setAccentColor(currentSong.accent || '#ffffff');
      setBackgroundColor(currentSong.accent || '#121212');
    }
  }, [currentSongIndex, songs]);

  const filteredSongs = songs.filter((song) => {
    const title = song.title ? song.title.toLowerCase() : '';
    const artist = song.artist ? song.artist.toLowerCase() : '';
    return title.includes(searchQuery.toLowerCase()) || artist.includes(searchQuery.toLowerCase());
  });

  if (loading) {
    return <div className="text-white text-center">Loading songs...</div>;
  }

  return (
    <div className="flex min-h-screen" style={{ backgroundColor }}>
      <Sidebar
        songs={filteredSongs}
        currentSongIndex={currentSongIndex}
        setCurrentSongIndex={setCurrentSongIndex}
      />
      <div className="flex-1 p-5">
        <input
          type="text"
          placeholder="Search Song, Artist"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full p-2 mb-4 rounded bg-[#333] text-white"
        />
        <SongList
          songs={filteredSongs}
          currentSongIndex={currentSongIndex}
          setCurrentSongIndex={setCurrentSongIndex}
        />
      </div>
      {filteredSongs.length > 0 && (
        <Player
          currentSong={filteredSongs[currentSongIndex]}
          setCurrentSongIndex={setCurrentSongIndex}
          totalSongs={filteredSongs.length}
          accent={accent}
        />
      )}
    </div>
  );
};

export default Home;