// import { getProductImage } from "./helper";
const getProductImage = require("./helper").getProductImage;

// async function main() {
//     const productUrl =
//         "https://www.amazon.com/Disney-Stitchs-Fresh-Catch-T-Shirt/dp/B07K11YZYZ/ref=sr_1_1?dchild=1&keywords=sushi&m=ATVPDKIKX0DER&qid=1595751459&refinements=p_6%3AATVPDKIKX0DER&s=apparel&sr=1-1";

//     const imgUrl = await getProductImage(productUrl);
//     console.log({ imgUrl });
// }
// main();

const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const path = require("path");
const createError = require("http-errors");

const app = express();
//parse requests
app.use(bodyParser.urlencoded({ extended: true }));

const port = 3000;

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "pug");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//route
app.get("/", (req, res) => {
    res.render("index", { title: "Hey", message: "Hello there!" });
});
app.get("/image", async function (req, res) {
    res.render("image", { title: "image", result: "result" });
});

app.post("/", function (req, res) {
    res.send("Got a POST request");
});
app.post("/image", async function (req, res) {
    const url = req.body.url;
    const result = await getProductImage(url);
    res.render("image", { title: "image", result, url });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render("error");
});

app.listen(process.env.PORT || port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});
