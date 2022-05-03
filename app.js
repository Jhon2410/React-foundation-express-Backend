const createError = require("http-errors");
const express = require("express");
var cors = require("cors");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const fs = require("fs");
const privateKey = fs.readFileSync("env/private.key");
const jwt = require("jsonwebtoken");
const rutasProtegidas = express.Router();
const path = require("path");
const biblioteca = require("./routes/biblioteca")
const baseUrl = "http://localhost:3000";

var whitelist = [baseUrl];
var corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
};

const app = express();
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);



//token validar
rutasProtegidas.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, app.get("llave"), (err, decoded) => {
      if (err) {
        return res.json({ mensaje: "Token inválida", estado: 0 });
      } else {
        req.query = decoded;
        next();
      }
    });
  } else {
    res.json({
      mensaje: "Token no proveída.",
      estado: 0,
    });
  }
});
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'jade');
app.set("llave", privateKey);
app.use(logger("dev"));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(express.static("public"));

app.use("/biblioteca",biblioteca )
app.use(express.static(__dirname + 'public'))
app.get("/",(req, res)=>{
  res.json({ respuesta: "Nada"})
})
console.log(app.get("llave"));
// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(301));
});
// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  console.log(err);
  res.json("HA OCURRIDO UN ERROR, pronto se solucionará." + err);
});

module.exports = app;
