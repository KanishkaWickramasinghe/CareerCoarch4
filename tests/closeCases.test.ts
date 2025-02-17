import {test} from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { CaseDetailsPage } from "../pages/caseDetailsPage.page";
import { DashboardPage } from "../pages/dashboardPage.page";
import { CasesPage } from "../pages/casesPage.page";
import { CommonActionsPage } from "../pages/commonActionsPage.page";

test.describe("Test close cases scenarios.",()=>{
    test.beforeEach("Setup test case pre-execution of close case.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});

        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
    })
    test("Close case in open status.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToViewCaseFromRecentOpenCases();
        await page.waitForLoadState('networkidle',{timeout:50000});
                
        const viewCasePg=new CaseDetailsPage(page);
        await viewCasePg.verifyCaseDetailsBanner("Case Details:")
        await viewCasePg.verifyCaseStatus("open");
        await viewCasePg.verifyStatusLabelColor("rgb(13, 110, 253)")
        await viewCasePg.verifyEditAndCloseCaseButtons();
        await viewCasePg.closeCases();
        await viewCasePg.verifyDismissableBanner("Case closed successfully.")
        await viewCasePg.verifyCaseStatus("closed")
        await viewCasePg.verifyStatusLabelColor("rgb(25, 135, 84)")
        
        const caseNumber=await viewCasePg.getCaseNumber();
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Cases"); 
        await page.waitForLoadState('networkidle',{timeout:50000});
        const casesPg=new CasesPage(page);
        await casesPg.filterCaseByFilterValue("case_number");
        await casesPg.addSearchTerm(caseNumber)
        await casesPg.filterRecords();
        await page.waitForSelector("//tbody//tr[1]", { timeout: 50000 }); 

        await page.waitForLoadState('load',{timeout:50000});
        await casesPg.verifyRecordStatus("closed")
        await casesPg.verifyStatusLabelColor("rgb(25, 135, 84)")
    })

})