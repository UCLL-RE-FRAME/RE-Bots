"use strict";

import * as dotenv from "dotenv";
import APP from "./app.js";
import { WebSocketServer } from "ws";
import * as HTTP from "http";
import * as mqqtUtil from "./mqttUtil/mqtt.js";

// Create web socket server on top of a regular http server
dotenv.config();
let http = HTTP.createServer();
let wss = new WebSocketServer({ server: http });

const PORT = process.env.PORT;
// Also mount the app here
http.on("request", APP);

mqqtUtil.mqttInit();

wss.on("connection", function connection(ws) {
  ws.on("message", function incoming(message) {
    console.log(`received: ${message}`);
    let incoming;
    try {
      incoming = JSON.parse(message);
    } catch (error) {
      console.warn("PAYLOAD ERROR:");
      console.dir(error);
      incoming = { payload: "illegal payload" };
    }
    switch (incoming.payload) {
      case "btnClients":
        console.log(wss.clients);
        //wss.clients.forEach(c => c.send("list requested"))
        break;
      case "btnFace":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "face",
            })
          )
        );
        break;
      case "btnShow":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "slide",
            })
          )
        );
        break;
      case "btnEyes":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "eyes",
            })
          )
        );
        break;
      case "btnFwd":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "forward",
            })
          )
        );
        break;
      case "btnBack":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "back",
            })
          )
        );
        break;
      case "btnInterface":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "interface",
            })
          )
        );
        break;
      case "btnLogin":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "login",
              user: incoming.user,
              programme: incoming.programme,
            })
          )
        );
        break;
      case "move":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "move",
              target: incoming.target,
              x: incoming.x,
              y: incoming.y,
            })
          )
        );
        break;
      case "selectBackground":
        wss.clients.forEach((c) =>
          c.send(
            JSON.stringify({
              payload: "background",
              value: incoming.value,
            })
          )
        );
        break;
      case "controller-connected":
        const remote = ws._socket.remoteAddress.toString();
        console.log(`Incoming controller connection from ${remote.slice(7)}\n`);
        break;
      case "mqtt":
        mqqtUtil.mqttSendJsonMessage(incoming.source, incoming.data);
        break;
      default:
        4;
        console.log(`log: ${incoming.payload}`);
      // ws.send(JSON.stringify({
      //     "payload": incoming.payload
      // }));
    }
  });
  mqqtUtil.messageEmitter.on("messageUpdated", (data) => {
    // Sends a JSON string
    ws.send(data);
  });
});

http.listen(process.env.PORT, () => {
  console.log(
    `about to set up a Node HTTP and WS server on port ${process.env.PORT} ...`
  );
  console.log(">>> \x1b[32mserver up and running\x1b[0m\n");
  console.log(`\x1b[45m  =================  \x1b[0m\n`);
  console.log(`system messages ...`);
});
