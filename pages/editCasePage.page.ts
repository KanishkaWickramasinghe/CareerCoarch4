import {Locator, test,Page, expect} from "@playwright/test";

export class EditCasePage{
    readonly lbl_pageBanner:Locator;
    readonly input_nric:Locator;
    readonly input_clientName:Locator;
    readonly input_description:Locator;
    readonly dropdown_caseType:Locator;
    readonly dropDown_priority:Locator;
    readonly dropdownOption_caseType:Locator;
    readonly dropdownPriority_options:Locator;
    readonly btn_submit:Locator;
    


    constructor(page:Page){
        this.lbl_pageBanner=page.locator("//h3");
        this.input_nric=page.locator("#nric");
        this.input_clientName=page.locator("#client_name");
        this.input_description=page.locator("#description");
        this.dropdown_caseType=page.locator("#case_type");
        this.dropDown_priority=page.locator("#priority");
        this.dropdownOption_caseType=page.locator("//select[@id='case_type']/option");
        this.dropdownPriority_options=page.locator("//select[@id='priority']/option");
        this.btn_submit=page.locator("#submit");
    }

    async verifyEditPageBanner(banner:string){
        const bannerText=this.lbl_pageBanner;
        expect(bannerText).toHaveText(banner)
        console.log("--------- Edit case page banner loaded.----------");
    }

    async editClient_nric(){
        const textNric=this.input_nric;
        const randomSevenDigitNumber = Math.floor(1000000 + Math.random() * 9000000);
        await textNric.fill("F"+randomSevenDigitNumber+"X")
        console.log("--------- Add updated client NRIC: "+randomSevenDigitNumber+"----------");
        return "F"+randomSevenDigitNumber+"X";
    }
    async editClient_clentName(name:string){
        const textClientName=this.input_clientName;
        await textClientName.fill(name);
        console.log("--------- Add updated client name.----------");
    }
    async editClient_description(description:string){
        const textCaseDescription=this.input_description;
        await textCaseDescription.fill(description);
        console.log("--------- Add updated client case description.----------");
    }
    async editClientCaseType(){
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
    async editClientCasePriority(){
        const dropdown=this.dropDown_priority
        await dropdown.click()
        const options = await this.dropdownPriority_options.all();
        const randomIndex = Math.floor(Math.random() * options.length);
        const randomValue = await options[randomIndex].getAttribute('value');
        if (randomValue) {
            await dropdown.selectOption(randomValue);
            console.log("---------Case priority selected from dropdown-------------")
          }
    }

    async submitUpdatedDetails(){
        const submit=this.btn_submit;
        await submit.click();
        console.log("---------Case updated.-------------")
    }

    async getSelectedCaseType(){
        const selectedValue = await this.dropdown_caseType.inputValue();
        console.log(`------------Selected case type option value: ${selectedValue} -----------`);
        return selectedValue;
    }

    async getSelectedCasePriority(){
        const selectedPriorityValue = await this.dropdown_caseType.inputValue();
        console.log(`-------Selected case priority option value: ${selectedPriorityValue}---------`);
        return selectedPriorityValue;
    }




}