//#region IMPORTS
import "./flag.js";
import "./face.js";
//#endregion IMPORTS

//#region TEMPLATE

let template = document.createElement("template");
template.innerHTML = /* html */ `

<style>
    :host {
        overflow: hidden;
    }
    .eyes { 
      grid-area: eyes; 
    }
    .NLFlag { grid-area: NLFlag; }
    .DEFlag { grid-area: DEFlag; }
    .ENFlag { grid-area: ENFlag; }
    .HUFlag { grid-area: HUFlag; }
    .LVAFlag { grid-area: LVAFlag; }
    .PTFlag { grid-area: PTFlag; }
    .ROFlag { grid-area: ROFlag; }
    .text { 
      grid-area: text; 
      display: flex;
      justify-content: center;
      align-items: center;
      font-size: 40pt;
      font-family: "Lobster";
    }
    .grid-container{
      display: grid;
      grid-template-areas:
      'NLFlag  eyes eyes eyes eyes ROFlag'
      'DEFlag  eyes eyes eyes eyes PTFlag'
      'HUFlag  text text text text LVAFlag';
      gap: 10px;
      background-color:transparent;
      padding: 10px;
    }
    td {
      border:  15px  solid white;
      padding : 0px;
      margin:  0px;
      border-radius: 10px;
    }
</style>

<audio><source type="audio/mp3"></audio>
<div class="grid-container">
  <face-ʤ class="eyes"></face-ʤ>
  <flag-ʤ class="NLFlag" svg="NL"></flag-ʤ>
  <flag-ʤ class="ROFlag" svg="RO"></flag-ʤ>
  <flag-ʤ class="LVAFlag" svg="LVA"></flag-ʤ>
  <flag-ʤ class="PTFlag" svg="PT"></flag-ʤ>
  <flag-ʤ class="HUFlag" svg="HU"></flag-ʤ>
  <flag-ʤ class="DEFlag" svg="DE"></flag-ʤ>
  <h1 class="text">Hello dear guests</h1>
</div>


<!--<table width="100%">
    <tr>
        <th colspan="6" id="text">
            <div id="welcome">Hello dear guests</div>
        </th>
    </tr>
    <tr>
      <td></td>
      <td colspan="4">
        <face-ʤ></face-ʤ>
      </td>
      <td></td>
    </tr>
    <tr>
      <td  width="900"  height="400">
        <flag-ʤ svg="NL"></flag-ʤ>
      </td>
      <td width="900"  height="400">
        <flag-ʤ svg="HU"></flag-ʤ>
      </td>
      <td  width="900"  height="400">
        <flag-ʤ svg="LVA"></flag-ʤ>
      </td>
      <td id="AU"  width="900"  height="400">
        <flag-ʤ svg="DE"></flag-ʤ>
      </td>
      <td  width="900"  height="400">
        <flag-ʤ svg="PT"></flag-ʤ>
      </td>
      <td  width="900"  height="400">
        <flag-ʤ svg="RO"></flag-ʤ>
      </td>
        <!--
        <td  id="UK" width="900"  height="780"  >
             <flag-ʤ svg="the_United_Kingdom"></flag-ʤ>
        </td>
        -->
        <!--
    </tr>
</table>-->
`;
//#endregion TEMPLATE

//#region CLASS
window.customElements.define(
  "eudres-ʤ",
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: "open" });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.$flags = this._shadowRoot.querySelectorAll('flag-ʤ');
      this.socket = new WebSocket("ws://essadji.be:2105");
      this.addEventListener("move", (e) => {
        this.socket.send(JSON.stringify({ payload: "move", target: e.detail.source, x: e.detail.valueX, y: e.detail.valueY }));
      });
      this.$audio = this._shadowRoot.querySelector('audio');
      this.texts = {
        "EN": "Hello dear guests",
        "NL": "Hallo lieve gasten uit België",
        "HU": "Kedves magyar vendégeink Hungáriából",
        "LVA": "Esiet sveicināti, mīļie viesi no Latvijas",
        "DE": "Hallo liebe Gäste aus Österreich",
        "PT": "Olá queridos convidados de Portugal",
        "RO": "Bună ziua, dragi oaspeți din România"
      };
      this.$welcome = this._shadowRoot.querySelector('.text');
      this.$eyes = this._shadowRoot.querySelector(".eyes");
    }
    setMedia(_) {
      this.$audio.src = `../media/${_}.mp3`;
      this.$audio.play();
      this.$welcome.innerHTML = this.texts[_];
    }
    connectedCallback() {
      this.$flags.forEach((flag) => {
        flag.addEventListener(('click'), () => {
          let code = flag.getAttribute('svg');
          let country = code;
          // console.log(country);
          this.setMedia(code)
        })
      });
      this.$welcome.addEventListener('click', () => {
        this.setMedia('EN');
      })
      this.socket.addEventListener("open", (event) => {
        // console.log("opening socket for controller ...")
        this.socket.send(JSON.stringify({ payload: "Hello server, I will be your controller today." }));
      });
      this.socket.addEventListener("message", (event) => {
        // console.log('Message from server ', event.data);
      });
      this.$eyes.addEventListener('click', () => {

        if (this.requestFullscreen)
          this.requestFullscreen().catch((err) => {
            alert(`Error attempting to enable full-screen mode: ${err.message} (${err.name})`);
          });
      }
      )
    }

    handler(e) {
      this.socket.send(JSON.stringify({ payload: e.target.id }));
    }

    set content(x) {
      this.$content.innerHTML = x;
    }
  }
);
//#endregion CLASS
