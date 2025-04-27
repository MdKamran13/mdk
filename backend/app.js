const express = require('express');
const mongoose  = require('mongoose')
const dotenv = require("dotenv");
dotenv.config();
const userRoutes = require("./routes/user.routes");
const officerRoutes = require("./routes/officer.routes");
const app = express();
const cookies = require("cookie-parser");
mongoose.connect(process.env.MONGO_URI, {
    tls: true,
    tlsAllowInvalidCertificates: false, // change to true only if needed for testing
})
.then(() => console.log("Connected to DB"))
.catch(err => console.error("MongoDB Connection Error:", err));

app.use(cookies());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/users", userRoutes);
app.use("/officers", officerRoutes);

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(3000, () => {
    console.log('Server is running on http://localhost:3000');
});
