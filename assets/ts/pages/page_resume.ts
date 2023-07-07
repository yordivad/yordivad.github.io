import {PageLanding} from "@lambda/ts/pages/page_landing";
import anime from "animejs";

class PageElement {
    private element: HTMLElement;
    constructor(element: HTMLElement) {
        this.element = element
    }

    show(visible: boolean) {
        if (visible) {

            anime({
                targets: this.element,
                opacity: [0, 1],
                duration: 6000,
                begin: () => {
                    this.element.style.display = "";
                }
            })
        } else  {
            this.element.style.display = "none";
        }
    }

    eventName(): string {
      return   this.element.attributes.getNamedItem("event")?.value ?? ""
    }

    onClick(fn: () => void) {
        this.element.onclick = fn;
    }
}


export class PageResume {

    constructor() {
    }

    public  load() {

        let menus = Array.from(document.querySelectorAll("span[event]")).map(c => new PageElement(c as HTMLElement));
        let articles = Array.from(document.querySelectorAll("article[event]")).map(c => new PageElement(c as HTMLElement))

        menus.forEach( m => {
            articles.forEach(a => {

                let s = m as PageElement;

                if (m.eventName() == a.eventName()) {
                    m.onClick(() => {
                        articles.forEach(c=> c.show(false))
                        a.show(true)
                    })
                }
            })

        })



        console.log(articles)

        articles.forEach(a => {
          //  a.style.display = "none";
        });
    }

}