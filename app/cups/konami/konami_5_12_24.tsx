"use client";
import React, { useState } from "react";

const UCLResults = () => {
  const [activeTab, setActiveTab] = useState<"matches" | "group" | "topScorer">(
    "matches"
  );

  const topScorers = [
    {
      name: "M. Saviç",
      score: 3,
      team: "/clubs/hilal.svg",
      img: "/countries/serbia.svg",
    },
    {
      name: "Neymar Jr",
      score: 3,
      team: "/clubs/hilal.svg",
      img: "/countries/brezil.svg",
    },
    {
      name: "Mahrez",
      score: 3,
      team: "/clubs/ahli.svg",
      img: "/countries/algeria.svg",
    },
    {
      name: "Harry Kane",
      score: 3,
      team: "/clubs/bayern.svg",
      img: "/countries/englend.svg",
    },
    {
      name: "Mbappe",
      score: 3,
      team: "/clubs/rma.svg",
      img: "/countries/france.svg",
    },
    {
      name: "M. Salah",
      score: 3,
      team: "/clubs/liver.svg",
      img: "/countries/egypt.svg",
    },
    {
      name: "D. Nunez",
      score: 3,
      team: "/clubs/liver.svg",
      img: "/countries/uruguay.svg",
    },
    {
      name: "Mitroviç",
      score: 2,
      team: "/clubs/hilal.svg",
      img: "/countries/serbia.svg",
    },
  ];
  const topAssits = [
    {
      name: "Alister",
      score: 3,
      team: "/clubs/liver.svg",
      img: "/countries/argentina.svg",
    },
    {
      name: "Ruben Neves",
      score: 2,
      team: "/clubs/hilal.svg",
      img: "/countries/portugal.svg",
    },
    {
      name: "Mahrez",
      score: 2,
      team: "/clubs/ahli.svg",
      img: "/countries/algeria.svg",
    },
    {
      name: "G. Kondogbia",
      score: 2,
      team: "/clubs/marseille.svg",
      img: "/countries/centre.svg",
    },
    {
      name: "Phil Foden",
      score: 2,
      team: "/clubs/city.svg",
      img: "/countries/englend.svg",
    },
    {
      name: "Modriç",
      score: 2,
      team: "/clubs/rma.svg",
      img: "/countries/croatia.svg",
    },
    {
      name: "Saviç",
      score: 1,
      team: "/clubs/hilal.svg",
      img: "/countries/armenia.svg",
    },
    {
      name: "Mitroviç",
      score: 1,
      team: "/clubs/hilal.svg",
      img: "/countries/serbia.svg",
    },
  ];
  // Knockout Stage Results
  const roundOf16 = [
    {
      team1: "Man City",
      img1: "/clubs/city.svg",
      score1: "3 (2)",
      team2: "Man United",
      img2: "/clubs/united.svg",
      score2: "(0) 1",
    },
    {
      team1: "Arsenal",
      img1: "/clubs/arsenal.svg",
      score1: 0,
      team2: "Hamza",
      img2: "/clubs/hilal.svg",
      score2: 2,
    },
    {
      team1: "Bayern",
      img1: "/clubs/bayern.svg",
      score1: 3,
      team2: "AC Milan",
      img2: "/clubs/milan.svg",
      score2: 1,
    },
    {
      team1: "Juventus",
      img1: "/clubs/juv.svg",
      score1: 0,
      team2: "Chelsea",
      img2: "/clubs/chelsea.svg",
      score2: 1,
    },
    {
      team1: "R. Madrid",
      img1: "/clubs/rma.svg",
      score1: "3 (2)",
      team2: "Inter",
      img2: "/clubs/inter.svg",
      score2: "(1) 2",
    },
    {
      team1: "FC Barça",
      img1: "/clubs/fcb.svg",
      score1: 0,
      team2: "Liverpool",
      img2: "/clubs/liver.svg",
      score2: 3,
    },
    {
      team1: "Youssef",
      img1: "/clubs/ahli.svg",
      score1: 5,
      team2: "Mehdi",
      img2: "/clubs/marseille.svg",
      score2: 4,
    },
    {
      team1: "At. Madrid",
      img1: "/clubs/atm.svg",
      score1: 0,
      team2: "PSG",
      img2: "/clubs/psg.svg",
      score2: 1,
    },
  ];

  const quarterFinals = [
    {
      team1: "Man City",
      img1: "/clubs/city.svg",
      score1: 0,
      team2: "Hamza",
      img2: "/clubs/hilal.svg",
      score2: 2,
    },
    {
      team1: "Bayern",
      img1: "/clubs/bayern.svg",
      score1: 3,
      team2: "Chelsea",
      img2: "/clubs/chelsea.svg",
      score2: 0,
    },
    {
      team1: "R. Madrid",
      img1: "/clubs/rma.svg",
      score1: 3,
      team2: "Liverpool",
      img2: "/clubs/liver.svg",
      score2: 4,
    },
    {
      team1: "Youssef",
      img1: "/clubs/ahli.svg",
      score1: 1,
      team2: "PSG",
      img2: "/clubs/psg.svg",
      score2: 0,
    },
  ];

  const semiFinals = [
    {
      team1: "Hamza",
      img1: "/clubs/hilal.svg",
      score1: 4,
      team2: "Bayern",
      img2: "/clubs/bayern.svg",
      score2: 2,
    },
    {
      team1: "Liverpool",
      img1: "/clubs/liver.svg",
      score1: 2,
      team2: "Youssef",
      img2: "/clubs/ahli.svg",
      score2: 1,
    },
  ];

  const final = {
    team1: "Hamza",
    img1: "/clubs/hilal.svg",
    score1: 2,
    team2: "Liverpool",
    img2: "/clubs/liver.svg",
    score2: 1,
  };

  return (
    <div className="min-h-screen bg-[#030a0e] text-white py-12 px-5">
      <h1 className="text-4xl font-bold text-center mb-2">KONAMI Cup</h1>
      <h3 className="mb-6 text-center text-2xl flex items-center justify-center gap-3">
        Winner:
        <span className="flex gap-2">
          <img src={final.img1} alt={final.team1} />
          <p className="lg:mt-1">{final.team1}</p>
        </span>
      </h3>

      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={() => setActiveTab("matches")}
          className={`py-1 px-2 max-lg:text-xs rounded ${
            activeTab === "matches" ? "bg-red-700" : "bg-[#021e28]"
          } hover:bg-red-700`}
        >
          Results
        </button>
        <button
          onClick={() => setActiveTab("group")}
          className={`py-1 px-2 max-lg:text-xs rounded ${
            activeTab === "group" ? "bg-red-700" : "bg-[#021e28]"
          } hover:bg-red-700`}
        >
          Top Scorers
        </button>
        <button
          onClick={() => setActiveTab("topScorer")}
          className={`py-1 px-2 max-lg:text-xs rounded ${
            activeTab === "topScorer" ? "bg-red-700" : "bg-[#021e28]"
          } hover:bg-red-700`}
        >
          Top Assists
        </button>
      </div>

      {/* Render sections based on activeTab */}
      {activeTab === "matches" && (
        <div className="max-w-5xl mx-auto">
          {/* Round of 16 */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Round of 16
            </h3>
            <table className="w-full">
              <tbody>
                {roundOf16.map((match, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                    }`}
                  >
                    {/* Team 1 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img1}
                        alt={match.team1}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team1}</p>
                    </td>

                    {/* Score */}
                    <td className="py-2 px-2 text-center lg:w-[10%] font-semibold max-lg:text-sm max-lg:h-[40px]">
                      {match.score1} - {match.score2}
                    </td>

                    {/* Team 2 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img2}
                        alt={match.team2}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team2}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Quarterfinals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Quarterfinals
            </h3>
            <table className="w-full">
              <tbody>
                {quarterFinals.map((match, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                    }`}
                  >
                    {/* Team 1 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img1}
                        alt={match.team1}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team1}</p>
                    </td>

                    {/* Score */}
                    <td className="py-2 px-2 text-center lg:w-[10%] font-bold max-lg:text-sm max-lg:h-[40px]">
                      {match.score1} - {match.score2}
                    </td>

                    {/* Team 2 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img2}
                        alt={match.team2}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team2}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Semifinals */}
          <div className="mb-8">
            <h3 className="text-xl font-semibold mb-3 text-center">
              Semifinals
            </h3>
            <table className="w-full">
              <tbody>
                {semiFinals.map((match, index) => (
                  <tr
                    key={index}
                    className={`${
                      index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                    }`}
                  >
                    {/* Team 1 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img1}
                        alt={match.team1}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team1}</p>
                    </td>

                    {/* Score */}
                    <td className="py-2 px-2 text-center lg:w-[10%] font-bold max-lg:text-sm max-lg:h-[40px]">
                      {match.score1} - {match.score2}
                    </td>

                    {/* Team 2 */}
                    <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                      <img
                        src={match.img2}
                        alt={match.team2}
                        className="max-lg:h-5"
                      />
                      <p className="lg:mt-1 max-lg:text-sm">{match.team2}</p>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Final */}
          <div>
            <h3 className="text-xl font-semibold mb-3 text-center">Final</h3>
            <table className="w-full">
              <tbody>
                <tr className="bg-[#021e28]">
                  {/* Team 1 */}
                  <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                    <img
                      src={final.img1}
                      alt={final.team1}
                      className="max-lg:h-5"
                    />
                    <p className="lg:mt-1 max-lg:text-sm">{final.team1}</p>
                  </td>

                  {/* Score */}
                  <td className="py-2 px-2 text-center lg:w-[10%] font-bold max-lg:text-sm lg:h-[40px]">
                    {final.score1} - {final.score2}
                  </td>

                  {/* Team 2 */}
                  <td className="py-2 px-2 text-center lg:min-w-[45%] flex lg:justify-center gap-2 items-center max-lg:h-[40px]">
                    <img
                      src={final.img2}
                      alt={final.team2}
                      className="max-lg:h-5"
                    />
                    <p className="lg:mt-1 max-lg:text-sm">{final.team2}</p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      )}
      {activeTab === "group" && (
        <div className="">
          <h2 className="text-2xl font-bold text-center mb-6">Goals</h2>
          <table className="w-full">
            <thead>
              <tr>
                <th className="px-2 py-2 max-lg:text-sm">Player</th>
                <th className="px-2 py-2 max-lg:text-sm">Score</th>
                <th className="px-2 py-2 max-lg:text-sm">Team</th>
              </tr>
            </thead>
            <tbody>
              {topScorers.map((player, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                  }`}
                >
                  <td className="p-2 flex items-center max-lg:text-sm max-lg:h-[40px]">
                    <img src={player.img} alt="" className="max-lg:w-6 mr-2" />
                    {player.name}
                  </td>
                  <td className="p-2 max-lg:text-sm text-center max-lg:h-[40px]">
                    {player.score}
                  </td>
                  <td className="p-2 max-lg:text-sm text-center max-lg:h-[40px]">
                    <img
                      src={player.team}
                      alt={player.team}
                      className="max-lg:h-6 mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      {activeTab === "topScorer" && (
        <div className="">
          <h2 className="text-2xl font-bold text-center my-6">Assits</h2>

          <table className="w-full">
            <thead>
              <tr>
                <th className="px-2 py-2 max-lg:text-sm">Player</th>
                <th className="px-2 py-2 max-lg:text-sm">Score</th>
                <th className="px-2 py-2 max-lg:text-sm">Team</th>
              </tr>
            </thead>
            <tbody>
              {topAssits.map((player, index) => (
                <tr
                  key={index}
                  className={`${
                    index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                  }`}
                >
                  <td className="p-2 flex items-center max-lg:text-sm max-lg:h-[40px]">
                    <img src={player.img} alt="" className="max-lg:w-6 mr-2" />
                    {player.name}
                  </td>
                  <td className="p-2 max-lg:text-sm text-center max-lg:h-[40px]">
                    {player.score}
                  </td>
                  <td className="p-2 max-lg:text-sm text-center max-lg:h-[40px]">
                    <img
                      src={player.team}
                      alt={player.team}
                      className="max-lg:h-6 mx-auto"
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default UCLResults;
