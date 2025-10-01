import { useState } from "react";

function App() {
  const [token, setToken] = useState("");
  const [data, setData] = useState([]);

  // 🔑 Login con usuario y contraseña
  const login = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username: "admin", password: "1234" })
      });
      const json = await res.json();

      if (json.token) {
        setToken(json.token);
        alert("✅ Login exitoso");
      } else {
        alert("❌ Error en login");
      }
    } catch (err) {
      console.error("Error en login:", err);
    }
  };

  // 📊 Cargar datos del dashboard con el token
  const loadDashboard = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/dashboard", {
        headers: { 
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}` // 👈 envío del token
        }
      });
      const json = await res.json();
      setData(json);
    } catch (err) {
      console.error("Error cargando dashboard:", err);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "40px" }}>
      <h1>📊 Dashboard MaquiNova</h1>

      {!token ? (
        <div>
          <p>Inicia sesión para continuar</p>
          <button onClick={login}>Login</button>
        </div>
      ) : (
        <div>
          <button onClick={loadDashboard}>Cargar Dashboard</button>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {data.map((item, i) => (
              <li key={i}>
                <strong>{item._id}</strong>: {item.total} unidades
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default App;
