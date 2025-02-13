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
    readonly lbl_recordStatus:Locator;

    
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
        this.lbl_recordStatus=page.locator("//span[@class='badge bg-success']");
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
        const searchType=this.dropdown_filter;
        await searchType.selectOption(filter);
    }
    async filterRecords(){
        const filterButton=this.btn_search;
        await filterButton.click()
        console.log("-------- Search button clicked. ---------")
    }

    async verifyFilterRecords(message:string){
        const record=(await this.table_record.innerText()).trim();
        if(record!=null){
            expect(record).not.toBe(message)
            console.log("-------- No cases found label not displayed. ---------")
        }
        else{
            console.log("-------- Records of cases are displayed. ---------")
        }
        
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

    async verifyRecordStatus(expectedStatus:string){
        const status=this.lbl_recordStatus;
        await expect(status).toHaveText(expectedStatus)
        console.log("--------Displayed status of record : "+await status.textContent()+" -----------")
    }
    
}