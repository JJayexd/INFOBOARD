import React, { useEffect, useState } from 'react';

export const TestBus = ({ title = "Buser", children }) => {

    const [departures, setDepartures] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchDepartures = async () => {
          try {
            const res = await fetch('https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=5b71ed68-7338-4589-8293-f81f0dc92cf2&originCoordLat=57.048731&originCoordLong=9.968186&format=json');
            
            if (!res.ok) {
              throw new Error('Fejl');
            }
            const data = await res.json();
    
            console.log("RESPONS:", data);
    
            setDepartures(data.Departure || []);
          } catch (err) {
            setError(err.message || "Fejl");
          } finally {
            setLoading(false);
          }
        };
    
        fetchDepartures();
      }, []);
    
      if (loading) return <p>Loading..</p>;
      if (error) return <p>{error}</p>;

  return (
    <div className="max-h-400px mt-4 rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden ">
      {/* Top Bar */}
      <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
        <div className="flex space-x-2">
          <span className="w-3 h-3 bg-red-500 rounded-full"></span>
          <span className="w-3 h-3 bg-yellow-500 rounded-full"></span>
          <span className="w-3 h-3 bg-green-500 rounded-full"></span>
        </div>
        <div className="flex-1 text-center text-gray-500 text-sm font-medium">
          {title}
        </div>
        <div className="w-8"></div> {/* Spacer to center title */}
      </div>

      {/* Window Content */}
      <div className="p-4 bg-white">
        {children || (
          <>
            <ul className="space-y-2">
                {departures.slice(0, 5).map((departure, index) => (
                <li key={index} className="m-1">
                    <p><strong>{departure.name}</strong> går mod <strong>{departure.direction}</strong></p>
                    <p><strong>Kører:</strong> {departure.time}</p>
                </li>
                ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};
