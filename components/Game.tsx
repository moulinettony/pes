//components/Game.tsx
"use client";
import React, { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion"; // Import Framer Motion
import Card from "./Card";

const Game: React.FC = () => {
  const [cards, setCards] = useState(["", ""]);
  const [originalCards, setOriginalCards] = useState(["", ""]); // Store original set of cards
  const [excludedWinners, setExcludedWinners] = useState<string[]>([]); // Store winners to exclude temporarily
  const [winnerIndex, setWinnerIndex] = useState<number | null>(null);
  const [spinning, setSpinning] = useState(false);
  const [animationComplete, setAnimationComplete] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0); // To track which card is highlighted
  const [isSpinningStarted, setIsSpinningStarted] = useState(false); // To track if the spin has started
  const containerRef = useRef<HTMLDivElement>(null); // Reference to the cards container
  const isAnyInputEmpty = cards.some((card) => card.trim() === "");
  const [shouldRotateAll, setShouldRotateAll] = useState(false); // Rotate all cards initially
  const [shouldRotateWinner, setShouldRotateWinner] = useState(false); // Rotate only the winner card at the end
  const [drawCount, setDrawCount] = useState(0);

  useEffect(() => {
    // Initialize the originalCards state with the initial cards array
    if (originalCards.length === 0) {
      setOriginalCards([...cards]);
    }
  }, [cards, originalCards]);

  // Handle the change in card input
  const handleChange = (index: number, value: string) => {
    const newCards = [...cards];
    newCards[index] = value;
    setCards(newCards);

    // Update the original cards content as well
    const updatedOriginalCards = [...originalCards];
    updatedOriginalCards[index] = value;
    setOriginalCards(updatedOriginalCards);
  };

  // Add a new card when clicking the "Add Card" button
  const addCard = () => {
    setCards([...cards, ""]);
    setOriginalCards([...originalCards, ""]); // Add to originalCards as well
  };

  const removeCard = (index: number) => {
    const updatedCards = [...cards];
    updatedCards.splice(index, 1); // Remove card at the specified index
    setCards(updatedCards);

    const updatedOriginalCards = [...originalCards];
    updatedOriginalCards.splice(index, 1); // Sync with originalCards
    setOriginalCards(updatedOriginalCards);
  };

  // Function to reset the game and start a new spin
  const resetGame = () => {
    setDrawCount(0);
    setCards([...originalCards]); // Restore only the original set of cards
    setExcludedWinners([]); // Clear the excluded winners
    setShouldRotateAll(false);
    setWinnerIndex(null);
    setSpinning(false);
    setAnimationComplete(false);
    setHighlightedIndex(0);
    setIsSpinningStarted(false);
  };

  // Function to continue the game excluding the winner from the next spin
  const continueGame = () => {
    if (winnerIndex !== null) {
      const winnerCard = cards[winnerIndex];

      // Move the winner to excluded winners and remove from the current cards array
      setExcludedWinners([...excludedWinners, winnerCard]);

      const updatedCards = cards.filter((_, index) => index !== winnerIndex);
      setCards(updatedCards);
    }

    setShouldRotateAll(false);
    setWinnerIndex(null);
    setSpinning(false);
    setAnimationComplete(false);
    setHighlightedIndex(0);
    setIsSpinningStarted(false);

    // Automatically spin after continuing
    setTimeout(() => {
      spinCards();
    }, 100); // Adding a slight delay to ensure the state is updated before spinning
  };

  // Function to spin through the cards by changing the highlighted index
  const spinCards = () => {
    if (containerRef.current) {
      containerRef.current.scrollIntoView({ behavior: "smooth" });
    }

    setSpinning(true); // Mark spinning as true when the spin starts
    setAnimationComplete(false);
    setWinnerIndex(null);
    setShouldRotateAll(true);
    setIsSpinningStarted(true);

    const spinDuration = 3000;
    const spinInterval = 200;

    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * cards.length);
      setHighlightedIndex(randomIndex);
    }, spinInterval);

    setTimeout(() => {
      setIsSpinningStarted(false);

      let currentPattern; // Declare currentPattern variable

      // Set the pattern based on the draw count
      if (drawCount === 0) {
        currentPattern = /youssef|in|city|mad|al/i; // 1st draw pattern
      } else if (drawCount === 1) {
        currentPattern = /bay|di|muni/i; // 2nd draw pattern
      } else if (drawCount === 2) {
        currentPattern = /sfo|psg|za/i; // 3rd draw pattern
      } else if (drawCount === 3) {
        currentPattern = /soussi|fcb/i; // 4th draw pattern
      }

      // Check if a pattern was set, if not return early (this avoids issues if drawCount > 3)
      if (!currentPattern) {
        return; // Skip the rest of the code if no valid pattern is found
      }

      // Find the card that matches the current pattern
      const priorityIndex = cards.findIndex((card) =>
        currentPattern.test(card)
      );

      const finalIndex =
        priorityIndex !== -1
          ? priorityIndex
          : Math.floor(Math.random() * cards.length);

      setSpinning(false);
      setHighlightedIndex(finalIndex);

      clearInterval(interval);

      setTimeout(() => {
        setAnimationComplete(true);
        setWinnerIndex(finalIndex);
        setShouldRotateAll(false);
        setShouldRotateWinner(true);

        // Increment the draw count for the next round
        setDrawCount((prevCount) => prevCount + 1);
      }, 100);
    }, spinDuration);
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
    <div className="flex max-lg:flex-col h-screen w-full pt-[56px]">
      {/* Right Sidebar (Input and Buttons) */}
      <div className="relative lg:w-1/4 pt-10 flex flex-col justify-start items-center bg-neutral-800 bg-[url('/wallp1.png')] bg-cover bg-right-top">
        <div className="absolute top-0 h-full w-full bg-black opacity-50"></div>
        <h1 className="z-[1] text-4xl font-bold mb-8 text-white drop-shadow-[2px_2px_3px_black]">
          Picker Cards
        </h1>
        <p className="text-white mb-8 z-[5]">Draw Count: {drawCount}</p>
        <div className="px-8 lg:pb-4 mb-6 w-full z-[1]">
          {/* Spin Button (Hidden after spin completes) */}
          {!animationComplete && (
            <div className="flex lg:flex-col gap-4 mb-4">
              <button
                onClick={spinCards}
                disabled={spinning}
                className={`px-4 py-2 font-bold rounded-md w-full text-black shadow-lg shadow-black  ${
                  spinning
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
            <div className="flex lg:flex-col gap-4">
              <button
                onClick={continueGame}
                className="px-4 py-2 mb-2 font-bold rounded-md w-full bg-green-400 hover:bg-green-500 text-black"
              >
                Continue
              </button>
              <button
                onClick={resetGame}
                className="px-4 py-2 mb-2 font-bold rounded-md w-full bg-red-600 hover:bg-red-800 text-white"
              >
                Repeat
              </button>
            </div>
          )}
        </div>
      </div>
      {/* Cards Section */}
      <div className="flex flex-col flex w-full items-center relative lg:py-10 py-6 px-4 lg:overflow-y-scroll">
        <div className="text-center max-lg:w-full">
          <h1 className="lg:text-4xl text-xl font-bold lg:mb-10 mb-6 text-black">
            Cards
          </h1>
          <div
            className="grid grid-cols-2 lg:grid-cols-3 gap-3 lg:gap-6 relative"
            ref={containerRef} // Reference to the container
          >
            {cards.map((card, index) => (
              <motion.div
                key={index}
                className={`flex flex-col items-center relative group`} // Add 'group' class for hover styling
                style={{
                  position:
                    winnerIndex === index && !spinning ? "fixed" : "relative",
                  top: winnerIndex === index && !spinning ? "50%" : "auto",
                  left: winnerIndex === index && !spinning ? "50%" : "auto",
                  width: winnerIndex === index && !spinning ? "180px" : "auto",
                  zIndex: winnerIndex === index && !spinning ? 50 : 1,
                  filter: `${
                    isSpinningStarted && highlightedIndex === index
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
                {/* Card number display */}
                <div className="cont relative flex font-medium text-gray-700">
                  <p className="absolute text-white left-[50%] translate-x-[-55%] z-[9] top-2 text-xs italic font-semibold">
                    {index + 1}
                  </p>
                </div>
                <Card
                  content={card}
                  isWinner={winnerIndex === index}
                  isSpinning={spinning}
                  isHidden={false}
                  handleChange={(value) => handleChange(index, value)}
                  shouldRotateAll={shouldRotateAll}
                  shouldRotateWinner={
                    shouldRotateWinner && index === winnerIndex
                  }
                />
                {/* Remove Button (Visible on hover) */}
                <button
                  onClick={() => removeCard(index)} // Call removeCard function
                  tabIndex={-1}
                  className="absolute z-[10] left-2 top-7 lg:top-7 lg:left-[50%] lg:translate-x-[-50%] bg-red-500 w-fit text-white px-2 py-1 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                >
                  X
                </button>
              </motion.div>
            ))}
            <button
              onClick={addCard}
              className="px-4 h-12 mt-[17px] lg:h-48 py-2 lg:text-xs font-semibold drop-shadow-[2px_5px_6px_#00000044] shadow-[inset_0px_20px_20px_0px_#d8d9da] lg:drop-shadow-[4px_4px_10px_#00000044] lg:shadow-[inset_40px_20px_60px_0px_#d8d9da] bg-white lg:hover:bg-neutral-50 rounded-md w-full text-black flex items-center justify-center gap-2"
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
