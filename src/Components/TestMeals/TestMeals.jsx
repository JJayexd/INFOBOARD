import React, { useEffect, useState } from 'react';

export const TestMeals = ({ title = "Kantinen", children }) => {
  
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
        <div className="mt-4 w-full max-w-5xl mx-auto rounded-2xl shadow-lg border border-gray-300 bg-white overflow-hidden">
          {/* MacOS Top Bar */}
          <div className="flex items-center px-4 py-2 bg-gray-100 border-b border-gray-300">
            <div className="flex space-x-2">
              <span className="w-3 h-3 bg-red-500 rounded-full" />
              <span className="w-3 h-3 bg-yellow-500 rounded-full" />
              <span className="w-3 h-3 bg-green-500 rounded-full" />
            </div>
            <div className="flex-1 text-center text-gray-500 text-sm font-medium">
              {title}
            </div>
            <div className="w-8" /> {/* Spacer to center title */}
          </div>
      
          <div className="p-6 bg-white">
            {children || (
              <ul className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                {meals.map((meal, index) => {
                  const isToday =
                    meal.DayName.toLowerCase() ===
                    new Date().toLocaleDateString("da-DK", {
                      weekday: "long",
                    }).toLowerCase();
      
                  return (
                    <li
                      key={index}
                      className={`flex flex-col justify-between min-h-[160px] p-4 rounded-xl border shadow-sm text-sm transition-all ${
                        isToday
                          ? "border-blue-500 bg-blue-50 text-blue-800"
                          : "border-gray-200 bg-white text-gray-800"
                      }`}
                    >
                      <p className="uppercase font-bold text-[10px] tracking-wide">
                        {meal.DayName}
                      </p>
                      <p className="leading-snug">
                        {meal.Dish}
                      </p>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </div>
      )};
