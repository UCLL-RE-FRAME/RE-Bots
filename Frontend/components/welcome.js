//region IMPORTS
import "./face.js";

//endregion IMPORTS

//region TEMPLATE
const template = document.createElement("template");
template.innerHTML = /*HTML*/ `
<link href="../Components/style.css" rel="stylesheet" type="text/css">  
<div id="main">
	<img id="welcomeLogo" class="dsLogo"src="../images/DiSo.svg" alt="digital solutions logo"/>
    <div id="face-wel" >
        <face-ʤ class="eyes"></face-ʤ>
    </div>
    <div id="greetingsContainer">
		<div class="greeting">
			<h1 id="greeting">Hi, I am James. How can I be of service?</h1>
		</div>
		<div id="redirectBtns"> 
			<button id="projects"><span class="arrows">&#9656;</span>Projects and Events</button>
			<button id="guides"><span class="arrows">&#9656;</span> Guided Tours</button>
		</div>
    </div>
</div> 
`;
//endregion TEMPLATE

//region CLASS
window.customElements.define(
	"welcome-ɠ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowroot = this.attachShadow({ mode: "open" });
			this._shadowroot.appendChild(template.content.cloneNode(true));

			this.$mainwel = this._shadowroot.getElementById("main");
			this.$projects = this._shadowroot.getElementById("projects");
			this.$guides = this._shadowroot.getElementById("guides");
		}

		connectedCallback() {
			this.$mainwel.addEventListener("click", () => {
				this.requestFullscreen();
			});
			this.$projects.addEventListener("click", () => {
				window.location.href = "http://localhost:3000/beurs";
			});

			this.$guides.addEventListener("click", () => {
				window.location.href = "http://localhost:3000/james";
			});
		}
	}
);
//endregion CLASS
