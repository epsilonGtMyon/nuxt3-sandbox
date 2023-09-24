import express from "express";
import session from "express-session";
//import helmet from "helmet";
import morgan from "morgan";

//------------------------
const app = express();

app.use(express.json())
app.use(morgan("dev"));
//app.use(helmet())
app.use(
  session({
    // とりあえずテキトーに
    secret: "keyboard cat",
    name: `my-session`,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
  })
);

//------------------------
const router = express.Router();
router.get("/hello", (req, res) => {
  res.send({
    value: "hello",
  });
});

//---
import { sandbox01Routes } from "./sandbox01/Sandbox01Routes";
app.use("/backend/sandbox01", sandbox01Routes);


// serverHandlersのrouteと一致させておく
app.use("/backend", router);

export default fromNodeMiddleware(app);
