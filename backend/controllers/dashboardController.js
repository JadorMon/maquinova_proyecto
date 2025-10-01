const Produccion = require("../models/produccion");

exports.getDashboardData = async (req, res) => {
  try {
    const data = await Produccion.aggregate([
      { $group: { _id: "$linea", total: { $sum: "$unidades" } } }
    ]);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: "Error al obtener datos" });
  }
};
