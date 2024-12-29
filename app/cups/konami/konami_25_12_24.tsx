"use client";
import React, { useState } from "react";

const UCLResults = () => {
  const [activeTab, setActiveTab] = useState<"matches" | "group" | "topScorer">(
    "matches"
  );

  interface Team {
    team: string;
    img: string;
    won: number;
    drawn: number;
    lost: number;
    goals: string;
    points: number;
  }

  // Define the type for the GroupTable props
  interface GroupTableProps {
    groupData: Team[]; // An array of teams
    groupName: string; // The group name (e.g., "A", "B")
  }

  const topScorers = [
    {
      name: "K Adeyemi",
      score: 8,
      team: "/clubs/bvb.svg",
      img: "/countries/germany.svg",
    },
    {
      name: "Inaki Williams",
      score: 7,
      team: "/clubs/bilbao.svg",
      img: "/countries/ghana.svg",
    },
    {
      name: "Artem Dovbyk",
      score: 5,
      team: "/clubs/roma.svg",
      img: "/countries/ukrain.svg",
    },
    {
      name: "L. Martinez",
      score: 4,
      team: "/clubs/inter.svg",
      img: "/countries/argentina.svg",
    },
    {
      name: "G Scamacca",
      score: 4,
      team: "/clubs/atalanta.svg",
      img: "/countries/italy.svg",
    },
    {
      name: "Trossard",
      score: 4,
      team: "/clubs/arsenal.svg",
      img: "/countries/belgium.svg",
    },
    {
      name: "M Thuram",
      score: 3,
      team: "/clubs/inter.svg",
      img: "/countries/france.svg",
    },
    {
      name: "J Correa",
      score: 3,
      team: "/clubs/inter.svg",
      img: "/countries/argentina.svg",
    },
  ];
  const topAssits = [
    {
      name: "C.Nkunku",
      score: 3,
      team: "/clubs/chelsea.svg",
      img: "/countries/france.svg",
    },
    {
      name: "R cherki",
      score: 3,
      team: "/clubs/lyon.svg",
      img: "/countries/france.svg",
    },
    {
      name: "Matias Soulé",
      score: 3,
      team: "/clubs/roma.svg",
      img: "/countries/argentina.svg",
    },
    {
      name: "Bukayo Saka",
      score: 3,
      team: "/clubs/arsenal.svg",
      img: "/countries/englend.svg",
    },
    {
      name: "M Thuram",
      score: 2,
      team: "/clubs/inter.svg",
      img: "/countries/france.svg",
    },
    {
      name: "M Taremi",
      score: 2,
      team: "/clubs/inter.svg",
      img: "/countries/iran.svg",
    },
    {
      name: "Barella",
      score: 2,
      team: "/clubs/inter.svg",
      img: "/countries/italy.svg",
    },
    {
      name: "Bernardo Silva",
      score: 2,
      team: "/clubs/inter.svg",
      img: "/countries/italy.svg",
    },
  ];
  // Group Stage Leaderboard
  const groups: { [key: string]: Team[] } = {
    A: [
      {
        team: "Leipzig",
        img: "/clubs/leipzig.svg",
        won: 2,
        drawn: 1,
        lost: 0,
        goals: "4-2",
        points: 7,
      },
      {
        team: "Lyon",
        img: "/clubs/lyon.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "7-6",
        points: 4,
      },
      {
        team: "Barça",
        img: "/clubs/fcb.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "6-6",
        points: 4,
      },
      {
        team: "Galatasaray",
        img: "/clubs/galata.svg",
        won: 0,
        drawn: 1,
        lost: 2,
        goals: "2-5",
        points: 1,
      },
    ],
    B: [
      {
        team: "Leipzig",
        img: "/clubs/leipzig.svg",
        won: 2,
        drawn: 1,
        lost: 0,
        goals: "4-2",
        points: 7,
      },
      {
        team: "Lyon",
        img: "/clubs/lyon.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "7-6",
        points: 4,
      },
      {
        team: "Barça",
        img: "/clubs/fcb.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "6-6",
        points: 4,
      },
      {
        team: "Galatasaray",
        img: "/clubs/galata.svg",
        won: 0,
        drawn: 1,
        lost: 2,
        goals: "2-5",
        points: 1,
      },
    ],
    C: [
      {
        team: "Leverkusen",
        img: "/clubs/lev.svg",
        won: 3,
        drawn: 0,
        lost: 0,
        goals: "7-1",
        points: 9,
      },
      {
        team: "Juventus",
        img: "/clubs/juv.svg",
        won: 2,
        drawn: 0,
        lost: 1,
        goals: "5-5",
        points: 6,
      },
      {
        team: "Fc Porto",
        img: "/clubs/porto.svg",
        won: 1,
        drawn: 0,
        lost: 2,
        goals: "3-4",
        points: 3,
      },
      { 
        team: "West Ham",
        img: "/clubs/west.svg",
        won: 0,
        drawn: 0,
        lost: 3,
        goals: "1-6",
        points: 0,
      },
    ],
    D: [
      {
        team: "BVB",
        img: "/clubs/bvb.svg",
        won: 3,
        drawn: 0,
        lost: 0,
        goals: "7-1",
        points: 9,
      },
      {
        team: "Roma",
        img: "/clubs/roma.svg",
        won: 2,
        drawn: 0,
        lost: 1,
        goals: "8-3",
        points: 6,
      },
      {
        team: "ajax",
        img: "/clubs/ajax.svg",
        won: 0,
        drawn: 1,
        lost: 2,
        goals: "1-6",
        points: 1,
      },
      {
        team: "Fenerbahce",
        img: "/clubs/fen.svg",
        won: 0,
        drawn: 1,
        lost: 2,
        goals: "0-6",
        points: 1,
      },
    ],
    E: [
      {
        team: "Chelsea",
        img: "/clubs/chelsea.svg",
        won: 2,
        drawn: 1,
        lost: 0,
        goals: "7-3",
        points: 7,
      },
      {
        team: "Bayern",
        img: "/clubs/bayern.svg",
        won: 2,
        drawn: 0,
        lost: 1,
        goals: "6-5",
        points: 6,
      },
      {
        team: "Napoli",
        img: "/clubs/napoli.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "5-5",
        points: 4,
      },
      {
        team: "Aston Villa",
        img: "/clubs/ast.svg",
        won: 0,
        drawn: 0,
        lost: 3,
        goals: "4-8",
        points: 0,
      },
    ],
    F: [
      {
        team: "Atalanta",
        img: "/clubs/atalanta.svg",
        won: 2,
        drawn: 0,
        lost: 1,
        goals: "6-3",
        points: 6,
      },
      {
        team: "Real Madrid",
        img: "/clubs/rma.svg",
        won: 2,
        drawn: 0,
        lost: 1,
        goals: "5-4",
        points: 6,
      },
      {
        team: "Ac Milan",
        img: "/clubs/milan.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "5-5",
        points: 4,
      },
      {
        team: "Marseille",
        img: "/clubs/marseille.svg",
        won: 0,
        drawn: 1,
        lost: 2,
        goals: "3-7",
        points: 1,
      },
    ],
    G: [
      {
        team: "Arsenal",
        img: "/clubs/arsenal.svg",
        won: 3,
        drawn: 0,
        lost: 0,
        goals: "10-1",
        points: 9,
      },
      {
        team: "Sociedad",
        img: "/clubs/sodad.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "5-5",
        points: 4,
      },
      {
        team: "PSG",
        img: "/clubs/psg.svg",
        won: 1,
        drawn: 1,
        lost: 1,
        goals: "4-5",
        points: 4,
      },
      {
        team: "Sevilla",
        img: "/clubs/sevilla.svg",
        won: 0,
        drawn: 0,
        lost: 3,
        goals: "2-10",
        points: 0,
      },
    ],
    H: [
      {
        team: "At Bilbao",
        img: "/clubs/bilbao.svg",
        won: 2,
        drawn: 1,
        lost: 0,
        goals: "8-1",
        points: 7,
      },
      {
        team: "Ac Milan",
        img: "/clubs/milan.svg",
        won: 2,
        drawn: 1,
        lost: 0,
        goals: "9-1",
        points: 7,
      },
      {
        team: "Fiorentina",
        img: "/clubs/fio.svg",
        won: 1,
        drawn: 0,
        lost: 2,
        goals: "3-6",
        points: 3,
      },
      {
        team: "Al Ettihad",
        img: "/clubs/etihad.svg",
        won: 0,
        drawn: 0,
        lost: 3,
        goals: "0-13",
        points: 0,
      },
    ],
  };
  const GroupTable: React.FC<GroupTableProps> = ({ groupData, groupName }) => {
    return (
      <div className="mb-10">
        <h2 className="text-2xl font-bold text-center mb-6">{`Group ${groupName}`}</h2>
        <table className="w-full border border-neutral-700">
          <thead>
            <tr className="border-b border-neutral-700">
              <th className="p-2 max-lg:text-sm">Team</th>
              <th className="p-2 max-lg:text-sm">W</th>
              <th className="p-2 max-lg:text-sm">D</th>
              <th className="p-2 max-lg:text-sm">L</th>
              <th className="p-2 max-lg:text-sm">G</th>
              <th className="p-2 max-lg:text-sm">Pts</th>
            </tr>
          </thead>
          <tbody>
            {groupData.map((team, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 0 ? "bg-[#021e28]" : "bg-[#030a0e]"
                }`}
              >
                <td className="p-2 flex items-center max-lg:text-sm">
                  <img
                    src={team.img}
                    alt={team.team}
                    className="mr-2 max-lg:h-6 max-lg:w-4 "
                  />
                  {team.team}
                </td>
                <td className="p-2 max-lg:text-sm text-center">{team.won}</td>
                <td className="p-2 max-lg:text-sm text-center">{team.drawn}</td>
                <td className="p-2 max-lg:text-sm text-center">{team.lost}</td>
                <td className="p-2 max-lg:text-sm text-center">{team.goals}</td>
                <td className="p-2 max-lg:text-sm text-center">
                  {team.points}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  // Knockout Stage Results
  const roundOf16 = [
    {
      team1: "R. Madrid",
      img1: "/clubs/rma.svg",
      score1: 4,
      team2: "sevilla",
      img2: "/clubs/sevilla.svg",
      score2: 2,
    },
    {
      team1: "Leverkusen",
      img1: "/clubs/lev.svg",
      score1: 4,
      team2: "Juventus",
      img2: "/clubs/juv.svg",
      score2: 1,
    },
    {
      team1: "BVB",
      img1: "/clubs/bvb.svg",
      score1: 0,
      team2: "Bayern",
      img2: "/clubs/bayern.svg",
      score2: 3,
    },
    {
      team1: "Hamza",
      img1: "/clubs/hilal.svg",
      score1: 3,
      team2: "AC Milan",
      img2: "/clubs/milan.svg",
      score2: 0,
    },
    {
      team1: "Arsenal",
      img1: "/clubs/arsenal.svg",
      score1: "2 (0)",
      team2: "At. Madrid",
      img2: "/clubs/atm.svg",
      score2: "(2) 4",
    },
    {
      team1: "FC Barça",
      img1: "/clubs/fcb.svg",
      score1: 1,
      team2: "Roma",
      img2: "/clubs/roma.svg",
      score2: 3,
    },
    {
      team1: "Man United",
      img1: "/clubs/united.svg",
      score1: 1,
      team2: "PSG",
      img2: "/clubs/psg.svg",
      score2: 3,
    },
    {
      team1: "Mehdi",
      img1: "/clubs/bilbao.svg",
      score1: 0,
      team2: "Inter",
      img2: "/clubs/inter.svg",
      score2: 1,
    },
  ];

  const quarterFinals = [
    {
      team1: "R. Madrid",
      img1: "/clubs/rma.svg",
      score1: "3 (2)",
      team2: "Leverkusen",
      img2: "/clubs/lev.svg",
      score2: "(1) 2",
    },
    {
      team1: "Bayern",
      img1: "/clubs/bayern.svg",
      score1: "1 (0)",
      team2: "Hamza",
      img2: "/clubs/hilal.svg",
      score2: "(1) 2",
    },
    {
      team1: "At. Madrid",
      img1: "/clubs/atm.svg",
      score1: 2,
      team2: "Roma",
      img2: "/clubs/roma.svg",
      score2: 3,
    },
    {
      team1: "PSG",
      img1: "/clubs/psg.svg",
      score1: 3,
      team2: "Inter",
      img2: "/clubs/inter.svg",
      score2: 4,
    },
  ];

  const semiFinals = [
    {
      team1: "R. Madrid",
      img1: "/clubs/rma.svg",
      score1: 1,
      team2: "Hamza",
      img2: "/clubs/hilal.svg",
      score2: 2,
    },
    {
      team1: "Roma",
      img1: "/clubs/roma.svg",
      score1: 1,
      team2: "Inter",
      img2: "/clubs/inter.svg",
      score2: 2,
    },
  ];

  const final = {
    team1: "Moroza",
    img1: "/clubs/chelsea.svg",
    score1: 2,
    team2: "BVB",
    img2: "/clubs/bvb.svg",
    score2: 0,
  };

  return (
    <div className="min-h-screen text-white py-12 px-5 max-w-[800px] mx-auto">
      <h1 className="text-4xl font-bold text-center mb-2">KONAMI Cup</h1>
      <h3 className="mb-6 text-center text-2xl flex items-center justify-center gap-3">
        Winner:
        <span className="flex gap-2">
          <img src={final.img1} alt={final.team1} />
          <p className="lg:mt-1">{final.team1}</p>
        </span>
      </h3>
        <p className="mb-6 text-xl px-6">Moroza</p>
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
          Standings
        </button>
        <button
          onClick={() => setActiveTab("topScorer")}
          className={`py-1 px-2 max-lg:text-xs rounded ${
            activeTab === "topScorer" ? "bg-red-700" : "bg-[#021e28]"
          } hover:bg-red-700`}
        >
          Top Scorers
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
        <div>
          <div>
            <h3 className="mb-6 text-center text-2xl">Groupe Match</h3>
          </div>
          {Object.keys(groups).map((groupKey) => (
            <GroupTable
              key={groupKey}
              groupData={groups[groupKey]}
              groupName={groupKey}
            />
          ))}
        </div>
      )}
      {activeTab === "topScorer" && (
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
