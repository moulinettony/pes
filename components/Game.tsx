//components/Game.tsx
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
  const [shouldRotateAll, setShouldRotateAll] = useState(false); // Rotate all cards initially
  const [shouldRotateWinner, setShouldRotateWinner] = useState(false); // Rotate only the winner card at the end

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
    console.log("resetGame called");
    setWinnerIndex(null); // Reset the winner index to null

    // Delay further state changes to ensure that winnerIndex is properly reset
    setTimeout(() => {
      setSpinning(false);
      setAnimationComplete(false);
      setHighlightedIndex(0);
      setIsSpinningStarted(false);
      setShouldRotateWinner(false);
      setShouldRotateAll(false);
    }, 100); // Small delay to ensure winnerIndex is reset first
  };

  // Function to spin through the cards by changing the highlighted index
  const spinCards = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" }); // Scroll to Cards Section smoothly
    }

    setAnimationComplete(false);
    setWinnerIndex(null); // Reset winner
    setShouldRotateAll(true); // Rotate all the cards by 180 degrees before spinning
    setIsSpinningStarted(true); // Mark that the spin has started

    const spinDuration = 3000; // How long the spin lasts (in ms)
    const spinInterval = 200; // Interval for moving the red shadow

    // Start the interval to highlight different cards
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cards.length); // Get a random card index
      setHighlightedIndex(randomIndex); // Set the highlighted index to the random index
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
          if ("scrollBehavior" in document.documentElement.style) {
            // Use smooth scrolling if supported
            window.scrollTo({ top: 0, behavior: "smooth" });
          } else {
            // Fallback for older browsers or devices
            document.documentElement.scrollIntoView({ behavior: "smooth" });
          }
        }, 100); // Delay to ensure layout is settled before scrolling

        setWinnerIndex(randomIndex); // Set the winning card
        setShouldRotateAll(true); // Stop rotating all cards
        setShouldRotateWinner(true); // Rotate only the winner card back to its original state
      }, 100); // Allow the animation to settle
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
        <h1 className="z-[1] text-4xl font-bold mb-8 text-white drop-shadow-[2px_2px_3px_black]">
          Picker Cards
        </h1>
        <div className="px-8 lg:pb-4 mb-6 w-full z-[1]">
          {/* Spin Button (Hidden after spin completes) */}
          {!animationComplete && !spinning && (
            <div className="flex lg:flex-col gap-4 mb-4">
              <button
                onClick={spinCards}
                disabled={spinning || isAnyInputEmpty}
                className={`px-4 py-2 font-bold rounded-md w-full text-black shadow-lg shadow-black  ${
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
              className="px-4 py-2 mb-2 font-bold rounded-md w-full bg-red-600 hover:bg-red-800 text-white"
            >
              Repeat
            </button>
          )}
        </div>
      </div>
      {/* Cards Section */}
      <div className="flex flex-col flex w-full items-center relative lg:py-10 py-6 px-8 lg:overflow-y-scroll">
        <div className="text-center max-lg:w-full">
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
                    ? "rounded-xl"
                    : ""
                }`}
                style={{
                  position:
                    winnerIndex === index && !spinning ? "fixed" : "relative",
                  top: winnerIndex === index && !spinning ? "50%" : "auto",
                  left: winnerIndex === index && !spinning ? "50%" : "auto",
                  width: winnerIndex === index && !spinning ? "180px" : "auto",
                  zIndex: winnerIndex === index && !spinning ? 50 : 1,
                  filter: `${
                    winnerIndex !== null && winnerIndex !== index
                      ? "blur(5px)"
                      : isSpinningStarted && highlightedIndex === index
                      ? "drop-shadow(0px 0px 9px #4ade80)"
                      : "drop-shadow(3px 4px 4px #000)"
                  }`,
                }}
                animate={
                  winnerIndex === index && !spinning
                    ? { scale: 1.5, translateX: "-50%", translateY: "-50%" }
                    : { scale: 1 }
                }
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 20,
                }}
              >
                {/* Card Component with input handling */}
                <Card
                  content={card}
                  isWinner={winnerIndex === index}
                  isSpinning={spinning}
                  isHidden={false}
                  handleChange={(value) => handleChange(index, value)}
                  shouldRotateAll={shouldRotateAll} // Rotate all cards before spinning
                  shouldRotateWinner={
                    shouldRotateWinner && index === winnerIndex
                  } // Rotate only the winner card after spinning
                />
              </motion.div>
            ))}
            <button
              onClick={addCard}
              className="px-4 h-12 lg:h-48 py-2 lg:text-xs font-semibold drop-shadow-[2px_5px_6px_#00000044] shadow-[inset_0px_20px_20px_0px_#d8d9da] lg:drop-shadow-[4px_4px_10px_#00000044] lg:shadow-[inset_40px_20px_60px_0px_#d8d9da] bg-white lg:hover:bg-neutral-50 rounded-md w-full text-black flex items-center justify-center gap-2"
            >
              <p className="rounded-full border border-black h-5 w-5 flex items-center justify-center pt-[2px]">
                +
              </p>
              <p className="text-sm">Add</p>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Game;
