import { Page } from "@playwright/test";

export class BasePage{
    page: Page;
     baseURL: string;

    constructor(page:Page,baseURL: string){
        this.page = page;
        this.baseURL = baseURL;
    }
    
    
    async initialize() {
        await this.page.goto(this.baseURL, { timeout: 60000 });
        await this.page.evaluate(() => {
            document.documentElement.requestFullscreen();
            console.log("------------Screen set to fullscreen.------------") 
          });
        await this.page.waitForLoadState("load") 
        console.log("-----------------Site launched successfully.-------------------") 
          
    }
}