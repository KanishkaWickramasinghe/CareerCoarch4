import { expect, Locator, Page } from "@playwright/test";

export class CasesPage{

    readonly lbl_pageBanner:Locator;
    readonly lbl_dismissibleBanner:Locator;
    readonly btn_newCase:Locator;
    
    constructor(page:Page){
        this.lbl_pageBanner=page.locator("//h2");
        this.lbl_dismissibleBanner=page.locator(".alert-dismissible");
        this.btn_newCase=page.locator(".btn.btn-primary");
    }

    async verifyPageBanner(bannerTxt:string){
        const banner=this.lbl_pageBanner
        await expect(banner).toHaveText(bannerTxt)
    }

    async verifyDisplayOfDismissibleBanner(bannerMessage:string){
        const message=this.lbl_dismissibleBanner;
        await expect(message).toHaveText(bannerMessage);
    }

    async navigateToNewCaseForm(){
        const newcaseButton=this.btn_newCase;
        await expect(newcaseButton).toBeVisible();
        await newcaseButton.click();
    }
}