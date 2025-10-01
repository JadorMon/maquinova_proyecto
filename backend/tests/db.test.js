require("dotenv").config({ path: __dirname + "/../.env" });
const mongoose = require("mongoose");
const connectDB = require("../db");

console.log("🔍 MONGO_URI =", process.env.MONGO_URI);

describe("Pruebas de conexión a la base de datos", () => {
  beforeAll(async () => {
    await connectDB();
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });

  test("Debe conectarse correctamente a MongoDB", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
