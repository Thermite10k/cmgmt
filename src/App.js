import { useState } from "react";
import "./App.css";
import Timer from "./components/Timer/Timer";

function App() {
  const hourlyRate = 160;
  const [prices, setPrices] = useState([]);

  const handlePriceChange = (index, price) => {
    const updatedPrices = [...prices];
    updatedPrices[index] = price;
    setPrices(updatedPrices);
  };

  const addTimer = () => {
    setPrices([...prices, 0]);
  };

  return (
    <div className="App">
      <center>
        <h1>cmgmt v0.1</h1>
      </center>
      {prices.map((price, index) => (
        <div key={index}>
          <h2>Timer {index + 1}</h2>
          <Timer
            rate={hourlyRate}
            onPriceChange={(price) => handlePriceChange(index, price)}
          />
          <h3>Price: ${price}</h3>
        </div>
      ))}
      <button onClick={addTimer}>Add Timer</button>
    </div>
  );
}

export default App;
