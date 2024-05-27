//#region TEMPLATE
let template = document.createElement('template');
template.innerHTML = /*html*/`
  <style>
     #abstract {
      margin: auto;
      padding-left: 1em;
      height: 100%;
      font-family: arial;
      max-width: 70vw;
      color: #002757;
     }

     #title {
      padding-left: 1rem;
      color: #e00049;
      font-size: 3em;
      font-weight: bold;
      display:flex;
      align-items: center;
     }

    nav{
      display:flex;
      padding:0px 0px 0px 0px;
      margin: 0px 0px 0px 0px;
      background-color: #002757;   
    }

    #content{
      display:flex;
    }

    #project{
      width: 30vw;
    }
#images{
  display:flex;
  flex-direction:column;
}
#ytLogo{
  width: 150px;
}
  </style>
  <nav>
    <img src="../images/logo.png">
    <div id="title"></div>
    </nav>
    <div id="content">
      <div height="100%" id="abstract">
    </div>
    <div id="images">
      <img id="project"></img>
      <img id="ytLogo" src="../images/yt.png">
    </div>
 </div>
`;
//#endregion TEMPLATE

//region CLASS
window.customElements.define(
  'beurs-ʤ',
  class extends HTMLElement {
    constructor() {
      super();
      this._shadowRoot = this.attachShadow({ mode: 'open' });
      this._shadowRoot.appendChild(template.content.cloneNode(true));
      this.$image = this._shadowRoot.querySelector('#project');
      this.$abstract = this._shadowRoot.querySelector('#abstract');
      this.$youtubeLogo = this._shadowRoot.querySelector('#ytLogo');
      this.$title = this._shadowRoot.querySelector('#title');
    }

    setContent(content) {
      this.$abstract.innerHTML = content.html;
      this.$title.innerHTML = content.title;
      this.$image.src = "../images/"+content.image;
      this.$tube = content.url;
      if(this.$tube){      this.$youtubeLogo.addEventListener('click',()=>{
        window.location.href = this.$tube;
      })}else {this.$youtubeLogo.hidden=true}
    }

    connectedCallback() {}

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case '':
                
                break;
        }
    }
  }
);
//#endregion CLASS
