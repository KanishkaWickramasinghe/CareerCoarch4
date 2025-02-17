import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { DashboardPage } from "../pages/dashboardPage.page";
import { CasesPage } from "../pages/casesPage.page";
import caseDetails from "../testData/caseDetails.json"
import { CaseDetailsPage } from "../pages/caseDetailsPage.page";
import { CommonActionsPage } from "../pages/commonActionsPage.page";


test.describe("Test view cases scenarios.",()=>{

    test.beforeEach("Setup test case pre-execution of view cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});

        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});

        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Cases");
        await page.waitForLoadState('networkidle',{timeout:50000});
        })

    test("View case details in open status.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.filterCaseByFilterValue("nric");
        await casesPg.addSearchTerm(caseDetails.clientNRIC)
        await casesPg.filterRecords();
        await page.waitForLoadState('networkidle',{timeout:50000});

        //await casesPg.verifyFilterRecords("No cases found.")
        await casesPg.navigateToOpenCase();
        await page.waitForLoadState('networkidle',{timeout:50000});

        const caseDetilsPg=new CaseDetailsPage(page);
        await caseDetilsPg.verifyCaseDetailsBanner("Case Details:")
        await caseDetilsPg.verifyEditAndCloseCaseButtons()
        await caseDetilsPg.verifyCaseStatus("open");
        await caseDetilsPg.verifyCaseAddedNRIC(caseDetails.clientNRIC)
        await caseDetilsPg.verifyCaseClientName(caseDetails.clentName)
        await caseDetilsPg.verifyCaseDescription(caseDetails.caseDescription)
    })

    test("View case details in closed status.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.filterCaseByFilterValue("nric");
        await casesPg.addSearchTerm(caseDetails.clientNRIC)
        await casesPg.filterRecords();
        await page.waitForLoadState('networkidle',{timeout:50000});

        await casesPg.navigateToClosedCase();
        await page.waitForLoadState('networkidle',{timeout:50000});

        const caseDetilsPg=new CaseDetailsPage(page);
        await caseDetilsPg.verifyCaseDetailsBanner("Case Details:")
        await caseDetilsPg.verifyEditAndCloseCaseButtonsNotDisplayed()
        await caseDetilsPg.verifyCaseStatus("closed");
        await caseDetilsPg.verifyStatusLabelColor("rgb(25, 135, 84)");

        await caseDetilsPg.verifyCaseAddedNRIC(caseDetails.clientNRIC)
        await caseDetilsPg.verifyCaseClientName(caseDetails.clentName)
        await caseDetilsPg.verifyCaseDescription(caseDetails.caseDescription)
    })

    test("Verify case table records sorting in ascending order.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.sortCaseRecordByClientName("Client Name")
    })

    
    test("Sort case records in descending order.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.sortColumnInDescendingOrder("Client Name")
    })
})