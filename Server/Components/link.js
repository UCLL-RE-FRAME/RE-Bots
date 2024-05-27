//#region IMPORTS

//#endregion IMPORTS

//#region TEMPLATE
let template = document.createElement("template");
template.innerHTML = /*html*/ `
  <style>
        img{
        width: 16em;
        height: 16em;
        border-radius: 12px;
    }
    /*
    :host { font-family: sans-serif; }  
    */
  </style>
  
  <body>
  <img />
  </body>
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
	"link-ʤ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.content.cloneNode(true));
			this.$img = this._shadowRoot.querySelector("img");
		}

		connectedCallback() {
			this.$img.src = `../images/${this.getAttribute(
				"thumb"
			)}.${this.getAttribute("format")}`;
			// console.log(this.getAttribute("thumb"));
			//   this.addEventListener("go", (e) => {
			//     // console.log(e); // logs menu button actions
			//     this.$main.setAttribute("showing", e.detail.id);
			//   });
			//   this.$button1.addEventListener("click", () => {
			//     console.log("TEST  HALLO");
			//   });
		}
		// static get observedAttributes() {
		//   return ["thumb"];
		// }
		// attributeChangedCallback(name, oldValue, newValue) {
		//   switch (name) {
		//     case "thumb":
		//       console.log(`[FLAG] ${oldValue} => ${newValue}`)
		//       this.$img.src = `../images/${newValue}.jpg`|| `../images/${newValue}.png`;
		//       break;
		//   }
		// }
	}
);
//#endregion CLASS
