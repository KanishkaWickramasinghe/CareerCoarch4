import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { NewCasePage } from "../pages/newCasePage.page";
import caseData from "../testData/caseDetails.json"
import { CasesPage } from "../pages/casesPage.page";
import { CommonActionsPage } from "../pages/commonActionsPage.page";

test.describe("Test create case scenarios as case manager.",()=>{
    test.beforeEach("Setup test case pre-execution of create cases as case.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.caseManagerUserName,loginCredentials.caseManagerPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
    })
    test("Create new case as a case manager.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("New Case");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const newCasePg=new NewCasePage(page);
        await newCasePg.verifySuccessfillNavigationToNewCasesForm("New Case")
        await newCasePg.addClientNRIC(caseData.clientNRIC);
        await newCasePg.addCaseClientName(caseData.clentName);
        await newCasePg.selectCaseType();
        await newCasePg.selectCasePriority();
        await newCasePg.caseDescription(caseData.caseDescription);
        await newCasePg.submitCase();
        await page.waitForLoadState("networkidle",{timeout:50000})

        const casesPg=new CasesPage(page);
        await casesPg.verifyPageBanner("Cases");
        await casesPg.verifyDisplayOfDismissibleBanner("Case created successfully.")       
    }) 
})
    