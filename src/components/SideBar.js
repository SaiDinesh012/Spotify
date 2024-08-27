import React, { useState, useEffect } from 'react';

// Utility function to format duration in seconds to mm:ss
const formatDuration = (duration) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60);
  return `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
};

const Sidebar = ({ songs = [], currentSongIndex, setCurrentSongIndex, accent }) => {
  const [durations, setDurations] = useState([]);

  useEffect(() => {
    const fetchDurations = async () => {
      if (songs.length === 0) return;

      const fetchedDurations = await Promise.all(
        songs.map(
          (song) =>
            new Promise((resolve) => {
              const audio = new Audio(song.url);
              audio.addEventListener('loadedmetadata', () => {
                resolve(audio.duration);
              });
              audio.addEventListener('error', () => {
                resolve(0);
              });
            })
        )
      );
      setDurations(fetchedDurations);
    };

    fetchDurations();
  }, [songs]);

  return (
    <div className="w-1/4 min-h-screen p-5" style={{ backgroundColor: accent }}>
      <div className="text-white text-2xl font-bold mb-6 flex items-center">
        <img
          src="https://th.bing.com/th/id/R.a3558557dcdc5521b7c8a7dedb45ba0b?rik=d%2fAPHU9lcjkhVA&riu=http%3a%2f%2fhabitantsmusic.com%2fwp-content%2fuploads%2f2018%2f11%2fSpotify-social-media-logo-by-alfredocreates.png&ehk=L3iF34jK8cLwVKU0yQ9SbDGbMRVivo3ZBbEyehdFxZg%3d&risl=&pid=ImgRaw&r=0"
          className="h-8 mx-2"
          alt="Spotify"
        />
        Spotify
      </div>
{/* 
      <div className="mt-8 space-y-4">
        {Array.isArray(songs) && songs.length > 0 ? (
          songs.map((song, index) => (
            <div
              key={index}
              onClick={() => setCurrentSongIndex(index)}
              className={`cursor-pointer p-2 rounded ${
                index === currentSongIndex ? 'bg-[#333]' : ''
              }`}
            >
              <div className="flex justify-between text-white">
                <span>{song.title}</span>
                <span className="text-gray-400 ml-2">
                  {durations[index] ? formatDuration(durations[index]) : 'Loading...'}
                </span>
              </div>
            </div>
          ))
        ) : (
          <div className="text-gray-400">No songs available</div>
        )}
      </div> */}

      <div className="absolute bottom-5 left-5 flex items-center">
        <img
          src="https://static.vecteezy.com/system/resources/previews/022/123/337/original/user-icon-profile-icon-account-icon-login-sign-line-vector.jpg"
          alt="User"
          className="w-10 h-10 rounded-full"
        />
      </div>
    </div>
  );
};

export default Sidebar;
