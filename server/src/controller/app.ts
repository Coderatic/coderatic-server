import Express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import authRoute from "../routes/auth.js";

const app = Express();
app.use(cors());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);
app.use(bodyParser.json());

authRoute();

const PORT = 8081;
app.listen(PORT, () => {
  console.log(`Server is up and running at http://localhost:${PORT}.`);
});

export default app;
