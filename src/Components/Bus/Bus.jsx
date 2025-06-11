import React, { useEffect, useState } from 'react';

export const Bus = () => {
  const [departures, setDepartures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDepartures = async () => {
      try {
        const response = await fetch(
          'https://www.rejseplanen.dk/api/nearbyDepartureBoard?accessId=5b71ed68-7338-4589-8293-f81f0dc92cf2&originCoordLat=57.048731&originCoordLong=9.968186&format=json'
        );
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDepartures(data.Departure || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchDepartures();
  }, []);

  if (loading) return <p>Loading departures...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <div className="bg-grey/30 backdrop-invert backdrop-opacity-10 border rounded-lg my-1 w-300px">
      <h2 className="text-xl font-bold uppercase m-1">BUSER</h2>
      <ul className="space-y-2">
        {departures.slice(0, 3).map((departure, index) => (
          <li key={index} className="m-1">
            <p><strong>Line:</strong> {departure.line}</p>
            <p><strong>Direction:</strong> {departure.direction}</p>
            <p><strong>Departure Time:</strong> {departure.time}</p>
            <p><strong>Stop:</strong> {departure.stop}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};