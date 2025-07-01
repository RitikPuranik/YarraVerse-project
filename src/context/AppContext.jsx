import React, { createContext, useState, useEffect } from 'react';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  // Shared state like location, crowd level, weather
  const [crowdLevel, setCrowdLevel] = useState(65);
  const [weather, setWeather] = useState({ temp: 28, condition: 'Sunny' });

  useEffect(() => {
    const id = setInterval(() => {
      setCrowdLevel(c => Math.max(20, Math.min(95, c + (Math.random() - 0.5) * 10)));
      setWeather(w => ({
        ...w,
        temp: Math.max(20, Math.min(35, w.temp + (Math.random() - 0.5) * 2)),
      }));
    }, 5000);
    return () => clearInterval(id);
  }, []);

  return (
    <AppContext.Provider value={{ crowdLevel, weather }}>
      {children}
    </AppContext.Provider>
  );
};
