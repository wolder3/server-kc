const express = require("express");

const ContactoController = require("../controllers/contacto");

const api = express.Router();

api.post("/create-contacto", ContactoController.createContacto);
api.get("/list-contacto", ContactoController.listContacto);
api.delete("/delete-contacto/:id", ContactoController.deleteContacto);
api.put("/update-contacto/:id", ContactoController.updateContacto);
api.get("/get-contacto/:id", ContactoController.getContactoById);

module.exports = api;
