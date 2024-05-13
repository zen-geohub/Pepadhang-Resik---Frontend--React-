import React, { useState } from "react";

export const ResultContext = React.createContext();

function ApplicationResult({ children }) {
  const [result, setResult] = useState({});

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
}
export default ApplicationResult;
