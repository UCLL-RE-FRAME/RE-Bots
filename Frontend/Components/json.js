window.customElements.define('json-Ƅ', class extends HTMLElement {

    style;

    #boxSize = 80;

    constructor() {
        super();

        this.div = document.createElement('div');
        let p = document.createElement('p');
        p.innerHTML = "JSON output"
        this.div.appendChild(p)
        this.div.id = "json-display";

        this.style = document.createElement('style');
        this.style.textContent = `
            :host {
                box-sizing: border-box;
                position: relative;
                color:  #9fdaf9;
                background: #ecf0f3;
                box-shadow: 14px 14px 20px #cbced1, -14px -14px 20px white;
                border-radius: 20px;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                
                width:80%;
                overflow: scroll;
            }
            #json-display {
                /* font-weight:bold; */
            }
		`;

        this._shadowroot = this.attachShadow({ mode: 'open' });
        this._shadowroot.appendChild(this.div);
        this._shadowroot.appendChild(this.style);

        this.addEventListener("jsonData", (e) => {
            const data = JSON.parse(e.detail.data);
            clearOutput(this.div);
            displayJsonData(data, this.div);
        });

    }

});

const displayJsonData = (data, container) => {
    const ul = document.createElement("ul");
    container.appendChild(ul);

    for (const key in data) {
        const li = document.createElement("li");
        const span = document.createElement("span");
        span.textContent = key + ": ";
        li.appendChild(span);
        ul.appendChild(li);

        if (typeof data[key] === "object") {
            displayJsonData(data[key], li);
        } else {
            const value = document.createElement("span");
            value.textContent = data[key];
            li.appendChild(value);
        }
    }
}

const clearOutput = (element) => {
    element.innerHTML = "";
}