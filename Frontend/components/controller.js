//region IMPORTS
import "./joystick.js";
import "./tts.js";
import "./quote.js";
import "./soundboard.js";
import "./json.js";
import "./mapview.js";
import "./slider.js";
//endrgion IMPORTS

//region GLOBAL VARIABLES
const height = 75;
const width = 75;
const boxSize = 80;
//endregion GLOBAL VARIABLES

//region TEMPLATE
const template = document.createElement("template");
template.innerHTML = /* HTML */ `
	<link href="../Components/style.css" rel="stylesheet" type="text/css" />
	<style>
		:host {
			background-color: #ecf0f3;
			box-sizing: border-box;
			display: grid;
			grid-template-columns: repeat(3, 1fr);
			grid-template-rows: repeat(5, 1fr);
			place-items: center;
			height: 100%;
			width: 99vw;
		}
		.sliderPanel {
			box-sizing: border-box;
			position: absolute;
			aspect-ratio: 1/1;
			background: #ecf0f3;
			box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
			border-radius: 20px;
			top: 50%;
			left: 50%;
			transform: translate(-50%, -50%);
			height: 110px;
			width: 80%;
			/* height: ${boxSize}%; */
			padding-left: 10%;
			padding-top: 2%;
		}
	</style>

	<!-- Grid Column 1-->
	<div class="quote">
		<quote-Ƅ id="quote"></quote-Ƅ>
	</div>
	<div class="velocity">
		<div class="sliderPanel">
			<slider-Ƅ id="force" min="0" max="200" start="100"></slider-Ƅ>
		</div>
	</div>

	<!-- Grid Column 2-->
	<div class="move">
		<joystick-Ƅ id="movement2d"></joystick-Ƅ>
	</div>
	<div class="speech">
		<tts-Ƅ id="tts"></tts-Ƅ>
	</div>

	<!-- Grid Coliumn 3-->
	<div class="sound">
		<soundboard-Ƅ id="sounds"></soundboard-Ƅ>
	</div>
	<div class="pref-nav">
		<button id="pref">Preferences</button>
	</div>
`;
//endregion TEMPLATE

//region CLASS
let movement2d = {x: 0, y: 0};
let tts = {message: ""};
let force = {value: 0};
let speed = {value: 0};
let sounds = {link: ""};
let mapRequest = {key: "map"};
let enableScanning = {mappingConfigurable: true, mappingEnabled: true};

window.customElements.define(
	"controller-ɠ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.appendChild(template.content.cloneNode(true));

			this.socket = new WebSocket(`ws://localhost:2105`);
			this.$pref = this._shadowroot.querySelector("#pref");
		}

		connectedCallback() {
			this.socket.addEventListener("message", (event) => {
				let incoming;
				console.dir(event);
				try {
					incoming = JSON.parse(event.data);
				} catch (error) {
					console.warn("PAYLOAD ERROR");
					console.dir(error);
					incoming = {payload: "illegal payload"};
				}
				this.sendJsonData(incoming);
				// Send json data to component with id = source
			});

			this.socket.addEventListener("open", (event) => {
				console.log("opening socket for controller ...");
				this.socket.send(
					JSON.stringify({payload: `controller-connected`})
				);

				// Add event listeners for every continuous input sensor
				this.addEventListener("movement2d", (e) => {
					movement2d.x = e.detail.x;
					movement2d.y = e.detail.y;
				});

				// logPeriodicalInput is used to periodically send the global variable ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
				// Do this for the continuous inputsensors
				logPeriodicalInput(this.socket, "movement2d", movement2d, 300);

				// Add event listeners for every single fire inputsensor
				this.addEventListener("tts", (e) => {
					tts.message = e.detail.message;
					let message = {payload: "mqtt", source: "tts", data: tts};
					this.socket.send(JSON.stringify(message));
				});
				this.addEventListener("force", (e) => {
					force.value = e.detail.value;
					let message = {
						payload: "mqtt",
						source: "force",
						data: force,
					};
					this.socket.send(JSON.stringify(message));
				});
				this.addEventListener("speed", (e) => {
					speed.value = e.detail.value;
					let message = {
						payload: "mqtt",
						source: "speed",
						data: speed,
					};
					this.socket.send(JSON.stringify(message));
				});
				this.addEventListener("sounds", (e) => {
					sounds.link = e.detail.link;
					let message = {
						payload: "mqtt",
						source: "sounds",
						data: sounds,
					};
					this.socket.send(JSON.stringify(message));
				});
				this.addEventListener("mapRequest", () => {
					let message = {
						payload: "mqtt",
						source: "mapRequest",
						data: mapRequest,
					};
					this.socket.send(JSON.stringify(message));
				});
				this.addEventListener("enableScanning", () => {
					let message1 = {
						payload: "mqtt",
						source: "enableMapping",
						data: {},
					};
					this.socket.send(JSON.stringify(message1));
					let message = {
						payload: "mqtt",
						source: "enableScanning",
						data: enableScanning,
					};
					this.socket.send(JSON.stringify(message));
				});
				// ---------------------------------------------
			});

			this.$pref.addEventListener("click", () => {
				window.location.href = "http://localhost:2105/ui";
			});
		}

		sendJsonData(json) {
			console.log(json);
			let dest = json.destination;
			let data = json.data;
			this.dispatchEvent(
				new CustomEvent("jsonData", {
					bubbles: true,
					composed: true,
					detail: {
						data: data,
					},
				})
			);
		}
	}
);

const logPeriodicalInput = (socket, source, data, interval) => {
	setInterval(() => {
		socket.send(
			JSON.stringify({payload: "mqtt", source: source, data: data})
		);
	}, interval);
};
//endregion CLASS
