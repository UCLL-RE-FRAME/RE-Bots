window.customElements.define(
	"soundboard-Ƅ",
	class extends HTMLElement {
		style;

		#boxSize = 90;

		constructor() {
			super();

			this.div = document.createElement("div");
			this.div.id = "board";
			this.div.innerHTML = `
          <div class="square color1" id="rocky-theme-tune-mp3cut"><a href="#" class="btn blue">rocky</a></div>
          <div class="square color2" id="windows-xp-shutdown"> <a href="#" class="btn blue">shutdown</a></div>
          <div class="square color2" id="awkward-cricket-sound-effect"><a href="#" class="btn blue">silence</a></div>
          <div class="square color1" id="samson-jaah-1"> <a href="#" class="btn blue">samson</a></div>
          <div class="square color1" id="okay-guy"> <a href="#" class="btn blue">okay</a></div>
          <div class="square color2" id="i-have-several-questions"><a href="#" class="btn blue">questions</a></div>
          <div class="square color2" id="ringtone_20"><a href="#" class="btn blue">my name is jef</a></div>
          <div class="square color1" id="tf_nemesis"> <a href="#" class="btn blue">nemesis</a></div>
    `;

			this.style = document.createElement("style");
			this.style.textContent = `
          :host {
              box-sizing: border-box;
              position: absolute;
              aspect-ratio: 1/1;
              background: #ecf0f3;
              box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
              border-radius: 20px;
              top: 50%;
              left: 50%;
              transform: translate(-50%, -50%);
              height: 100%;
				      width: 80%;
          }
          #board {
            display: flex;
            flex-wrap: wrap;
            place-items: center;
            width: 100%;
            height: 100%;
          }
          .square {
            height: 25%;
            width: 50%;
          }
          .color1 {
            display: flex; 
            align-items: center; 
            justify-content: center; 
            text-align: center;
            color:white;
          }
          .color2 {
            display: flex; 
            align-items: center; 
            justify-content: center; 
            text-align: center;
            color:white;
          }
          .btn {
              border-radius: 30px;
              padding: 5px 10px;
              font-size: 20px;
              font-weight: 600;
              text-decoration: none;
              margin-left:10%;
              color: #fff;
              position: relative;
              display: flex;
              width:60%;
              height:60%;
              
              justify-content: center;
              align-items: center;
            }
            
            .btn:active {
              transform: translate(0px, 5px);
              -webkit-transform: translate(0px, 5px);
              box-shadow: 0px 1px 0px 0px;
            }
            
            .blue {
              background-color: #002757;
              box-shadow: 0px 5px 0px 0px #002777;
            }
            
            .blue:hover {
              background-color: #002777;
            }
  `;

			this._shadowroot = this.attachShadow({mode: "open"});
			this._shadowroot.appendChild(this.div);
			this._shadowroot.appendChild(this.style);

			const squares = this._shadowroot.querySelectorAll(".square");

			squares.forEach((square) => {
				square.addEventListener("click", () => {
					this.sendSoundLocation(square.id);
				});
			});
		}

		sendSoundLocation(sound) {
			this.dispatchEvent(
				new CustomEvent(this.id, {
					bubbles: true,
					composed: true,
					detail: {
						link: `https://www.myinstants.com/media/sounds/${sound}.mp3`,
					},
				})
			);
		}
	}
);
