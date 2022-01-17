import fs from "fs";
import path from "path";
import express from "express";

const html = fs.readFileSync(path.resolve("./views/index.html"));

const app = express();

app.get("*", (request, response) => {
	response.end(html);
});

app.listen(3000, () => {
	console.log("Server is listening on port 3000");
});