import React, { useEffect, useState } from 'react';

export const Bus = () => {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Opdater uret hvert sekund
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

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
    <div className="bg-white/30 backdrop-invert backdrop-opacity-10 border rounded-lg my-1 w-300px p-4 text-black shadow-lg">
      {/* Digitalt ur */}
      <div className="text-4xl font-mono text-center text-black-400 mb-4 tracking-widest">
        {currentTime.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
      </div>

      <h2 className="text-xl text-yellow-500 font-bold uppercase mb-2 text-center">
        BUSER VED Ø. UTTRUPVEJ
      </h2>

      <ul className="space-y-2">
        {departures.slice(0, 5).map((departure, index) => (
          <li key={index} className="m-1">
            <p><strong>{departure.name}</strong> går mod <strong>{departure.direction}</strong></p>
            <p><strong>Kører:</strong> {departure.time}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
