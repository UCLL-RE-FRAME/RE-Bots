//region IMPORTS
//endregion IMPORTS
//region TEMPLATE
const template = document.createElement("template");
template.innerHTML = /*HTML*/ `
<link href="../Components/style.css" rel="stylesheet" type="text/css">
<label class="switch">
    <input type="checkbox">
    <span class="slider round"></span>
</label>
 `;
//endregion TEMPLATE

//region CLASS
window.customElements.define(
	"toggle-ɠ",
	class extends HTMLElement {
		constructor() {
			super();
			this._shadowRoot = this.attachShadow({mode: "open"});
			this._shadowRoot.appendChild(template.cloneNode(true));
			this.$switch = this._shadowRoot.querySelector("#switch");
		}
	}
);
//endregion CLASS
