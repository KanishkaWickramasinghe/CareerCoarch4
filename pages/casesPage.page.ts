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
    readonly lbl_recordStatus_close:Locator;
    readonly lbl_recordStatus:Locator;
    readonly lbl_columnNames:Locator;
    readonly lbl_ColumnValues:Locator;

    
    constructor(page:Page){
        this.lbl_pageBanner=page.locator("//h2");
        this.lbl_dismissibleBanner=page.locator(".alert-dismissible");
        this.btn_newCase=page.locator(".btn.btn-primary");
        this.dropdown_filter=page.locator("#search_type")
        this.filterOptions=page.locator("#search_type option");
        this.input_searchText=page.locator("#search_term");
        this.btn_search=page.locator("#submit");
        this.table_record=page.locator("//table[@class='table table-striped']//tbody/tr/td").first();
        this.btn_viewOfStatusOpenRecord=page.locator("//td[@data-value='open']//following-sibling::td/a[text()='View']")
        this.btn_viewOfStatusClosedRecord=page.locator("//td[@data-value='closed']//following-sibling::td/a[text()='View']");
        this.lbl_recordStatus_close=page.locator("//span[@class='badge bg-success']");
        this.lbl_recordStatus=page.locator("//td/span");
        this.lbl_columnNames=page.locator("//th[normalize-space()]");
        this.lbl_ColumnValues=page.locator("tbody tr td:nth-child(2)");
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
        const record=(await this.table_record.first().innerText()).trim();
        if(record!=null){
            expect(record).toBe(message)
            console.log("-------- No cases found label not displayed. ---------")
        }
        else{
            console.log("------- No records found.--------------")
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
        const status=this.lbl_recordStatus_close;
        await expect(status).toHaveText(expectedStatus)
        console.log("--------Displayed status of record : "+await status.textContent()+" -----------")
    }

    async verifyStatusLabelColor(color:string){
        const statusOpen=this.lbl_recordStatus.first();
        const buttonColor = await statusOpen.evaluate((button) => {
            return window.getComputedStyle(button).backgroundColor;
          });
        
        if(await statusOpen.textContent()=="open"){
            
              console.log("-------------Button Color for open:", buttonColor+" -----------------");
              expect(buttonColor).toBe(color);
        }
        else {
            
              console.log("-------------Button Color for closed:", buttonColor+" -----------------");
              expect(buttonColor).toBe(color);
        }      
    }

    async sortCaseRecordByClientName(columnName:string){
        const tableColumn=await this.lbl_columnNames.all();
        for(let i=0;i<tableColumn.length;i++){
            const columnValue=(await tableColumn[i].textContent())?.trim();
            
            if(columnValue==columnName){
                console.log("-------------Column value found--------------")
                await tableColumn[i].click();
                
                const actualValues = await this.getColumnValues();
                const expectedValues = [...actualValues].sort((a, b) => {
                const numA = Number(a), numB = Number(b);
                return isNaN(numA) || isNaN(numB) ? a.localeCompare(b) : numA - numB;
                });
                expect(actualValues).toStrictEqual(expectedValues);

                console.log("----------- "+columnName+" coulumn values sorted in ascending order. -------------" )
            }
        }
    }

    async sortColumnInDescendingOrder(columnName:string){
        const tableColumn=await this.lbl_columnNames.all();
        for(let i=0;i<tableColumn.length;i++){
            const columnValue=(await tableColumn[i].textContent())?.trim();

            if(columnValue==columnName){
                await tableColumn[i].click();
                const actualValues = await this.getColumnValues();
                const expectedValues = [...actualValues].sort((a, b) => {
                const numA = Number(a), numB = Number(b);
                return isNaN(numA) || isNaN(numB) ? a.localeCompare(b) : numA - numB;
                });

                expect(actualValues).toStrictEqual(expectedValues);
                console.log("----------- "+columnName+" coulumn values sorted in descending order. -------------" )
            }
        }
    }

    async getColumnValues(): Promise<string[]> {
        const values = await this.lbl_ColumnValues.allTextContents();
        return values.map(value => value.trim()); // Remove spaces
    }
    
    
}