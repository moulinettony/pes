"use client";
import React, { useState } from "react";
import Konami_5_12_24 from "./konami_5_12_24";
import Konami_6_12_24 from "./konami_6_12_24";
import Konami_11_12_24 from "./konami_11_12_24";
import Konami_25_12_24 from "./konami_25_12_24";

const App = () => {
  const [selectedKonami, setSelectedKonami] = useState("5_12_24");

  const handleDropdownChange = (e:any) => {
    setSelectedKonami(e.target.value);
  };

  return (
    <div className="bg-[#030a0e]">
      <div className="pt-20 text-white text-center">
        <select
          className="bg-transparent p-2 border border-neutral-600 rounded"
          id="konami-dropdown"
          value={selectedKonami}
          onChange={handleDropdownChange}
        >
          <option className="text-black" value="5_12_24">5 Dec 2024</option>
          <option className="text-black" value="6_12_24">6 Dec 2024</option>
          <option className="text-black" value="11_12_24">11 Dec 2024</option>
          <option className="text-black" value="25_12_24">25 Dec 2024</option>
        </select>
      </div>

      {selectedKonami === "5_12_24" && <Konami_5_12_24 />}
      {selectedKonami === "6_12_24" && <Konami_6_12_24 />}
      {selectedKonami === "11_12_24" && <Konami_11_12_24 />}
      {selectedKonami === "25_12_24" && <Konami_25_12_24 />}
    </div>
  );
};

export default App;
