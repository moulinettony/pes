"use client";
import React, { useState, useEffect } from "react";
import { supabase } from "../utils/supabaseClient"; // Import Supabase client
import { div } from "framer-motion/client";

interface Player {
  id: number;
  name: string;
  goals: number;
  assists: number;
  red_cards: number;
  yellow_cards: number;
  matches: number;
}

const PlayPage: React.FC = () => {
  const [players, setPlayers] = useState<Player[]>([]);
  const [modifiedStats, setModifiedStats] = useState<
    Record<number, Partial<Player>>
  >({});
  const [loading, setLoading] = useState(true);
  const [showPopup, setShowPopup] = useState(false); // State to control popup visibility
  const [submittedContent, setSubmittedContent] = useState<Player[]>([]); // Store submitted data for popup

  // Fetch all players from Supabase
  const fetchPlayerData = async () => {
    setLoading(true);
    const { data, error } = await supabase.from("players").select("id, name");

    if (error) {
      console.error("Error fetching players:", error);
    } else {
      const playersWithDefaults = data.map(
        (player: { id: number; name: string }) => ({
          ...player,
          goals: 0,
          assists: 0,
          red_cards: 0,
          yellow_cards: 0,
          matches: 0,
        })
      );
      setPlayers(playersWithDefaults);
    }
    setLoading(false);
  };

  // Modify player stats temporarily
  const modifyStat = (playerId: number, field: keyof Player, delta: number) => {
    setModifiedStats((prevStats) => ({
      ...prevStats,
      [playerId]: {
        ...prevStats[playerId],
        [field]: (Number(prevStats[playerId]?.[field]) || 0) + delta, // Increment/decrement value
      },
    }));
  };

  // Submit all modified stats and show popup
  const submitChanges = async () => {
    const updatedPlayers: Player[] = [];

    for (const playerId in modifiedStats) {
      const playerModifications = modifiedStats[parseInt(playerId)];
      const { data: playerData, error } = await supabase
        .from("players")
        .select("goals, assists, red_cards, yellow_cards, matches")
        .eq("id", playerId)
        .single();

      if (error) {
        console.error(`Error fetching player ${playerId}:`, error);
        continue;
      }

      const updatedPlayer = {
        id: parseInt(playerId),
        name: players.find((p) => p.id === parseInt(playerId))?.name || "",
        goals: playerData.goals + (playerModifications.goals || 0),
        assists: playerData.assists + (playerModifications.assists || 0),
        red_cards: playerData.red_cards + (playerModifications.red_cards || 0),
        yellow_cards:
          playerData.yellow_cards + (playerModifications.yellow_cards || 0),
        matches: playerData.matches + (playerModifications.matches || 0),
      };

      updatedPlayers.push(updatedPlayer);

      const { error: updateError } = await supabase
        .from("players")
        .update(updatedPlayer)
        .eq("id", playerId);

      if (updateError) {
        console.error(`Error updating player ${playerId}:`, updateError);
      }
    }

    setSubmittedContent(updatedPlayers); // Save submitted content for popup
    setShowPopup(true); // Show the popup
  };

  // Fetch player data on initial render
  useEffect(() => {
    fetchPlayerData();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="mt-16 py-8 flex flex-col items-center justify-center h-screen bg-gray-100 w-screen overflow-auto">
      <h1 className="text-3xl font-bold mb-6">Edit Player Stats</h1>

      {players.map((player) => (
        <div className="w-full">
          <div className="text-center font-semibold" key={player.id}>
            {player.name}
          </div>
          <table className="table-auto border-collapse border border-gray-300 text-white w-full max-w-[1000px] bg-neutral-900 my-2">
            <thead>
              <tr>
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
              <tr key={player.id}>
                {/* Goals */}
                <td className="py-2 w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => modifyStat(player.id, "goals", -1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                    </button>
                    <span>{modifiedStats[player.id]?.goals || 0}</span>
                    <button
                      onClick={() => modifyStat(player.id, "goals", 1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                    </button>
                  </div>
                </td>

                {/* Assists */}
                <td className="py-2 w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => modifyStat(player.id, "assists", -1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                    </button>
                    <span>{modifiedStats[player.id]?.assists || 0}</span>
                    <button
                      onClick={() => modifyStat(player.id, "assists", 1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                    </button>
                  </div>
                </td>

                {/* Yellow Cards */}
                <td className="py-2 w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => modifyStat(player.id, "yellow_cards", -1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                    </button>
                    <span>{modifiedStats[player.id]?.yellow_cards || 0}</span>
                    <button
                      onClick={() => modifyStat(player.id, "yellow_cards", 1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                    </button>
                  </div>
                </td>

                {/* Red Cards */}
                <td className="py-2 w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => modifyStat(player.id, "red_cards", -1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                    </button>
                    <span>{modifiedStats[player.id]?.red_cards || 0}</span>
                    <button
                      onClick={() => modifyStat(player.id, "red_cards", 1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                    </button>
                  </div>
                </td>
                <td className="py-2 w-[20%] border border-gray-300 p-0">
                  <div className="flex justify-between items-center">
                    <button
                      onClick={() => modifyStat(player.id, "matches", -1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="prev.svg" alt="" />
                    </button>
                    <span>{modifiedStats[player.id]?.matches || 0}</span>
                    <button
                      onClick={() => modifyStat(player.id, "matches", 1)}
                      className="bg-white hover:bg-neutral-200 text-white font-bold px-1 rounded"
                    >
                      <img className="p-1" src="next.svg" alt="" />
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      ))}

      <button
        onClick={submitChanges}
        className="mt-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        Submit Changes
      </button>

      {/* Popup Modal */}
      {showPopup && (
        <div className="fixed backdrop-blur-sm p-4 h-screen inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center overflow-auto z-20">
          <div className="bg-white p-4 lg:w-96 rounded-lg max-lg:h-full shadow-lg w-full">
            <ul className="grid-cols-2 grid">
              {submittedContent.map((player) => (
                <li className="mb-5" key={player.id}>
                  <strong>{player.name}</strong>:
                  <br />
                  Goals: {player.goals},
                  <br />
                  Assists: {player.assists},
                  <br />
                  Yellow Cards:
                  {player.yellow_cards},
                  <br />
                  Red Cards: {player.red_cards},
                  <br />
                  Matches: {player.matches}
                </li>
              ))}
            </ul>
            <button
              onClick={() => setShowPopup(false)}
              className="mt-4 bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PlayPage;
