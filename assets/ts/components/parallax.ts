import * as ScrollMagic from "scrollmagic";

 export class Parallax {

     scenes: ScrollMagic.Scene[];
     selector: string;
     trigger: string;

     constructor(selector: string, trigger: string) {
         this.selector = selector;
         this.trigger = trigger;
         this.scenes = [];
     }

     getOffset() {
         let trigger = document.querySelector(this.trigger) as HTMLElement;
         return trigger.offsetTop;
     }

     getScenes(): ScrollMagic.Scene[] {
         let collection = Array.from(document.querySelectorAll(this.selector));
         return collection.map((e: Element) => {
             return new ScrollMagic.Scene({
                 triggerElement: e,
                 offset: this.getOffset()
             }).setPin(e);
         });
     }

     load() {
         let controller = new ScrollMagic.Controller({
             globalSceneOptions: {
                 triggerHook: "onCenter",
                 duration: "80%"
             }
         });

         this.scenes = this.getScenes().map(s => {
             return s.addTo(controller);
         });
     }

     reload() {
         this.scenes = this.scenes.map(s => {
             return s.offset(this.getOffset()).refresh();
         });
     }
 }