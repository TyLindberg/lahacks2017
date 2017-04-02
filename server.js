const express = require("express")
const app = express()
app.use(express.static(process.cwd()))
app.get("/", (req, res) => {
	res.render("index.html")
})
app.listen(3000, () => console.log("Listening on port 3000..."))