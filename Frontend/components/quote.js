window.customElements.define(
	"quote-Ƅ",
	class extends HTMLElement {
		style;
		buttons = [
			"euhm ...",
			"daar moet ik even over nadenken",
			"ab soo luut !",
		];
		// #boxSize = 80;
		redraw() {
			this.$text.value = "";
			console.dir(this._shadowroot.querySelector("#quotes").innerHTML);
			this._shadowroot.querySelector("#quotes").innerHTML = "";
			console.dir(this._shadowroot.querySelector("#quotes").innerHTML);
			this.buttons.forEach((b) => {
				let x = document.createElement("button");
				x.innerHTML = b;
				x.classList.add("q");
				this._shadowroot.querySelector("#quotes").appendChild(x);
				x.addEventListener("click", () => {
					this.dispatchEvent(
						new CustomEvent("tts", {
							bubbles: true,
							composed: true,
							detail: {
								message: this.$text.value,
							},
						})
					);
				});
			});
		}
		constructor() {
			super();

			this.form = document.createElement("div");
			this.form.id = "form";
			this.form.innerHTML = `
			<div class="brand-title">
      		<label>QUOTES</label> 
			  </div>
			<input type="text" name="message" autocomplete="off"/>
      		<br/>
      		<button id="add">ADD</button>
			<br/>
			<hr>
			<br/>
			<div id="quotes"></div>
    	`;

			this.style = document.createElement("style");
			this.style.textContent = `
			:host {
                box-sizing: border-box;
                position: absolute;
                
                border-radius: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                height: 98%;
				width: 80%;
				background: #ecf0f3;
  				box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
            }
		  
			#form {
			    padding: 1rem;

			}
			input[type=text]{
				padding-left:10%;
			}
			input::placeholder {
				color: gray;
			  }
			input {
				margin-top:25px;
				background: #ecf0f3;
				padding: 10px;
				padding-left: 30%;
				height: 50px;
				font-size: 14px;
				border-radius: 50px;
				box-shadow: inset 6px 6px 6px #cbced1, inset -6px -6px 6px white;
			  }
			  label, input, button {
				display: block;
				width: 100%;
				padding: 0;
				border: none;
				outline: none;
				box-sizing: border-box;
			  }
			  button {
				color: white;
				margin-top: 10px;
				background: #002757;
				height: 80px;
				border-radius: 20px;
				cursor: pointer;
				font-weight: 900;
				font-size: larger;
				box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
				transition: 0.5s;
			  }
			  .q {
				height: 50px;
				font-weight: 500;
				font-style: italic;
				background: #e00049;
			  }
			  
			  button:hover {
				box-shadow: none;
			  }
			  .brand-title {
				margin-top: 10px;
				font-weight: 900;
				font-size: 1.3rem;
				color: #e00049;
				letter-spacing: 1px;
			  }
			  
		`;

			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.appendChild(this.form);
			this._shadowroot.appendChild(this.style);

			this.$button = this._shadowroot.querySelector("#add");
			this.$text = this._shadowroot.querySelector("input");
			this.$button.addEventListener("click", () => {
				if (this.$text.value) {
					this.buttons.push(this.$text.value);
					this.redraw();
				} else {
					console.log("no text");
				}
			});
			// this.form.addEventListener('submit', this.logSubmit.bind(this));
			this.redraw();
		}
	}
);
