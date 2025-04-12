// Cargar variables de entorno desde .env
require('dotenv').config();

const express = require("express");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const mongoose = require("mongoose");

// Conectar a MongoDB usando la cadena de conexión de .env
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Importar esquema GraphQL y controladores
const { schema } = require("./graphql/schema"); // donde defines tus tipos y queries
const videoController = require("./controllers/videoController");

// Definir resolvers
const root = {
  getVideos: async () => {
    return await videoController.getVideos();
  },
  getVideoById: async ({ id }) => {
    return await videoController.getVideoById(id);
  }
};

// Crear la app de Express
const app = express();

// Ruta para GraphQL
app.all(
  "/graphql",
  createHandler({
    schema: schema,
    rootValue: root,
  })
);

// Ruta para interfaz visual (tipo GraphiQL)
app.get("/", (_req, res) => {
  res.type("html");
  res.end(ruruHTML({ endpoint: "/graphql" }));
});

// Iniciar servidor
app.listen(4000, () => {
  console.log("🚀 Servidor GraphQL corriendo en http://localhost:4000/graphql");
});
