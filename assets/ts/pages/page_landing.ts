import { Parallax } from "@lambda/ts/components/parallax";
import { Splide } from '@splidejs/splide';


export class PageLanding {
    private parallax: Parallax;

    constructor() {
        this.parallax = new Parallax(".landing-item", ".trigger")
    }

    load() {
        this.parallax.load();
        this.carousel(document.querySelector(".splide.marley") as HTMLElement).mount();
        this.carousel(document.querySelector(".splide.racoon") as HTMLElement).mount();
        this.carousel(document.querySelector(".splide.studio") as HTMLElement).mount();
    }

    reload() {
        this.parallax.reload();
    }

    carousel(item: HTMLElement) {
        return  new Splide(item, {
            type: "fade",
            rewind: true,
            pagination: true,
            arrows: true,
            gap: 10,

        })
    }
}



