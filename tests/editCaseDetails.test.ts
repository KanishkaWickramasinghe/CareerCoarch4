import test from "@playwright/test";
import { LoginPage } from "../pages/loginPage.page";
import { DashboardPage } from "../pages/dashboardPage.page";
import { BasePage } from "../pages/basePage.page";
import loginCredentials from "../testData/loginCredentials.json";
import { CaseDetailsPage } from "../pages/caseDetailsPage.page";
import { EditCasePage } from "../pages/editCasePage.page";
import caseDetails from "../testData/caseDetails.json"

test.describe("Test edit case scenarios.",()=>{
    test.beforeEach("Setup test case pre-execution of edit cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});

        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
    })
    test("Test edit existing case.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToViewCaseFromRecentOpenCases();
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const viewCasePg=new CaseDetailsPage(page);
        await viewCasePg.verifyCaseDetailsBanner("Case Details:")
        await viewCasePg.verifyCaseStatus("open");
        await viewCasePg.verifyEditAndCloseCaseButtons();
        await viewCasePg.navigateToEditCase();

        const editCasePg=new EditCasePage(page);
        await editCasePg.editClient_clentName(caseDetails.updatedName)
        const nric=await editCasePg.editClient_nric()
        await editCasePg.editClient_description(caseDetails.updatedDescription)
        await editCasePg.editClientCaseType()
        const caseTypeSelected=await editCasePg.getSelectedCaseType();
        await editCasePg.editClientCasePriority()
        const casePriority=await editCasePg.getSelectedCasePriority()
        await editCasePg.submitUpdatedDetails();
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        await viewCasePg.verifyDismissableBanner("Case updated successfully.")
        await viewCasePg.verifyCaseAddedNRIC(nric)
        await viewCasePg.verifyCaseStatus("open")
        await viewCasePg.verifyCaseClientName(caseDetails.updatedName)
        await viewCasePg.verifyCaseDescription(caseDetails.updatedDescription)
        await viewCasePg.verifyCaseType(caseTypeSelected)
        await viewCasePg.verifyCasePriority(casePriority)
    })
})