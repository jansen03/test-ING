import {LitElement, html, css} from 'lit';
import {customElement, property} from 'lit/decorators.js';

interface ListData {
  score: Number;
  show: {
    averageRuntime: Number;
    dvdCountry: string | null;
    ended: string| null;
    externals: {
      imdb: string;
      thetvdb: 417772
      tvrage: null
    }
    genres: string[];
    id: Number;
    image: {
      medium: string;
      original: string;
    }
    language: string;
    name: string;
    network: string | null
    officialSite: string |null
    premiered: string;
    rating: {
      average: Number;
    }
    runtime: string | null;
    schedule: {
      days: string[];
    }
    status: string;
    summary: string;
    type: string;
    updated: Number;
    url: string;
    webChannel: {
      country: string | null;
      id: Number;
      name:string;
      officialSite: string;
    }
    weight: Number;
    _links: {
      nextepisode: {
        href: string;
      }
      self: {
        href: string;
      }
    }
  }

}

@customElement('my-element')
export class MyElement extends LitElement {
  static override styles = css`
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

  @property()
  name: string = 'Jansen';

  @property({attribute: false})
  listItems = [] as ListData[];


  stringToHTML = function (str: string) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc.body;
  };

  override render() {
    return html`
      <div class=input-div>
        <input @input=${this.changeName} placeholder="Search Show">
      </div>
      <div class=main-container>
        ${this.listItems.map((show) => {
          return html`
          <div class=show-main-div>
            <div>
              <img src=${show.show.image.medium} alt=${show.show.name} class=poster>
            </div>
            <div class=show-details>
              <div><h1>${show.show.name}</h1></div>
              <div><label>Rating: ${show.show.rating.average}</label></div>
              <div class=show-description>Description: ${show.show.summary !== "null" ? this.stringToHTML(show.show.summary): ''}</div>
            </div>
          </div>`
        })}
     </div>
    `;
  }

  changeName(event: Event) {
    const input = event.target as HTMLInputElement;
    this.name = input.value;
    fetch(`https://api.tvmaze.com/search/shows?q=${input.value}`).then(response => {
      return response.json();
    }).then((data:ListData[]) => {
        this.listItems = data;
    }).catch(error => {
      console.log(error)
    })
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'my-element': MyElement;
  }
}
