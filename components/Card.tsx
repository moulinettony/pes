//components/Card.tsx
import React from "react";

interface CardProps {
  content: string;
  isWinner: boolean;
  isSpinning: boolean;
  isHidden: boolean;
  handleChange: (value: string) => void;
  shouldRotateAll: boolean; // Rotate all cards before spinning
  shouldRotateWinner: boolean; // Rotate only the winner card after spinning
}

const Card: React.FC<CardProps> = ({
  content,
  isWinner,
  isSpinning,
  isHidden,
  shouldRotateAll,
  shouldRotateWinner,
  handleChange,
}) => {
  return (
    <div
      className={`relative w-full h-12 lg:w-40 lg:h-48 transition-transform duration-700 ease-in-out ${
        isHidden ? "opacity-" : ""
      } ${isWinner ? "lg:scale-125" : ""}`}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
          // Condition 1: If all cards should rotate (before spin) or Condition 2: If this is the winner and it should rotate back
          (shouldRotateAll && !shouldRotateWinner) ||
          (!isWinner && shouldRotateWinner)
            ? "rotate-y-180"
            : ""
        }`}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rounded-lg border border-white bg-neutral-800 rotate-y-180 flex items-center justify-center bg-[url('/sony.png')] bg-center">
          
        </div>

        {/* Card Back */}
        <div className="absolute h-12 w-full lg:h-48 backface-hidden text-neutral-100 rounded-lg bg-black transform flex lg:flex-col gap-2 items-center px-4 max-lg:py-3">
          <img className="w-4 lg:pt-4" src="pslogo.svg" alt="" />
          <div className="w-[1px] lg:w-2 bg-white h-full lg:order-2"></div>
          {/* Input field inside the card */}
          <input
            type="text"
            value={content} // Set the input's value to the card content
            onChange={(e) => handleChange(e.target.value)} // Call handleChange when the input value changes
            placeholder="..."
            className="px-2 py-1 lg:text-2xl font-bold w-full lg:text-center text-white rounded-md bg-black"
          />
        </div>
      </div>
    </div>
  );
};

export default Card;
