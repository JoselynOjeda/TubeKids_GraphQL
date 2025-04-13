require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');
const { makeExecutableSchema } = require('@graphql-tools/schema');
const { ruruHTML } = require("ruru/server");

const typeDefs = require('./schema');
const resolvers = require('./resolvers');

const app = express();
app.use(cors());

// Conexión a MongoDB
mongoose.connect(process.env.DB_CONNECTION_STRING, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => console.log("✅ Conectado a MongoDB"))
  .catch(err => console.error("❌ Error al conectar a MongoDB:", err));

// Crear el esquema
const schema = makeExecutableSchema({ typeDefs, resolvers });

// Middleware GraphQL con autenticación
app.use('/graphql', graphqlHTTP((req) => {
  const authHeader = req.headers.authorization || '';
  const token = authHeader.replace('Bearer ', '');
  let user = null;

  if (token) {
    try {
      const decoded = jwt.verify(token, 'tube_kids');
      console.log("✅ Decoded Token:", decoded);
      user = { id: decoded.id };
    } catch (err) {
      console.log("❌ Token inválido:", err.message);
    }
  }

  return {
    schema,
    context: { user },
    graphiql: true,
  };
}));

// Visualizador
app.get("/", (_req, res) => {
  res.type("html").end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("🚀 GraphQL corriendo en http://localhost:4000/graphql");
});
