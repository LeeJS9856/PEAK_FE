import React, { createContext, useState, useContext } from 'react';

interface RefuelData {
  car: { id: number; name: string; fuelType: string };
  fuelAmount: string;
  targetPrice: string;
}

interface RefuelContextType {
  refuelData: RefuelData | null;
  setRefuelData: (data: RefuelData | null) => void;
}

const RefuelContext = createContext<RefuelContextType | undefined>(undefined);

export const RefuelProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [refuelData, setRefuelData] = useState<RefuelData | null>(null);
  return (
    <RefuelContext.Provider value={{ refuelData, setRefuelData }}>
      {children}
    </RefuelContext.Provider>
  );
};

export const useRefuel = () => {
  const context = useContext(RefuelContext);
  if (!context) throw new Error('useRefuel must be used within a RefuelProvider');
  return context;
};
