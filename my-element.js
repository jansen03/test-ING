var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { LitElement, html, css } from 'lit';
import { customElement, property } from 'lit/decorators.js';
let MyElement = class MyElement extends LitElement {
    constructor() {
        super(...arguments);
        this.name = 'Jansen';
        this.listItems = [];
        this.stringToHTML = function (str) {
            var parser = new DOMParser();
            var doc = parser.parseFromString(str, 'text/html');
            return doc.body;
        };
    }
    render() {
        return html `
      <div class=input-div>
        <input @input=${this.changeName} placeholder="Search Show">
      </div>
      <div class=main-container>
        ${this.listItems.map((show) => {
            return html `
          <div class=show-main-div>
            <div>
              <img src=${show.show.image.medium} alt=${show.show.name} class=poster>
            </div>
            <div class=show-details>
              <div><h1>${show.show.name}</h1></div>
              <div><label>Rating: ${show.show.rating.average}</label></div>
              <div class=show-description>Description: ${show.show.summary !== "null" ? this.stringToHTML(show.show.summary) : ''}</div>
            </div>
          </div>`;
        })}
     </div>
    `;
    }
    changeName(event) {
        const input = event.target;
        this.name = input.value;
        fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`).then(response => {
            return response.json();
        }).then((data) => {
            this.listItems = data;
        }).catch(error => {
            console.log(error);
        });
    }
};
MyElement.styles = css `
  .input-div {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 20px;

  }
  .show-main-div {
    border: 1px solid black;
    display: flex;
    margin: 50px;
    height: 300px;
    width:40%;
    flex: 1;
  }
  .show-details {
    margin: 10px;
  }
  .main-container {
    display: flex
    overflow: none;
  }
  .poster {
    height: 300px;
  }
  .show-description {
    overflow: hidden;
    text-overflow: ellipsis;
    max-height: 180px
  }
`;
__decorate([
    property()
], MyElement.prototype, "name", void 0);
__decorate([
    property({ attribute: false })
], MyElement.prototype, "listItems", void 0);
MyElement = __decorate([
    customElement('my-element')
], MyElement);
export { MyElement };
//# sourceMappingURL=my-element.js.map