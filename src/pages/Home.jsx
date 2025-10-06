import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import sideImg from "../assets/side_img.svg";
import Navbar from "../components/Navbar";

const Home = () => {
  const words = ["Intelligence", "Opportunities"];
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % words.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />

      {/* Hero Section */}
      <div className="flex flex-col md:flex-row items-center justify-between flex-grow px-10 mt-20 md:mt-0">
        {/* Left Text Section */}
        <div className="flex-1 flex flex-col justify-center items-start space-y-6">
          <h1 className="text-5xl md:text-6xl font-bold leading-tight">
            Where Skills meet{" "}
            <AnimatePresence mode="wait">
              <motion.span
                key={words[index]}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.6 }}
                className="text-blue-400"
              >
                {words[index]}
              </motion.span>
            </AnimatePresence>
          </h1>

          <p className="text-lg text-gray-300 max-w-xl">
            Showcase your skills through fun challenges, IQ games, and hackathons.
            Stand out and land your dream role.
          </p>

          <div className="flex gap-6">
            <button className="px-6 py-3 bg-blue-600 rounded-lg font-semibold hover:bg-blue-700 transition transform hover:scale-105 shadow-md">
              Start Practice
            </button>
            <button className="px-6 py-3 border border-white rounded-lg font-semibold hover:bg-white hover:text-black transition transform hover:scale-105 shadow-md">
              View Job Portals
            </button>
          </div>
        </div>

        {/* Right Image Section */}
        <div className="flex-1 mt-12 md:mt-0 flex justify-center">
          <motion.img
            src={sideImg}
            alt="Hero Illustration"
            className="w-[380px] md:w-[480px]"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          />
        </div>
      </div>
    </div>
  );
};

export default Home;

