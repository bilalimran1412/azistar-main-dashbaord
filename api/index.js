const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();
const cors = require("cors");
const app = express();
const router = require("./routes");

app.use(cors());
app.use(express.json());

app.get('/api/v1/', (req, res) => {
    res.json('Azistar api')
})
app.use("/api/v1", router);

const mongoURI = process.env.MONGO_URI;

mongoose
    .connect(mongoURI)
    .then(() => {
        app.listen(process.env.PORT || 3000, () => {
            console.log(
                `Server is running on port ${process.env.PORT || 3000}`
            );
        });
    })
    .catch((err) => {
        console.error("Error connecting to database:", err);
    });
