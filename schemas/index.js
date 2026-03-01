const Ajv2020 = require("ajv/dist/2020");
const ajv = new Ajv2020(); /* https://ajv.js.org/json-schema.html#draft-2020-12 */
const schema_person = require("./person.schema.json")
const schema_coordinate = require("./coordinate.schema.json")
// addSchema valida el schema, pero no lo compila
// ver https://ajv.js.org/guide/managing-schemas.html#using-ajv-instance-cache
ajv.addSchema(schema_person, "person")
ajv.addSchema(schema_coordinate, "coordinate")
module.exports = ajv;


// 1. Datos de prueba
const personaDePrueba = {
    nombre: "Gabriel", // Ajusta según las propiedades de tu person.schema.json
    edad: 25
};

// 2. Ejecutar la validación usando la "key" que registraste en la línea 7
const validate = ajv.getSchema("person");

if (validate(personaDePrueba)) {
    console.log("✅ ¡La validación fue exitosa!");
} else {
    console.log("❌ Errores encontrados:", validate.errors);
}