require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");

const { schema } = require("./schema");   
const { root } = require("./resolvers");  

const app = express();

app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

app.all("/graphql", createHandler({
  schema,
  rootValue: root,
}));


app.get("/", (_req, res) => {
  res.type("html").end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("🚀 GraphQL corriendo en http://localhost:4000/graphql");
});
