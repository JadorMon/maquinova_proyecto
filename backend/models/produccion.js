const mongoose = require("mongoose");

const produccionSchema = new mongoose.Schema({
  linea: { type: String, required: true },
  unidades: { type: Number, required: true },
  fecha: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Produccion", produccionSchema);
