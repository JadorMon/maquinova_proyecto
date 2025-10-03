const mongoose = require("mongoose");
const { MongoMemoryServer } = require("mongodb-memory-server");

let mongoServer;

describe("Pruebas de conexión a la base de datos", () => {
  beforeAll(async () => {
    mongoServer = await MongoMemoryServer.create();
    const uri = mongoServer.getUri();

    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
  }, 30000); // da más tiempo por si acaso

  afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
  });

  test("Debe conectarse correctamente a MongoDB en memoria", () => {
    expect(mongoose.connection.readyState).toBe(1);
  });
});
