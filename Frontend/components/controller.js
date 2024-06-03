import "./joystick.js";
import "./tts.js";
import "./quote.js";
import "./soundboard.js";
import "./json.js";
import "./mapview.js";
import "./slider.js";

const height = 75;
const width = 75;
const boxSize = 80;

const html = `
<!-- Grid Column 1-->
    <div class="quote">
        <quote-Ƅ id="quote"></quote-Ƅ>
    </div>
	<div class="velocity">
		<div class="sliderPanel">
			<slider-Ƅ id="force" min="0" max="200" start="100"></slider-Ƅ>
			<!-- <slider-Ƅ id="speed" min="0" max="200" start="100"></slider-Ƅ> -->
		</div>
	</div>
	<button id="pref"><a href="#">Preferences</a></button>
    
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

    <!--
    <div class="map">
        <map-Ƅ id="map"></map-Ƅ>
    </div>
    <div class="echo">
        <json-Ƅ id="json"></json-Ƅ>
    </div>

    -->
`;

const style = document.createElement("style");
style.textContent = `
    :host {
        background-color: #ecf0f3;
        box-sizing: border-box;
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        grid-template-rows: repeat(4,1fr);
        place-items: center;
        height: 89vh;
        width: 99vw;

        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
    }
    .quote {
        position: relative;
        grid-column: 1;
        grid-row: 1/5;
        width: 100%;
        height: 65%;
		margin-top: -45%;
    }
    .velocity {
        position: relative;
        grid-column: 1;
        grid-row: 4;
        width: 100%;
        height: 120%;
		margin-top: -1.8em;
    }

    .move {
        position: relative;
        grid-column: 2;
        grid-row: 1/4;
        width: 100%;
        height: 100%;
        margin-top: -4em;
    }
    .speech {
        position: relative;
        grid-column: 2;
        grid-row: 4/5;
        width: 100%;
        height: 120%;
        margin-top: -2em;
    }
    .tempo {
        position: relative;
        grid-column: 1;
        grid-row: 2;
        width: 100%;
        height: 100%;
    }
    
    .echo {
        position: relative;
        grid-column: 2;
        grid-row: 4;
        width: 100%;
        height: 100%;
    }
    .sound {
        position: relative;
        grid-column: 3;
        grid-row: 1/4;
        width: 100%;
        height: 110%;
		margin-top: 2.4em;
    }
    .sliderPanel{
        box-sizing: border-box;
        position: absolute;
        aspect-ratio: 1/1;
        background: #ecf0f3;
        box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
        border-radius: 20px;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        height: 80%;
        width: 80%;
        /* height: ${boxSize}%; */
        padding-left: 10%;
        padding-top:2%
    }
	#pref {
		margin-top: 10px;
		background: #e00049;
		height: 2.5em;
		width: 80%;
		border-radius: 20px;
		cursor: pointer;
		font-weight: 600;
		font-size: larger;
		transition: 0.5s;
		margin-bottom: -2.5em;
	  }
	  #pref a{
		color: #fff;
		width: 100%;
		height: 100%;
		text-decoration: none;
		box-shadow: none;
	}

`;

// Make a variable to hold data for every inputsensor
let movement2d = {x: 0, y: 0};
let tts = {message: ""};
let force = {value: 0};
let speed = {value: 0};
let sounds = {link: ""};
let mapRequest = {key: "map"};
let enableScanning = {mappingConfigurable: true, mappingEnabled: true};
// ----------------------------------------------

window.customElements.define(
	"controller-Ƅ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.innerHTML = html;
			this._shadowroot.appendChild(style);

			this.socket = new WebSocket(`ws://localhost:2105`);
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
				// ---------------------------------------------

				// logPeriodicalInput is used to periodically send the global variable ( logInput(this.socket, <source(id of component)>, <data>, <period(ms)>); )
				// Do this for the continuous inputsensors
				logPeriodicalInput(this.socket, "movement2d", movement2d, 300);
				// --------------------------------------------

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
