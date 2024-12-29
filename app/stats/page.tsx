"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client

interface Player {
  id: number;
  name: string;
  goals: number;
  assists: number;
  red_cards: number;
  yellow_cards: number;
  matches: number;
}

const PlayerStatsPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [loading, setLoading] = useState(true);

  // Fetch all players from Supabase
  const fetchPlayerData = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("players")
      .select("id, name, goals, assists, red_cards, yellow_cards, matches");

    if (error) {
      console.error("Error fetching players:", error);
    } else {
      const formattedData = data.map((player: Player) => ({
        ...player,
        goals: Number(player.goals),
        assists: Number(player.assists),
        red_cards: Number(player.red_cards),
        yellow_cards: Number(player.yellow_cards),
        matches: Number(player.matches),
      }));

      // Sort players by goals in descending order
      const sortedData = formattedData.sort((a, b) => b.goals - a.goals);
      setPlayers(sortedData);
    }
    setLoading(false);
  };

  // Fetch player data on initial render
  useEffect(() => {
    fetchPlayerData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 w-screen">
      <h1 className="text-3xl font-bold mb-6 text-neutral-800">Player Stats</h1>

      <table className="table-auto border-collapse border border-gray-300 text-white w-full max-w-[1000px] bg-neutral-900">
        <thead>
          <tr>
            <th className="w-[20%] border border-gray-300 py-2">
              <img className="mx-auto" src="player.svg" alt="" />
            </th>
            <th className="w-[16%] border border-gray-300 py-2">
              <img className="mx-auto w-4" src="ball.svg" alt="" />
            </th>
            <th className="w-[16%] border border-gray-300 py-2">
              <img className="mx-auto w-5" src="shoe.svg" alt="" />
            </th>
            <th className="w-[16%] border border-gray-300 py-2">
              <img className="mx-auto w-[10px]" src="yellow.svg" alt="" />
            </th>
            <th className="w-[16%] border border-gray-300 py-2">
              <img className="mx-auto w-[10px]" src="red.svg" alt="" />
            </th>
            <th className="w-[16%] border border-gray-300 py-2">
              <img className="mx-auto w-6" src="stad.svg" alt="" />
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="text-sm lg:text-xl w-[20%] font-semibold border border-gray-300 text-center py-2">
                {player.name}
              </td>
              <td className="text-sm lg:text-lg w-[16%] border border-gray-300 text-center py-2">
                {player.goals}
              </td>
              <td className="text-sm lg:text-lg w-[16%] border border-gray-300 text-center py-2">
                {player.assists}
              </td>
              <td className="text-sm lg:text-lg w-[16%] border border-gray-300 text-center py-2">
                {player.yellow_cards}
              </td>
              <td className="text-sm lg:text-lg w-[16%] border border-gray-300 text-center py-2">
                {player.red_cards}
              </td>
              <td className="text-sm lg:text-lg w-[16%] border border-gray-300 text-center py-2">
                <span>{player.matches}</span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsPage;
