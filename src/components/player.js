import React, { useRef, useState, useEffect } from 'react';
import { FaPlay, FaPause, FaStepBackward, FaStepForward } from 'react-icons/fa'; // Import icons

const Player = ({ currentSong, setCurrentSongIndex, totalSongs, accent }) => {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const togglePlayPause = () => {
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleNext = () => {
    setCurrentSongIndex((prevIndex) => (prevIndex + 1) % totalSongs);
  };

  const handlePrevious = () => {
    setCurrentSongIndex((prevIndex) =>
      prevIndex === 0 ? totalSongs - 1 : prevIndex - 1
    );
  };

  useEffect(() => {
    // Set the source of the audio element to the URL of the current song
    if (audioRef.current) {
      audioRef.current.src = currentSong.url;
      if (isPlaying) {
        audioRef.current.play();
      }
    }
  }, [currentSong]);

  useEffect(() => {
    if (isPlaying) {
      audioRef.current.play();
    }
  }, [isPlaying]);

  return (
    <div
      className="player-container w-1/2 p-5 flex flex-col items-center "
      style={{ backgroundColor: accent }} // Use accent color for the background
    >
      <div className="text-white text-3xl font-bold mb-2">{currentSong.title}</div>
      <div className="text-gray-400 text-lg mb-6">{currentSong.artist}</div>
      <img
        src={`https://cms.samespace.com/assets/${currentSong.cover}`}
        alt={currentSong.title}
        className="w-64 h-64 rounded-lg shadow-lg mb-8"
      />
      <audio ref={audioRef} preload="auto"></audio>
      <div className="flex items-center space-x-4">
        <button
          className="text-white text-3xl hover:text-gray-400 transition-colors"
          onClick={handlePrevious}
        >
          <FaStepBackward />
        </button>
        <button
          className="text-white text-3xl hover:text-gray-400 transition-colors"
          onClick={togglePlayPause}
        >
          {isPlaying ? <FaPause /> : <FaPlay />}
        </button>
        <button
          className="text-white text-3xl hover:text-gray-400 transition-colors"
          onClick={handleNext}
        >
          <FaStepForward />
        </button>
      </div>
    </div>
  );
};

export default Player;
