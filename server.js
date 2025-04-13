require('dotenv').config();
const jwt = require('jsonwebtoken');
const express = require("express");
const mongoose = require("mongoose");
const { createHandler } = require("graphql-http/lib/use/express");
const { ruruHTML } = require("ruru/server");
const cors = require("cors");
const { graphqlHTTP } = require('express-graphql');


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

  app.use('/graphql', graphqlHTTP((req) => {
    const authHeader = req.headers.authorization || '';
    const token = authHeader.replace('Bearer ', '');
    let user = null;
  
    if (token) {
      try {
        user = jwt.verify(token, 'tube_kids');
      } catch (err) {
        console.log('Invalid token:', err.message);
      }
    }
  
    return {
      schema,
      rootValue: root,
      context: { user }
    };
  }));


app.get("/", (_req, res) => {
  res.type("html").end(ruruHTML({ endpoint: "/graphql" }));
});

app.listen(4000, () => {
  console.log("🚀 GraphQL corriendo en http://localhost:4000/graphql");
});
