import { expect, Locator, Page } from "@playwright/test";

export class DashboardPage{
    readonly page:Page;
    readonly lbl_CareerCoach:Locator;
    readonly lbl_cardText:Locator;
    

    constructor(page:Page){
        this.page=page;
        this.lbl_CareerCoach=page.locator(".container .navbar-brand");
        this.lbl_cardText=page.locator(".card-body h5");
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
        const totCaseCardText=this.lbl_cardText
        for(const item of await this.lbl_cardText.all()){
            const caseCardText=await item.textContent()
            if(caseCardText==text){
                console.log("-------- Displayed Case card text : "+caseCardText+" ---------")
                expect(item).toHaveText(text)
            }
        }
    }

}