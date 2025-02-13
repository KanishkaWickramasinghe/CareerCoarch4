import { expect, Locator, Page } from "@playwright/test";

export class CasesPage{

    readonly lbl_pageBanner:Locator;
    readonly lbl_dismissibleBanner:Locator;
    readonly btn_newCase:Locator;
    readonly dropdown_filter:Locator;
    readonly filterOptions:Locator;
    readonly input_searchText:Locator;
    readonly btn_search:Locator;
    readonly table_record:Locator;
    readonly btn_viewOfStatusOpenRecord:Locator;
    readonly btn_viewOfStatusClosedRecord:Locator;

    
    constructor(page:Page){
        this.lbl_pageBanner=page.locator("//h2");
        this.lbl_dismissibleBanner=page.locator(".alert-dismissible");
        this.btn_newCase=page.locator(".btn.btn-primary");
        this.dropdown_filter=page.locator("#search_type")
        this.filterOptions=page.locator("#search_type option");
        this.input_searchText=page.locator("#search_term");
        this.btn_search=page.locator("#submit");
        this.table_record=page.locator("//table[@class='table table-striped']//tbody/tr").first();
        this.btn_viewOfStatusOpenRecord=page.locator("//td[@data-value='open']//following-sibling::td/a[text()='View']")
        this.btn_viewOfStatusClosedRecord=page.locator("//td[@data-value='closed']//following-sibling::td/a[text()='View']");
    }

    async verifyPageBanner(bannerTxt:string){
        const banner=this.lbl_pageBanner
        await expect(banner).toHaveText(bannerTxt)
        console.log("-------- Page banner displayed as : "+await banner.textContent()+" ---------")
    }

    async verifyDisplayOfDismissibleBanner(bannerMessage:string){
        const message=this.lbl_dismissibleBanner;
        await expect(message).toHaveText(bannerMessage);
        console.log("-------- Dismissable banner displayed. ---------")
    }

    async navigateToNewCaseForm(){
        const newcaseButton=this.btn_newCase;
        await expect(newcaseButton).toBeVisible();
        await newcaseButton.click();
        console.log("-------- New case button clicked. ---------")
    }

    async addSearchTerm(text:string){
        const searchTerm=this.input_searchText;
        await searchTerm.fill(text)
        console.log("-------- Search term added. ---------")
    }

    async filterCaseByFilterValue(filter:string){
        const filterDropdown=this.dropdown_filter;
        await filterDropdown.click()
        for(const option of await this.filterOptions.all()){
            if(await option.getAttribute('value')==filter){
                await option.click()
                console.log("-------- Filter type selected. ---------")
            }
        }
    }
    async filterRecords(){
        const filterButton=this.btn_search;
        await filterButton.click()
        console.log("-------- Search button clicked. ---------")
    }

    async verifyFilterRecords(){
        const record=this.table_record;
        await expect(record).not.toHaveText("No cases found.")
        console.log("-------- No cases found label not displayed. ---------")
    }

    async navigateToOpenCase(){
        const viewButtons= this.btn_viewOfStatusOpenRecord;
        await viewButtons.first().click()
        console.log("-------- Navigate to Status=Open case to view. ---------")
    }

    async navigateToClosedCase(){
        const viewButtons= this.btn_viewOfStatusClosedRecord;
        await viewButtons.first().click()
        console.log("-------- Navigate to Status=Closed case to view. ---------")
    }
    
}