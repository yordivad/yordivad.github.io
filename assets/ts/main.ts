
import { PageLanding } from "@lambda/ts/pages/page_landing"
import { PageResume } from "@lambda/ts/pages/page_resume";

import "@lambda/css/app.scss"

export class App {
    constructor() {
    }
    CreateLanding() {
        return new PageLanding()
    }

    CreateResume() {
        return new PageResume()
    }
}

window.addEventListener("load",()=> {
    let app = new App();
    const event = new CustomEvent("app.load", {
        detail: app
    });
    window.dispatchEvent(event)
})