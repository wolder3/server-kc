const express = require("express");

const ReferenciaController = require("../controllers/referencia");

const api = express.Router();

api.post("/create-referencia", ReferenciaController.createReferencia);
api.get("/list-referencia", ReferenciaController.listReferencia);
api.delete("/delete-referencia/:id", ReferenciaController.deleteReferencia);
api.put("/update-referencia/:id", ReferenciaController.updateReferencia);
api.get("/get-referencia/:id", ReferenciaController.getReferenciaById);

module.exports = api;
