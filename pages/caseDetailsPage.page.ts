import { Dialog, expect, Locator, Page } from "@playwright/test";

export class CaseDetailsPage{
    page:Page;
    readonly btn_editCase:Locator;
    readonly btn_closeCase:Locator;
    readonly btn_close:Locator;
    readonly lbl_status:Locator
    readonly lbl_nric:Locator;
    readonly lbl_clientName:Locator;
    readonly lbl_caseDescription:Locator;
    readonly lbl_priority:Locator;
    readonly lbl_dismissableBanner:Locator;
    readonly lbl_selectedCaseType:Locator;
    readonly lbl_caseDetailsBanner:Locator;
    


    constructor(page:Page){
        this.page = page;
        this.lbl_caseDetailsBanner=page.locator("//h3");
        this.btn_editCase=page.locator("//a[text()='Edit Case']");
        this.btn_closeCase=page.locator("//button[@type='submit']");
        this.lbl_status=page.locator("//th[text()='Status:']/following-sibling::td/span");
        this.lbl_nric=page.locator("//th[text()='NRIC:']/following-sibling::td");
        this.lbl_clientName=page.locator("//th[text()='Client Name:']/following-sibling::td");
        this.lbl_caseDescription=page.locator("//h5[text()='Case Description']/following-sibling::div");
        this.lbl_priority=page.locator("//th[text()='Priority:']/following-sibling::td/span");
        this.lbl_dismissableBanner=page.locator(".alert.alert-success.alert-dismissible");
        this.lbl_selectedCaseType=page.locator("//th[text()='Case Type:']/following-sibling::td");

    }

    async verifyCaseDetailsBanner(banner:string) {
        const bannerTxt=await this.lbl_caseDetailsBanner.innerText();
        const partialText=bannerTxt.slice(0,13);
        await expect(partialText).toBe(banner)
        console.log("-------- Case details banner displayed :"+ partialText+"-----------")
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
        await expect(status).toHaveText(statusText)
        console.log("---------- Status +"+await status.textContent()+"displayed------------")
    }

    async verifyCaseAddedNRIC(nric:string){
        const nricTxt=this.lbl_nric;
        await expect(nricTxt).toHaveText(nric);
        console.log("-------- Cilent NRIC displayed: "+await nricTxt.textContent()+"-----------")
    }

    async verifyCaseClientName(name:string){
        const clientName=this.lbl_clientName;
        await expect(clientName).toHaveText(name)
        console.log("-------- Cilent name displayed: "+await clientName.textContent()+"-----------")
    }

    async verifyCaseDescription(descriptionText:string){
        const description=this.lbl_caseDescription;
        await expect(description).toHaveText(descriptionText)
        console.log("-------- Cilent Case description displayed: "+await description.textContent()+"-----------")
    }

    async verifyCasePriority(priority:string){
        const text=this.lbl_priority;
        await expect(text).toBeVisible()
        console.log("---------- Case type displayed as : "+await text.textContent()+" -----------");
    }
    async verifyCaseType(casetype:string){
        const text=this.lbl_selectedCaseType;
        await expect(text).toHaveText(casetype)
        console.log("---------- Case type displayed as : "+await text.textContent()+" -----------");
    }

    async navigateToEditCase(){
        const editCase=this.btn_editCase;
        await editCase.click();
        console.log("---------- User clicked on Edit case button ----------------")
    }
    async verifyDismissableBanner(successMessage:string){
        const successBannerTxt=this.lbl_dismissableBanner;
        await expect(successBannerTxt).toBeVisible();
        await expect(successBannerTxt).toHaveText(successMessage);
        console.log("------------ Dismissable banner displayed. -------------")
    }

    async closeCases(){
        this.page.once('dialog', dialog => {
            console.log(`Dialog message: ${dialog.message()}`);
            dialog.accept().catch(() => {});
          });
          await this.btn_closeCase.click();
          console.log("---------- Close case button clicked ------------");
    }
    async getCaseNumber(){
        const element = this.lbl_caseDetailsBanner; 
        const fullText = await element.innerText();
        const partText = fullText.substring(14, 30);
        console.log("-------Case no: "+partText+"-----------");
        return partText;
    }

}