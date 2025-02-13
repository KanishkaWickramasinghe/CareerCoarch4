import { expect, Locator, Page } from "@playwright/test";

export class CaseDetailsPage{
    readonly lbl_caseDetailsBanner:Locator;
    readonly btn_editCase:Locator;
    readonly btn_closeCase:Locator;
    readonly lbl_status:Locator
    readonly lbl_nric:Locator;
    readonly lbl_clientName:Locator;
    readonly lbl_caseDescription:Locator;
    readonly lbl_priority:Locator;

    constructor(page:Page){
        this.lbl_caseDetailsBanner=page.locator("//h3");
        this.btn_editCase=page.locator("//a[text()='Edit Case']");
        this.btn_closeCase=page.locator("//button[@type='submit']");
        this.lbl_status=page.locator("//th[text()='Status:']/following-sibling::td/span");
        this.lbl_nric=page.locator("//th[text()='NRIC:']/following-sibling::td");
        this.lbl_clientName=page.locator("//th[text()='Client Name:']/following-sibling::td");
        this.lbl_caseDescription=page.locator("//h5[text()='Case Description']/following-sibling::div");
        this.lbl_priority=page.locator("//th[text()='Priority:']/following-sibling::td/span");
    }

    async verifyCaseDetailsBanner(banner:string) {
        const bannerTxt=this.lbl_caseDetailsBanner;
        await expect(bannerTxt).toContainText(banner)
        console.log("-------- Case details banner displayed :"+await bannerTxt.textContent()+"-----------")
    }

    async verifyEditAndCloseCaseButtons(){
        const editButton=this.btn_editCase;
        const closeButton=this.btn_closeCase;
        await expect(editButton).toBeVisible()
        await expect(closeButton).toBeVisible()
        console.log("-------- Edit and close case button displayed-----------")
    } 
    
    async verifyEditAndCloseCaseButtonsNotDisplayed(){
        const editButton=this.btn_editCase;
        const closeButton=this.btn_closeCase;
        await expect(editButton).not.toBeVisible()
        await expect(closeButton).not.toBeVisible()
        console.log("-------- Edit and close case button not displayed-----------")
    } 
    async verifyCaseStatus(statusText:string){
        const status=this.lbl_status;
        expect(status).toHaveText(statusText)
        console.log("---------- Status +"+await status.textContent()+"displayed------------")
    }

    async verifyCaseAddedNRIC(nric:string){
        const nricTxt=this.lbl_nric;
        expect(nricTxt).toHaveText(nric);
        console.log("-------- Cilent NRIC displayed: "+await nricTxt.textContent()+"-----------")
    }

    async verifyCaseClientName(name:string){
        const clientName=this.lbl_clientName;
        expect(clientName).toHaveText(name)
        console.log("-------- Cilent name displayed: "+await clientName.textContent()+"-----------")
    }

    async verifyCaseDescription(descriptionText:string){
        const description=this.lbl_caseDescription;
        expect(description).toHaveText(descriptionText)
        console.log("-------- Cilent Case description displayed: "+await description.textContent()+"-----------")
    }

    async verifyCasePriority(priority:string){
        const text=this.lbl_priority;
        await expect(text).toHaveText(priority)
        console.log("---------- Case priority displayed as : "+text.textContent()+" -----------");
    }


}