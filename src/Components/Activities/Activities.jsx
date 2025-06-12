 import React, { useEffect, useState } from "react";

export const Activities = ({ title = "Skema", children }) => {

    const [activities, setActivities] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
  
    useEffect(() => {
      const fetchData = async () => {
        try {
          const res = await fetch(
            "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed"
          );
          if (!res.ok) throw new Error("Fetch failed");
          const data = await res.json();
          console.log("Data from API:", data);
          setActivities(data.value || []);
        } catch (err) {
          console.error("Fetch error:", err);
          setError(err.message);
        } finally {
          setLoading(false);
        }
      };
  
      fetchData();
    }, []);
  

    if (loading) return <p>Loading..</p>;
    if (error) return <p>{error}</p>;

    return (
        <>
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
                            <ul>
                                {activities.slice(0, 8).map((item) => (
                                <li key={item.Id} className="mb-1">
                                    <p><i className="fa-solid fa-angle-down mr-1"></i><i className="fa-solid fa-folder text-blue-500 mr-1"></i>{item.Room}</p>
                                    <p className="">{new Date(item.StartDate).toLocaleString()}</p>
                                    <p className="font-medium">{item.Subject}</p>
                                </li>
                                ))}
                            </ul>
                        </>
                    )}
                </div>
            </div>
        </>
    );
};
