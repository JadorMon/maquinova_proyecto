const mongoose = require("mongoose");
require("dotenv").config({ path: __dirname + "/.env" });

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ Conexión a MongoDB exitosa");
  } catch (err) {
    console.error("❌ Error de conexión a MongoDB:", err);

    if (process.env.NODE_ENV !== "test") {
      process.exit(1); // solo en entorno normal
    }

    throw err; // lanzar error para que Jest lo detecte
  }
};

module.exports = connectDB;

