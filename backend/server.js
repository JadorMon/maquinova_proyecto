const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./db");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(bodyParser.json());

// Conexión a MongoDB
connectDB();

// Rutas
const authRoutes = require("./routes/auth");
const dashboardRoutes = require("./routes/dashboard");

app.use("/api/auth", authRoutes);
app.use("/api/dashboard", dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en puerto ${PORT}`);
});
