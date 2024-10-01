"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Card from "./Card";

const Game: React.FC = () => {
  const [cards, setCards] = useState(["", "", ""]);
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0); // To track which card is highlighted
  const [isSpinningStarted, setIsSpinningStarted] = useState(false); // To track if the spin has started
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the cards container
  const isAnyInputEmpty = cards.some((card) => card.trim() === "");

  // Handle the change in card input
  const handleChange = (index: number, value: string) => {
    const newCards = [...cards];
    newCards[index] = value;
    setCards(newCards);
  };

  // Add a new card when clicking the "Add Card" button
  const addCard = () => {
    setCards([...cards, ""]);
  };

  // Function to reset the game and start a new spin
  const resetGame = () => {
    setWinnerIndex(null);
    setSpinning(false);
    setAnimationComplete(false);
    setHighlightedIndex(0); // Reset highlight
    setIsSpinningStarted(false); // Reset spinning started state
  };

  // Function to spin through the cards by changing the highlighted index
  const spinCards = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to Cards Section smoothly
    }
  
    setAnimationComplete(false);
    setWinnerIndex(null); // Reset winner
    setIsSpinningStarted(true); // Mark that the spin has started
  
    const spinDuration = 2000; // How long the spin lasts (in ms)
    const spinInterval = 200; // Interval for moving the yellow border
    let currentIndex = 0;
  
    // Start the interval to highlight different cards
    const interval = setInterval(() => {
      setHighlightedIndex(currentIndex % cards.length);
      currentIndex++;
    }, spinInterval);
  
    setTimeout(() => {
      setIsSpinningStarted(false); // Disable yellow border after spin ends
      const randomIndex = Math.floor(Math.random() * cards.length);
      setSpinning(false);
      setHighlightedIndex(randomIndex); // Keep the border on the winner card
  
      clearInterval(interval); // Stop the interval
  
      setTimeout(() => {
        setAnimationComplete(true); // Mark the animation as complete
  
        // Scroll back to the top smoothly with fallback for mobile devices
        setTimeout(() => {
          if ('scrollBehavior' in document.documentElement.style) {
            // Use smooth scrolling if supported
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            // Fallback for older browsers or devices
            document.documentElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Delay to ensure layout is settled before scrolling
  
        setWinnerIndex(randomIndex);
      }, 1000); // Allow the animation to settle
    }, spinDuration); // Stop after the spin duration
  };

  // Function to calculate the center of the cards container
  const calculateCenterOfContainer = () => {
    if (containerRef.current) {
      const containerRect = containerRef.current.getBoundingClientRect();
      const centerX = containerRect.width / 2;
      const centerY = containerRect.height / 2;
      return { centerX, centerY };
    }
    return { centerX: 0, centerY: 0 };
  };

  const { centerX, centerY } = calculateCenterOfContainer(); // Calculate center coordinates

  return (
    <div className="flex max-lg:flex-col h-screen w-full">
      {/* Right Sidebar (Input and Buttons) */}
      <div className="relative lg:w-1/4 pt-10 flex flex-col justify-start items-center bg-neutral-800 bg-[url('/wallp1.png')] bg-cover bg-right-top">
        <div className="absolute top-0 h-full w-full bg-black opacity-50"></div>
        <h1 className="z-[1] text-3xl font-bold mb-8 text-white">Controls</h1>
        {/* Card Inputs */}
        {!animationComplete && (
          <div className="z-[1] pl-8 pr-[17px] lg:pb-8 pb-10 w-full grid max-lg:grid-cols-2 gap-4 overflow-y-scroll">
            {cards.map((card, index) => (
              <div key={index} className="w-full">
                <input
                  type="text"
                  value={card}
                  onChange={(e) => handleChange(index, e.target.value)}
                  placeholder="Type here..."
                  className="p-2 w-full text-black border border-black shadow-sm shadow-neutral-600 rounded-md bg-white"
                />
              </div>
            ))}
            {!animationComplete && !spinning && (
              <button
                onClick={addCard}
                className="px-4 py-2 text-sm font-semibold bg-neutral-800 rounded-md hover:bg-neutral-900 w-full text-white"
              >
                + Add
              </button>
            )}
          </div>
        )}
        <div className="px-8 lg:pb-4 mb-6 w-full z-[1]">
          {/* Spin Button (Hidden after spin completes) */}
          {!animationComplete && !spinning && (
            <div className="flex lg:flex-col gap-4 mb-4">
              <button
                onClick={spinCards}
                disabled={spinning || isAnyInputEmpty}
                className={`px-4 py-2 font-bold rounded-md w-full text-black ${
                  spinning || isAnyInputEmpty
                    ? "bg-gray-500 cursor-not-allowed"
                    : "bg-green-400 hover:bg-green-500"
                }`}
              >
                {spinning ? "Spinning..." : "Spin"}
              </button>
            </div>
          )}
          {/* Repeat Button (Visible after animation completes) */}
          {animationComplete && !spinning && (
            <button
              onClick={resetGame}
              className="px-4 py-2 mb-2 font-bold rounded-md w-full bg-neutral-100 hover:bg-neutral-400 text-black"
            >
              Repeat
            </button>
          )}
        </div>
      </div>
      {/* Cards Section */}
      <div className="flex flex-col flex w-full items-center relative lg:py-10 py-6 lg:overflow-y-scroll">
        <div className="text-center">
          <h1 className="lg:text-4xl text-xl font-bold lg:mb-10 mb-6 text-black">
            Cards
          </h1>
          <div
            className="grid grid-cols-2 lg:grid-cols-3 gap-6 relative"
            ref={containerRef} // Reference to the container
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center ${
                  isSpinningStarted && highlightedIndex === index
                    ? "filter drop-shadow-[0_4px_8px_rgba(255,223,0,0.8)] rounded-xl" // Apply drop shadow
                    : "filter drop-shadow-none"
                }`}
                style={{
                  position:
                    winnerIndex === index && !spinning
                      ? "fixed" // Make the chosen card fixed in the center of the screen
                      : "relative",
                  top:
                    winnerIndex === index && !spinning
                      ? "50%" // Center vertically
                      : "auto",
                  left:
                    winnerIndex === index && !spinning
                      ? "50%" // Center horizontally
                      : "auto",
                  zIndex: winnerIndex === index && !spinning ? 50 : 1, // Higher z-index for the chosen card to appear above others
                  filter: `${
                    winnerIndex !== null && winnerIndex !== index
                      ? "blur(5px)" // Blur non-winner cards
                      : isSpinningStarted && highlightedIndex === index
                      ? "drop-shadow(0px 0px 9px #DC2626)" // Apply drop-shadow when card is highlighted
                      : "none"
                  }`,
                }}
                animate={
                  winnerIndex === index && !spinning
                    ? { scale: 1.5, translateX: "-50%", translateY: "-50%" } // Apply both scale and translation together
                    : { scale: 1 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Card */}
                <Card
                  content={card}
                  isWinner={winnerIndex === index}
                  isSpinning={spinning}
                  isHidden={false} // No more hiding, just blurring the non-winner
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
