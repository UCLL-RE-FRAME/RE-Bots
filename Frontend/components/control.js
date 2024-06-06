//#region IMPORTS
import "./pageSelector.js";
import "./camera.js";
import "./james.js";
import "./emotionControl.js";
import "./slider.js";
//#endregion IMPORTS

//#region TEMPLATE

const pageSelector_template = document.createElement("template");
pageSelector_template.innerHTML = /* html */ `
<link href="../Components/style.css" rel="stylesheet" type="text/css"> 
<style>
:host {
    background-color: var(--base);
    overflow-x: hidden;
}
.sliderPanel {
	box-sizing: border-box;
	background: #ecf0f3;
	box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
	border-radius: 8px;

	height: 90%;
	width: 301px;
	padding-left: 2em;
	padding-top: 0.5em;
}
</style>
<div class="grid-container">
    <page-selector-ɮ></page-selector-ɮ>
    <div class="sliderPanel">
        <slider-Ƅ id="force" min="0" max="200" start="100"></slider-Ƅ>
    </div>
    <div class="sliderPanel">
        <slider-Ƅ id="speed" min="0" max="200" start="100"></slider-Ƅ>
    </div>
    <emotion-control-ɮ id="eye_L"></emotion-control-ɮ>
    <emotion-control-ɮ id="eye_R"></emotion-control-ɮ>
    <face-ʤ></face-ʤ>

    <!--
	<james-ɮ></janmes-ɮ>
    <emotion-control-ɮ id="pupil_L"></emotion-control-ɮ>
    <emotion-control-ɮ id="pupil_R"></emotion-control-ɮ>
	-->
</div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
	"j_con-ɮ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(
				pageSelector_template.content.cloneNode(true)
			);
			this.$interface = this._shadowRoot.getElementById(
				"interface-container"
			);
			this.socket = new WebSocket("ws://essadji.be:2105");
			this.addEventListener("move", (e) => {
				this.socket.send(
					JSON.stringify({
						payload: "move",
						target: e.detail.source,
						x: e.detail.valueX,
						y: e.detail.valueY,
					})
				);
			});
		}

		connectedCallback() {
			this.socket.addEventListener("open", (event) => {
				// console.log("opening socket for controller ...")
				this.socket.send(
					JSON.stringify({
						payload:
							"Hello server, I will be your controller today.",
					})
				);
			});
			this.socket.addEventListener("message", (event) => {
				// console.log('Message from server ', event.data);
			});
		}

		handler(e) {
			this.socket.send(JSON.stringify({payload: e.target.id}));
		}

		set content(x) {
			this.$content.innerHTML = x;
		}
	}
);
//#endregion CLASS
