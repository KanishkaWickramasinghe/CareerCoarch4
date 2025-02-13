import { expect, Locator, Page } from "@playwright/test";

export class NewCasePage{
    readonly lbl_pageBanner:Locator;
    readonly input_nric:Locator;
    readonly input_clientName:Locator;
    readonly input_description:Locator;
    readonly dropdownOption_caseType:Locator;
    readonly dropdown_caseType:Locator;
    readonly dropdown_Priority:Locator;
    readonly dropdownPriority_options:Locator;
    readonly btn_submit:Locator;
    readonly btn_cancel:Locator;

    constructor(page:Page){
        this.lbl_pageBanner=page.locator(".card-header h3");
        this.input_nric=page.locator("#nric");
        this.input_clientName=page.locator("#client_name");
        this.input_description=page.locator("#description");
        this.dropdownOption_caseType=page.locator("#case_type option");
        this.dropdown_caseType=page.locator("#case_type");
        this.dropdown_Priority=page.locator("#priority");
        this.dropdownPriority_options=page.locator("#priority option");
        this.btn_submit=page.locator("#submit");
        this.btn_cancel=page.locator("//input[@id='submit']/parent::div/a");
        
    }

    async verifySuccessfillNavigationToNewCasesForm(banner:string){
        const bannerText=this.lbl_pageBanner;
        await expect(bannerText).toHaveText(banner);
        console.log("---------Page banner verified.-------------")
    }

    async addClientNRIC(nricValue:string){
        const nric=this.input_nric
        await nric.fill(nricValue)
        console.log("---------Case client NRIC added.-------------")
    }
    async addCaseClientName(name:string){
        const c_name=this.input_clientName
        await c_name.fill(name)
        console.log("---------Case client name added-------------")
    }

    async selectCaseType(){
        const dropdown=this.dropdown_caseType
        await dropdown.click()
        const options = await this.dropdownOption_caseType.all();
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomValue = await options[randomIndex].getAttribute('value');
        if (randomValue) {
            await dropdown.selectOption(randomValue);
            console.log("---------Case type selected from dropdown-------------")
          }
          
    }

    async selectCasePriority(){
        const dropdown=this.dropdown_Priority
        await dropdown.click()
        const options = await this.dropdownPriority_options.all();
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomValue = await options[randomIndex].getAttribute('value');
        if (randomValue) {
            await dropdown.selectOption(randomValue);
            console.log("---------Case priority selected from dropdown-------------")
          }
    }

    async caseDescription(descriptionText:string){
        const text_description=this.input_description
        await text_description.fill(descriptionText)
        console.log("---------Case description filled.-------------")
    }

    async submitCase(){
        const submit=this.btn_submit;
        await submit.click();
        console.log("---------Case submitted.-------------")
    }

    async cancelCaseCreation(){
        const cancel=this.btn_cancel;
        await cancel.click();
        console.log("---------Case create cancel button clicked.-------------")
    }

    
}
