import express from "express";
import {create} from "express-handlebars";
import { router } from "./routes/page_route";
import { conn } from "./db/database";

const app = express();
const hbs = create({
    partialsDir: ["views/partials"]
});

app.use(
    express.urlencoded({extended: true, })
);

app.use(express.json());


app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", "./views");

app.use(express.static("public/"));

app.use("/", router);

app.listen(3333, async () => {
    try {
      if (await conn) {
        console.log("App funcionando em http://localhost:3333/buscavoo");
      }
    } catch (error) {
      console.log("Erro ao conectar no banco de dados");
    }
  });