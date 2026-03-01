const express = require("express");
const Ajv2020 = require("ajv/dist/2020");
const app = express();

// Middlewares
app.use(express.json()); // Importante para leer el cuerpo del POST

// Tu configuración actual de Ajv
const ajv = new Ajv2020();
const schema_person = require("./person.schema.json");
const schema_coordinate = require("./coordinate.schema.json");

ajv.addSchema(schema_person, "person");
ajv.addSchema(schema_coordinate, "coordinate");

// --- RUTAS POST ---

// Ruta 1: Validar Persona
app.post("/validar-persona", (req, res) => {
    const validate = ajv.getSchema("person");
    const esValido = validate(req.body); // Esto devuelve true o false

    if (!esValido) { // Si NO es válido...
        return res.status(422).json({
            error: "Datos inválidos",
            detalles: validate.errors
        });
    }

    // Si llegamos aquí, es que es válido
    return res.status(200).send("JSON de persona válido");
});

// Ruta 2: Validar Coordenada
app.post("/validar-coordenada", (req, res) => {
    const validate = ajv.getSchema("coordinate");
    const esValido = validate(req.body);

    if (esValido) {
        return res.status(200).send("JSON de coordenada válido");
    } else {
        return res.status(422).json({ error: "No válido", detalles: validate.errors });
    }
});

// Levantar el servidor
const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Servidor ejecutándose en http://localhost:${PORT}`);
});