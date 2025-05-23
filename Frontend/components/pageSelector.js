//#region IMPORTS
import "./toggle.js";
//#endregion IMPORTS

//#region TEMPLATE
const emotion_control_template = document.createElement("template");
emotion_control_template.innerHTML = /* html */ `
<link href="../Components/style.css" rel="stylesheet" type="text/css">  

<div class="pageSelector">
<div class="selector-container">
	<button id="mainControl" class="gridItem">Control Center</button>
    <button id="btnInterface" class="gridItem">Show Interface</button>
    <button id="btnFace" class="gridItem">Show James</button>

    <select id="dropDown" class="gridItem">
        <option value="../images/toren.jpg">Toren</option>
        <option value="../images/panorama.png" selected>Panorama</option>
    </select>
	
	<div id="loginForm" class="gridItem">
        <button id="btnLogin">Login</button>
        <input type="text" id="user" placeholder="    Naam"/>
        <input type="text" id="program" placeholder="    Opleiding"/>
    </div>
	<div id="ipForm" class="gridItem">
		<button type="button" id="setIpBtn">Set IP</button>
		<input type="text" id="ipAddress" name="ip" placeholder="    Change IP-address"/>
	</div>
	</div>
</div>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
	"page-selector-ɮ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({ mode: "open" });
			this._shadowRoot.appendChild(
				emotion_control_template.content.cloneNode(true)
			);
			this.$test = this._shadowRoot.querySelectorAll("button");
			this.socket = new WebSocket("ws://essadji.be:2105");
			this.$select = this._shadowRoot.querySelector("select");
			this.$ipInput = this._shadowRoot.getElementById("ipAddress");
			this.$setIpBtn = this._shadowRoot.getElementById("setIpBtn");
			this.$control = this._shadowRoot.getElementById("mainControl");
		}

		connectedCallback() {
			this.$select.addEventListener("change", this.backer.bind(this));

			this.$test.forEach((x) => {
				x.addEventListener("click", this.handler.bind(this));
			});

			//IP Setter --> to review
			this.$setIpBtn.addEventListener("click", () => {
				this.socket.send(
					JSON.stringify({ payload: this.$ipInput.value })
				);
				console.log("mqtt://" + this.$ipInput.value);
			});

			this.socket.addEventListener("open", (event) => {
				console.log("opening socket for page selector ...");
				this.socket.send(
					JSON.stringify({
						payload:
							"Hello server, I will be swapping pages today.",
					})
				);
			});

			this.$control.addEventListener("click", () => {
				window.location.href = "http://localhost:3000/advanced";
			});
			// this.socket.addEventListener("message", function (event) {
			// 	console.log("Message from server ", event.data);
			// });
		}

		backer(e) {
			console.log("select change!");
			this.socket.send(
				JSON.stringify({
					payload: "selectBackground",
					value: e.target.value,
				})
			);
		}

		handler(e) {
			this.socket.send(
				JSON.stringify({
					payload: e.target.id,
					user: this._shadowRoot.querySelector("#user").value || null,
					programme:
						this._shadowRoot.querySelector("#program").value ||
						null,
				})
			);
		}

		set content(x) {
			this.$content.innerHTML = x;
		}
	}
);
//#endregion CLASS
