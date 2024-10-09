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
      // Ensure all values are numbers
      const formattedData = data.map((player: Player) => ({
        ...player,
        goals: Number(player.goals),
        assists: Number(player.assists),
        red_cards: Number(player.red_cards),
        yellow_cards: Number(player.yellow_cards),
        matches: Number(player.matches),
      }));
      setPlayers(formattedData);
    }
    setLoading(false);
  };

  // Function to update a player's stat in Supabase
  const updateStat = async (playerId: number, field: string, value: number) => {
    const { error } = await supabase
      .from("playersz")
      .update({ [field]: value })
      .eq("id", playerId);

    if (error) {
      console.error(`Error updating ${field} for player ${playerId}:`, error);
    }
  };

  // Handlers for incrementing and decrementing stats for each player
  const incrementStat = (playerId: number, field: keyof Player) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        const newValue = (player[field] as number) + 1; // Explicitly cast to number
        updateStat(playerId, field, newValue); // Update in Supabase
        return { ...player, [field]: newValue }; // Update local state
      }
      return player;
    });
    setPlayers(updatedPlayers);
  };

  const decrementStat = (playerId: number, field: keyof Player) => {
    const updatedPlayers = players.map((player) => {
      if (player.id === playerId) {
        const newValue = (player[field] as number) - 1; // Explicitly cast to number
        updateStat(playerId, field, newValue); // Update in Supabase
        return { ...player, [field]: newValue }; // Update local state
      }
      return player;
    });
    setPlayers(updatedPlayers);
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
      <h1 className="text-3xl font-bold mb-6">Player Stats</h1>

      <table className="table-auto border-collapse border border-gray-300 text-white w-full max-w-[1000px] bg-neutral-900">
        <thead>
          <tr>
            <th className="w-[20%] border border-gray-300 py-2">
              <img className="mx-auto" src="player.svg" alt="" />
            </th>
            <th className="w-[20%] border border-gray-300 py-2">
              <img className="mx-auto" src="ball.svg" alt="" />
            </th>
            <th className="w-[20%] border border-gray-300 py-2">
              <img className="mx-auto w-6" src="shoe.svg" alt="" />
            </th>
            {/*<th className="w-[20%] border border-gray-300 py-2">
                <img className="mx-auto" src="yellow.svg" alt="" />
              </th>
              <th className="w-[20%] border border-gray-300 py-2">
                <img className="mx-auto" src="red.svg" alt="" />
              </th> */}
            <th className="w-[20%] border border-gray-300 py-2">
              <img className="mx-auto" src="stad.svg" alt="" />
            </th>
          </tr>
        </thead>
        <tbody>
          {players.map((player) => (
            <tr key={player.id}>
              <td className="w-[20%] border border-gray-300 text-center py-2">
                {player.name}
              </td>

              {/* Goals */}
              <td className="w-[20%] border border-gray-300 p-0">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => decrementStat(player.id, "goals")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="prev.svg" alt="" />
                  </button>
                  <span>{player.goals}</span>
                  <button
                    onClick={() => incrementStat(player.id, "goals")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="next.svg" alt="" />
                  </button>
                </div>
              </td>

              {/* Assists */}
              <td className="w-[20%] border border-gray-300 p-0">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => decrementStat(player.id, "assists")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="prev.svg" alt="" />
                  </button>
                  <span>{player.assists}</span>
                  <button
                    onClick={() => incrementStat(player.id, "assists")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="next.svg" alt="" />
                  </button>
                </div>
              </td>

              {/* Yellow Cards
                <td className="w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => decrementStat(player.id, "yellow_cards")}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                      </button>
                    <span>{player.yellow_cards}</span>
                    <button
                      onClick={() => incrementStat(player.id, "yellow_cards")}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                      </button>
                  </div>
                </td> */}

              {/* Red Cards 
                <td className="w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => decrementStat(player.id, "red_cards")}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                      </button>
                    <span>{player.red_cards}</span>
                    <button
                      onClick={() => incrementStat(player.id, "red_cards")}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                      </button>
                  </div>
                </td> */}

              {/* matches */}
              <td className="w-[20%] border border-gray-300 p-0">
                <div className="flex justify-between items-center">
                  <button
                    onClick={() => decrementStat(player.id, "matches")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="prev.svg" alt="" />
                  </button>
                  <span>{player.matches}</span>
                  <button
                    onClick={() => incrementStat(player.id, "matches")}
                    className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                  >
                    <img className="p-1" src="next.svg" alt="" />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerStatsPage;
