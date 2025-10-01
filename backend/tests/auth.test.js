require("dotenv").config({ path: __dirname + "/../.env" });

const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");

const authRoutes = require("../routes/auth");
const connectDB = require("../db");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

beforeAll(async () => {
  await connectDB(); // Conecta a MongoDB antes de ejecutar tests
});

afterAll(async () => {
  await mongoose.connection.close(); // Cierra conexión después
});

describe("Pruebas de login", () => {
  test("POST /auth/login - Debe retornar status 401 si usuario no existe", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "no_existe", password: "123456" });

    expect(res.statusCode).toBe(401);
  }, 10000);
});
