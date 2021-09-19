const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { router } = require("./routes/routes.js")

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(express.json());
app.use("/", router);

mongoose.connect("mongodb://localhost:27017/banking")
.then(() => console.log("Connected to db"))
.catch((err) => {console.log(`DB connection Error: ${err.message}`);});


app.listen(port, () => {console.log(`Connected on port: ${port}`);});

