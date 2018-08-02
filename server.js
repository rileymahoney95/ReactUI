const express = require("express");
const path = require("path");

const port = process.env.PORT || 4201;
const app = express();
const cors = require("cors");

app.use(express.static("public"));
app.use(cors({ credentials: true, origin: true }));

app.get("/config", (req, res) => {
  res.send(process.env.config);
});

app.get("*", function(req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(port, () => {
  console.log(`listening on ${port}`);
});