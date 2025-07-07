import React, { useState } from "react";
import Hero from "./Components/Hero";
import Awareness from "./Components/Awareness";
import CalculateForm from "./Components/CalculateForm";
import CalculationResult from "./Components/CalculationResult";

const App = () => {
  const [calculationResult, setCalculationResult] = useState(null);

  const handleCalculationComplete = (result) => {
    setCalculationResult(result);
  };

  return (
    <div className="font-sans">
      <Hero />
      <Awareness />
      <CalculateForm onCalculationComplete={handleCalculationComplete} />
      {calculationResult && <CalculationResult result={calculationResult} />}
    </div>
  );
};

export default App;
