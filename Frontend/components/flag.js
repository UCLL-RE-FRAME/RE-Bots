//#region IMPORTS

//#endregion IMPORTS

//#region TEMPLATE
let template = document.createElement("template");
template.innerHTML = /*html*/ `
  <body>
  <img />
  </body>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
	"flag-ʤ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this.$img = this._shadowRoot.querySelector("img");
		}

		connectedCallback() {
			//   this.addEventListener("go", (e) => {
			//     // console.log(e); // logs menu button actions
			//     this.$main.setAttribute("showing", e.detail.id);
			//   });
			//   this.$button1.addEventListener("click", () => {
			//     console.log("TEST  HALLO");
			//   });
		}
		static get observedAttributes() {
			return ["svg"];
		}
		attributeChangedCallback(name, oldValue, newValue) {
			switch (name) {
				case "svg":
					console.log(`[FLAG] ${oldValue} => ${newValue}`);
					this.$img.src = `../images/${newValue}.svg`;
					break;
			}
		}
	}
);
//#endregion CLASS
