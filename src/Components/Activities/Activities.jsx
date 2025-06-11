// import React, { useEffect, useState } from "react";

// export const Activities = () => {
//   const [activities, setActivities] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchActivities = async () => {
//       try {
//         const response = await fetch(
//           "https://iws.itcn.dk/techcollege/schedules?departmentcode=smed"
//         );
//         if (!response.ok) {
//           throw new Error("Network response was not ok");
//         }
//         const html = await response.text();
//         const parser = new DOMParser();
//         const doc = parser.parseFromString(html, "text/html");

//         // Example: get all schedule rows from a specific table
//         const rows = Array.from(doc.querySelectorAll("table tbody tr"));
//         const parsedActivities = rows.map((row) => {
//           const cols = row.querySelectorAll("td");
//           return {
//             time: cols[0]?.innerText.trim(),
//             activity: cols[1]?.innerText.trim(),
//             teacher: cols[2]?.innerText.trim(),
//             room: cols[3]?.innerText.trim(),
//           };
//         });

//         setActivities(parsedActivities);
//       } catch (err) {
//         setError(err.message);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchActivities();
//   }, []);

//   if (loading) return <p>Loading activities...</p>;
//   if (error) return <p>Error: {error}</p>;

//   return (
//     <div className="p-4">
//       <h2 className="text-xl font-bold mb-4">Activities Schedule</h2>
//       <table className="min-w-full border border-gray-300">
//         <thead>
//           <tr className="bg-gray-100">
//             <th className="border px-2 py-1">Time</th>
//             <th className="border px-2 py-1">Activity</th>
//             <th className="border px-2 py-1">Teacher</th>
//             <th className="border px-2 py-1">Room</th>
//           </tr>
//         </thead>
//         <tbody>
//           {activities.map((item, index) => (
//             <tr key={index} className="border-t">
//               <td className="border px-2 py-1">{item.time}</td>
//               <td className="border px-2 py-1">{item.activity}</td>
//               <td className="border px-2 py-1">{item.teacher}</td>
//               <td className="border px-2 py-1">{item.room}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };
