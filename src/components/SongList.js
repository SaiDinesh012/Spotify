import React, { useState, useEffect } from 'react';

const formatDuration = (duration) => {
  if (isNaN(duration)) return '0:00';
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds.toString().padStart(2, '0')}`;
};

const getDurationFromUrl = (url) => {
  return new Promise((resolve, reject) => {
    const audio = new Audio(url);
    audio.addEventListener('loadedmetadata', () => {
      resolve(audio.duration);
    });
    audio.addEventListener('error', () => {
      reject(new Error('Failed to load audio'));
    });
  });
};

const SongList = ({ songs, currentSongIndex, setCurrentSongIndex, accent }) => {
  const [durations, setDurations] = useState({});

  useEffect(() => {
    const fetchDurations = async () => {
      const newDurations = {};
      for (const song of songs) {
        if (song.url) {
          try {
            const duration = await getDurationFromUrl(song.url);
            newDurations[song.id] = duration; // Assuming each song has a unique `id`
          } catch (error) {
            console.error(`Error fetching duration for song ${song.id}:`, error);
          }
        }
      }
      setDurations(newDurations);
    };

    fetchDurations();
  }, [songs]);

  return (
    <div className="mt-4">
      {songs.map((song, index) => (
        <div
          key={song.id}
          className={`flex items-center justify-between p-2 text-white hover:bg-[#2c2c2c] rounded-lg cursor-pointer ${
            index === currentSongIndex ? 'bg-[#2c2c2c]' : ''
          }`}
          onClick={() => setCurrentSongIndex(index)}
        >
          <div className="flex items-center">
            <img
              src={`https://cms.samespace.com/assets/${song.cover}`}
              alt={song.title}
              className="w-10 h-8 lg:w-10 lg:h-10 rounded-lg mr-3"
            />
            <div>
              <div className="font-bold">{song.title}</div>
              <div className="text-gray-400">{song.artist}</div>
            </div>
          </div>
          <div className="text-gray-400">
            {durations[song.id] ? formatDuration(durations[song.id]) : 'Loading...'}
          </div>
        </div>
      ))}
    </div>
  );
};

export default SongList;
