import React from 'react';
import Game from '../components/Game';

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <Game />
    </div>
  );
};

export default Home;
