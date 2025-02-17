import { Locator, Page } from "@playwright/test";

export class CommonActionsPage{

    page:Page;
    readonly btn_menuItem:Locator;

    constructor(page:Page){
        this.page=page;
        this.btn_menuItem=page.locator("#navbarNav a");
    }


    async navigateToMenuItem(menuButtonText:string){
        for(const item of await this.btn_menuItem.all()){
            const buttonTxt=await item.textContent()
            if(buttonTxt==menuButtonText){
                await item.click();
                console.log("-------- "+buttonTxt+" clicked via menu.---------")
            }
        }
    }
}