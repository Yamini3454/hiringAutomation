// src/pages/Games.jsx
import React from "react";
import { Link } from "react-router-dom";

// ✅ Import images from your src/assets folder
import minesweeperImg from "../assets/minesweeper.png";
import unblockImg from "../assets/unblock.png";
import waterImg from "../assets/water.png";

const Games = () => {
  const games = [
    {
      title: "Minesweeper",
      desc: "Find safe tiles, avoid mines — timed levels & scores saved.",
      img: minesweeperImg,
      link: "/games/minesweeper",
    },
    {
      title: "Unblock Me",
      desc: "Slide blocks to free the red block. Fewer moves = high score.",
      img: unblockImg,
      link: "/games/unblockme",
    },
    {
      title: "Water Level Puzzle",
      desc: "Pour water between containers to reach goal levels.",
      img: waterImg,
      link: "/games/waterlevel",
    },
  ];

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#020617] text-white p-6">
      {/* Title */}
      <h1 className="text-4xl font-extrabold mb-10 text-cyan-400 drop-shadow-[0_0_10px_#00ffff]">
        Choose a Game
      </h1>

      {/* Game Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {games.map((game, i) => (
          <Link
            key={i}
            to={game.link}
            className="group bg-[#0b1120] rounded-2xl shadow-lg overflow-hidden 
                transform transition-all duration-300 hover:scale-105 
                hover:shadow-[0_0_20px_#03DAC5] w-full sm:w-64 md:w-72"
          >
            {/* Image */}
            {game.img && (
              <div className="w-full h-40 overflow-hidden">
                <img
                  src={game.img}
                  alt={game.title}
                  className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-all duration-300"
                />
              </div>
            )}

            {/* Text Content */}
            <div className="p-6">
              <h3 className="text-2xl font-semibold mb-2 text-[#03DAC5] group-hover:text-white transition-colors duration-300">
                {game.title}
              </h3>
              <p className="text-gray-300 text-sm leading-relaxed">
                {game.desc}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Games;



