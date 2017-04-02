const https = require("https")
const express = require("express")
const bp = require("body-parser")
const app = express()
app.use(express.static(process.cwd()))
app.use(bp.json())
app.get("/", (req, res) => {
	res.render("index.html")
})

app.post("/analyze", (req1, res1) => {
	const url = "https://ussouthcentral.services.azureml.net/workspaces/5ff32ff30ba647a4acb83b194d66957f/services/375c1847319f4089bc9a72e83cf8d321/execute?api-version=2.0&details=true"
	let req = https.request({
		protocol: "https:",
		method: "POST",
		host: "ussouthcentral.services.azureml.net",
		auth: "andrewtgeorge:TNteGfu+GShDpoT4+h2/adTW+S7nomVzL6zqyCGb4YxtfBVcImhANESUs8+DoPDrrwpq04uvcjCLS5TBMND3dQ==",
		path: "/workspaces/5ff32ff30ba647a4acb83b194d66957f/services/375c1847319f4089bc9a72e83cf8d321/execute?api-version=2.0&details=true",
		headers: {"Content-Type": "application/json", "Accept": "application/json"}
	}, res => {
		data = ""
		res.on("data", d => data += d).on("end", () => {
			console.log(req1.body)
			console.log(JSON.parse(data)["Results"]["output1"]["value"]["Values"][0])
			res1.send(JSON.parse(data)["Results"]["output1"]["value"]["Values"][0].pop())
		})
	});	
	req.write(JSON.stringify({ 
                        "GlobalParameters": {},
                        "Inputs": {
                            "input1": {
                                "ColumnNames": [
                                    "label_column",
                                    "text_column"
                                ],
                            "Values": [
                                [
                                    "value",
                                    req1.body["message"]
                                ]
                            ]
                        }
                    }
                }))

	req.end()
})

app.listen(3000, () => console.log("Listening on port 3000..."))