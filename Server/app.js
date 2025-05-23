// 'use strict';

// let fs = require('fs');
// const X = require('express');
import dotenv from "dotenv";
import express from "express";
import path from "path";
dotenv.config();


// const dirname = path.dirname(new URL(import.meta.url).pathname);
const APP = express();
APP.locals.meta = process.env.VERSION;
// FRONTS
APP.use("/james", express.static("./Interfaces/JAMES/"));
APP.use("/ui", express.static("./Interfaces/UI"));
APP.use("/advanced", express.static("./Interfaces/VIEW"));
APP.use("/eudres", express.static("./Interfaces/EUDRES"));
APP.use("/beurs", express.static("./Interfaces/UNLOCKED"));
APP.use("/welcome", express.static("./interfaces/WELCOME"));
// PARTS
APP.use("/components", express.static("../Frontend/components"));
APP.use("/data", express.static("./data"));
APP.use("/media", express.static("./media"));
APP.use("/images", express.static("./images"));
APP.use("/util", express.static("./util"));

// Let's create the regular HTTP request and response
APP.get("/", (req, res) => {
	let t = Date();
	res.send(
		`${t} ::: checking for signs of life from version ${req.app.locals.meta}`
	);
	// fs.createReadStream('./index.html').pipe(res);
});

APP.post("/", express.json(), (req, res) => {
	// let message = req.body.message;
	return res.json({
		answer: 42,
	});
});

export default APP;
