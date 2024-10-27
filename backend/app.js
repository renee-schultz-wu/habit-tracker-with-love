const express = require("express");
const path = require("node:path");
const cors = require('cors');


const app = express();
app.use(cors());
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

const indexRouter = require("./routes/index");
const tallyRouter = require("./routes/tally");
const completeRouter = require("./routes/complete");


app.use('/tally', tallyRouter);
app.use('/update', completeRouter);
app.use('/view', indexRouter);
app.use('/', indexRouter);


const PORT = 3000;
app.listen(PORT, () => console.log(`My first Express app - listening on port ${PORT}!`));