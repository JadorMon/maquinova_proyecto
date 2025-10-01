import React, { useEffect, useState } from "react";
import axios from "axios";

function Dashboard({ token }) {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/dashboard", {
          headers: { Authorization: `Bearer ${token}` }
        });
        setData(res.data);
      } catch (err) {
        console.error("Error cargando dashboard:", err);
      }
    };
    fetchData();
  }, [token]);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h2>📊 Dashboard de Producción</h2>
      <ul style={{ listStyle: "none", padding: 0 }}>
        {data.map((item, index) => (
          <li key={index}>
            <strong>{item._id}</strong>: {item.total} unidades
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Dashboard;
