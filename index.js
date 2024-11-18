/* index.js */

const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");

//Function to run the backend
function runPythonScript(scriptPath, args, callback) {
	const pythonProcess = spawn("python", [scriptPath].concat(args));

	let data = "";
	pythonProcess.stdout.on("data", (chunk) => {
		data += chunk.toString();
	});

	pythonProcess.stderr.on("data", (error) => {
		console.error(`stderr: ${error}`);
	});

	pythonProcess.on("close", (code) => {
		if (code !== 0) {
			console.log(`Error: Script exited with code ${code}`);
			callback(`Error: Script exited with code ${code}`, null);
		} else {
			return callback(null, data);
		}
	});
}

const express = require("express");
const app = express();

app.use(express.static(__dirname + "/"));
app.set("view engine", "ejs");

const router = express.Router();

//Render the main page
app.get("/", function (req, res) {
	res.send("index.html");
});

//Open the server
const http = require("http").createServer(app);

app.listen(3000, () => {
	console.log("Server is running on port : 3000");
});