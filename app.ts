import express from "express";
import { create } from "express-handlebars";
import { routerVoo } from "./routes/vooRoutes";
import { conn } from "./db/database";
import { routerBilhete } from "./routes/bilheteRoutes";
import { routerCompra } from "./routes/compraRoutes";

const app = express();
app.use(
  //configurando o express para pegar o body
  express.urlencoded({
    extended: true,
  })
);

app.use(express.json()); //pegar o body em json
const hbs = create({
  partialsDir: ["views/partials"],
});

app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public/"));
app.use(express.static("helpers/"));

app.use("/", routerVoo);
app.use("/", routerBilhete);
app.use("/", routerCompra);

app.listen(3333, async () => {
  try {
    if (await conn) {
      console.log("App funcionando em http://localhost:3333/buscavoo");
    }
  } catch (error) {
    console.log("Erro ao conectar no banco de dados");
  }
});
