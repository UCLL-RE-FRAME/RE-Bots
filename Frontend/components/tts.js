window.customElements.define(
	"tts-Ƅ",
	class extends HTMLElement {
		style;

		#boxSize = 80;

		constructor() {
			super();

			this.form = document.createElement("form");
			this.form.id = "tts_form";
			this.form.innerHTML = `
			<div class="brand-title">
      		<label>TEXT-TO-SPEECH</label> 
			  </div>
			<input type="text" name="message" autocomplete="off"/>
      		<br/>
      		<button type="submit">SEND</button>
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
                height: 110px;
				width:80%;
				background: #ecf0f3;
  				box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
            }
		  
			#tts_form {
			    padding: 1rem;
			}
			input[type=text]{
				padding-left:10%;
			}
			input::placeholder {
				color: gray;
			  }
			input {
				margin-top:10px;
				background: #ecf0f3;
				padding-left: 30%;
				height: 2em;
				font-size: 12px;
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
				background: #002757;
				height: 1.5em;
				border-radius: 20px;
				cursor: pointer;
				font-weight: 900;
				font-size: larger;
				box-shadow: 6px 6px 6px #cbced1, -6px -6px 6px white;
				transition: 0.5s;
				margin-top: -0.5em;
			  }
			  
			  button:hover {
				box-shadow: none;
			  }
			  .brand-title {
				margin-top: -5px;
				font-weight: 900;
				font-size: 0.9rem;
				color: #e00049;
				letter-spacing: 1px;
			  }
			  
		`;

			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.appendChild(this.form);
			this._shadowroot.appendChild(this.style);
			this.$button = this._shadowroot.querySelector("button");
			this.$text = this._shadowroot.querySelector("input");
			this.$button.addEventListener("click", () => {
				this.dispatchEvent(
					new CustomEvent(this.id, {
						bubbles: true,
						composed: true,
						detail: {
							message: this.$text.value,
						},
					})
				);
			});
			// this.form.addEventListener('submit', this.logSubmit.bind(this));
		}
		/*
    logSubmit(event) {
        event.preventDefault();
        const formData = new FormData(this.form);
        let message = "";
        for (const [key, value] of formData) {
            message = value
        }
        this.form.reset();

        this.dispatchEvent(new CustomEvent(this.id, {
            bubbles: true,
            composed: true,
            detail: {
                "message": message
            }
        }));
    }
*/
	}
);
