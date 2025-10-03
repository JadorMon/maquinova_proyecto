const request = require("supertest");
const express = require("express");
const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

const authRoutes = require("../routes/auth");

const app = express();
app.use(express.json());
app.use("/auth", authRoutes);

let mongoServer;

beforeAll(async () => {
  mongoServer = await MongoMemoryServer.create();
  const uri = mongoServer.getUri();

  await mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
}, 30000);

afterAll(async () => {
  await mongoose.disconnect();
  await mongoServer.stop();
});

describe("Pruebas de login", () => {
  test("POST /auth/login - Debe retornar status 401 si usuario no existe", async () => {
    const res = await request(app)
      .post("/auth/login")
      .send({ username: "no_existe", password: "123456" });

    expect(res.statusCode).toBe(401);
  });
});
