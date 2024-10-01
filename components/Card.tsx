//components/Card.tsx
import React from "react";

interface CardProps {
  content: string;
  isWinner: boolean;
  isSpinning: boolean;
  isHidden: boolean;
}

const Card: React.FC<CardProps> = ({ content, isWinner, isSpinning, isHidden }) => {
  return (
    <div
      className={`relative w-full h-12 lg:w-40 lg:h-52 transition-transform duration-700 ease-in-out ${
        isHidden ? "opacity-" : ""
      } ${isWinner ? "lg:scale-125" : ""}`}
    >
      <div
        className={`relative w-full h-full duration-700 transform-style-preserve-3d transition-transform ${
          isWinner ? "rotate-y-180" : ""
        }`}
      >
        {/* Card Front */}
        <div className="absolute w-full h-full backface-hidden rounded-lg border border-white bg-neutral-800 flex items-center justify-center bg-[url('/sony.png')] bg-center">
        </div>

        {/* Card Back */}
        <div className="absolute h-12 w-full backface-hidden text-neutral-100 rounded-lg bg-black transform rotate-y-180 flex gap-2 items-center px-4 py-3">
          <img className="w-4" src="pslogo.svg" alt="" />
          <div className="w-[1px] bg-white h-full"></div>
          <p className="lg:text-2xl text-xl font-bold mb-[2px]">{content}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;
