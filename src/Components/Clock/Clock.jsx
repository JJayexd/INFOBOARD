import React, { useState, useEffect } from 'react';

export const Clock = () => {
  const [time, setTime] = useState(new Date());
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const res = await fetch(
          'https://api.openweathermap.org/data/2.5/weather?q=Aalborg&appid=4d58d6f0a435bf7c5a52e2030f17682d&units=metric'
        );
        if (!res.ok) throw new Error('Fejl');
        const data = await res.json();
        setWeather({
          temp: data.main.temp,
          description: data.weather[0].description,
        });
      } catch (err) {
        console.error(err);
      }
    };

    fetchWeather();
  }, []);

  const formatTime = (date) => {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <div className="mt-4 text-center font-bold p-4">
      <h1 className="text-6xl">{formatTime(time)}</h1>
      {weather ? (
        <div className="mt-4 text-xl">
          <p>{weather.temp}°C</p>
        </div>
      ) : (
        <div className="mt-4 text-xl text-gray-500">Loading..</div>
      )}
    </div>
  );
};
