import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { DashboardPage } from "../pages/dashboardPage.page";
import { CasesPage } from "../pages/casesPage.page";
import caseDetails from "../testData/caseDetails.json"
import { CaseDetailsPage } from "../pages/caseDetailsPage.page";


test.describe("Test view cases scenarios.",()=>{

    test.beforeEach("Setup test case pre-execution of view cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});

        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});

        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToMenuItem("Cases");
        await page.waitForLoadState('networkidle',{timeout:50000});
        })

    test("Test view open case details.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.filterCaseByFilterValue("nric");
        await casesPg.addSearchTerm(caseDetails.clientNRIC)
        await casesPg.filterRecords();
        await page.waitForLoadState('networkidle',{timeout:50000});

        await casesPg.verifyFilterRecords("No cases found.")
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

    test("Test view closed case details.",async({page})=>{
        const casesPg=new CasesPage(page);
        await casesPg.filterCaseByFilterValue("nric");
        await casesPg.addSearchTerm(caseDetails.clientNRIC)
        await casesPg.filterRecords();
        await page.waitForLoadState('networkidle',{timeout:50000});

        await casesPg.verifyFilterRecords("No cases found.")
        await casesPg.navigateToClosedCase();
        await page.waitForLoadState('networkidle',{timeout:50000});

        const caseDetilsPg=new CaseDetailsPage(page);
        await caseDetilsPg.verifyCaseDetailsBanner("Case Details:")
        await caseDetilsPg.verifyEditAndCloseCaseButtonsNotDisplayed()
        await caseDetilsPg.verifyCaseStatus("closed");
        await caseDetilsPg.verifyCaseAddedNRIC(caseDetails.clientNRIC)
        await caseDetilsPg.verifyCaseClientName(caseDetails.clentName)
        await caseDetilsPg.verifyCaseDescription(caseDetails.caseDescription)
    })
})