import React, { useEffect, useState } from 'react';

export const Meals = () => {
  
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMeals = async () => {
      try {
        const res = await fetch("https://infoskaerm.techcollege.dk/umbraco/api/content/getcanteenmenu/?type=json");
        const data = await res.json();

        console.log("RESPONS:", data);

        if (Array.isArray(data?.Days)) {
          setMeals(data.Days);
        } else {
          throw new Error("FORKERT API STRUKTUR?");
        }
      } catch (err) {
        setError(err.message || "Fejl");
      } finally {
        setLoading(false);
      }
    };

    fetchMeals();
  }, []);

  if (loading) return <p>Loading..</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="bg-white/30 backdrop-invert backdrop-opacity-10 border rounded-lg my-1 w-300px">
      <h2 className="text-xl font-bold uppercase m-1">Kantinen</h2>
        <ul>
          {meals.map((meal, index) => (
            <li key={index} className="m-1">
              <p className="uppercase font-bold">{meal.DayName}</p>
              <p>{meal.Dish}</p>
            </li>
          ))}
        </ul>
    </div>
  );
};
