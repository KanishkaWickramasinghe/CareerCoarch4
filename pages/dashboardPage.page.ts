import { expect, Locator, Page } from "@playwright/test";
import { it } from "node:test";

export class DashboardPage{
    readonly page:Page;
    readonly lbl_CareerCoach:Locator;
    readonly lbl_cardText:Locator;
    readonly btn_menuItem:Locator;
    readonly btn_logout:Locator;
    readonly dropdown_logout:Locator;
    

    constructor(page:Page){
        this.page=page;
        this.lbl_CareerCoach=page.locator(".container .navbar-brand");
        this.lbl_cardText=page.locator(".card-body h5");
        this.btn_menuItem=page.locator("#navbarNav a");
        this.btn_logout=page.locator(".dropdown-item");
        this.dropdown_logout=page.locator("#navbarDropdown")
    }

    

    async verifyPageBannerDisplay(banner:string){
        const pageBanner=this.lbl_CareerCoach;
        return pageBanner.textContent;
        await expect(pageBanner).toBeVisible();
        console.log("---------- Banner header displayed------------");
        await expect(pageBanner).toHaveText(banner);
        console.log("---------- Banner text contains "+banner+"-----------")
    }

    async verifyDahboarCardsCount(){
        const countOfCards=this.lbl_cardText.count()
        expect(countOfCards).toEqual(4)
    }

    async verifyDisplayedDisplayOfCardText(text:string){
        for(const item of await this.lbl_cardText.all()){
            const caseCardText=await item.textContent()
            if(caseCardText==text){
                console.log("-------- Displayed Case card text : "+caseCardText+" ---------")
                expect(item).toHaveText(text)
            }
        }
    }

    async navigateToMenuItem(menuButtonText:string){
        for(const item of await this.btn_menuItem.all()){
            const buttonTxt=await item.textContent()
            if(buttonTxt==menuButtonText){
                await item.click();
            }
        }
    }


    async logoutFromSystem(){
        const logoutDropDown=this.dropdown_logout;
        await logoutDropDown.click()
        const logoutBtn=this.btn_logout;
        await logoutBtn.click()
    }

}