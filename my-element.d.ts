import { LitElement } from 'lit';
interface ListData {
    score: Number;
    show: {
        averageRuntime: Number;
        dvdCountry: string | null;
        ended: string | null;
        externals: {
            imdb: string;
            thetvdb: 417772;
            tvrage: null;
        };
        genres: string[];
        id: Number;
        image: {
            medium: string;
            original: string;
        };
        language: string;
        name: string;
        network: string | null;
        officialSite: string | null;
        premiered: string;
        rating: {
            average: Number;
        };
        runtime: string | null;
        schedule: {
            days: string[];
        };
        status: string;
        summary: string;
        type: string;
        updated: Number;
        url: string;
        webChannel: {
            country: string | null;
            id: Number;
            name: string;
            officialSite: string;
        };
        weight: Number;
        _links: {
            nextepisode: {
                href: string;
            };
            self: {
                href: string;
            };
        };
    };
}
export declare class MyElement extends LitElement {
    static styles: import("lit").CSSResult;
    name: string;
    listItems: ListData[];
    stringToHTML: (str: string) => HTMLElement;
    render(): import("lit-html").TemplateResult<1>;
    changeName(event: Event): void;
}
declare global {
    interface HTMLElementTagNameMap {
        'my-element': MyElement;
    }
}
export {};
//# sourceMappingURL=my-element.d.ts.map