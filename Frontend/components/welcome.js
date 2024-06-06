//region IMPORTS
import "./face.js";
//endregion IMPORTS
//region TEMPLATE
let template = document.createElement("template");
template.innerHTML = /*HTML*/ `
<link href="../Components/style.css" rel="stylesheet" type="text/css">  
<div id="main">
    <div id="face-wel" > 
        <face-ʤ class="eyes"></face-ʤ>
    </div>
    <div id="greetingsContainer">
        <h1 id="greeting">Hi! I'm James, welcome to UCLL!</h1>
        <h2 id="underGreeting">&#9758; Touch the screen to contiunue &#9756;</h2>
    </div>
</div> 
`;
//endregion TEMPLATE
//region CLASS
window.customElements.define(
	"welcome-ʤ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.appendChild(template.content.cloneNode(true));
			this.$face = this._shadowroot.querySelector("face-ʤ");
			this.$mainwel = this._shadowroot.querySelector("#main");
			this.$greetingsContainer =
				this._shadowroot.getElementById("greetingsContainer");
			this.$greeting = this._shadowroot.getElementById("greeting");
			this.$underGreeting =
				this._shadowroot.getElementById("underGreeting");
		}

		connectedCallback() {
			this.$mainwel.addEventListener("click", () => {
				if (!document.fullscreenElement) {
					this.requestFullscreen();
				} else {
					window.location.href = "http://localhost:2105/beurs";
				}
			});
		}
	}
);
//endregion CLASS
