const express = require("express");
const cors = require("cors");
const path = require("path");

// Setup server
const app = express();
app.use(express.json());
app.use(cors());
app.use("/user", require("./routes/userRouter.js"));


// app.use(express.static("./client/public"));
// app.use(express.static(path.join(__dirname, 'client', 'public', 'index.html')));
app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "public", "index.html"))
})

const PORT = 5000;



//express is listening the port for the request
app.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
}); 