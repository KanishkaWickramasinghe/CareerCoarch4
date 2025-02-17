import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { NewCasePage } from "../pages/newCasePage.page";
import caseData from "../testData/caseDetails.json"
import { CasesPage } from "../pages/casesPage.page";
import { CommonActionsPage } from "../pages/commonActionsPage.page";


test.describe("Test view cases scenarios.",()=>{

    test.beforeEach("Setup test case pre-execution of create cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        })

    test("Create new case via dashboard's new case button.",async({page})=>{
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
    
    test("Test create new case via cases page.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Cases");

        await page.waitForLoadState('networkidle',{timeout:50000});

        const casesPg=new CasesPage(page);
        await casesPg.navigateToNewCaseForm();
        const newCasePg=new NewCasePage(page);
        await newCasePg.verifySuccessfillNavigationToNewCasesForm("New Case")
        await newCasePg.addClientNRIC(caseData.clientNRIC);
        await newCasePg.addCaseClientName(caseData.clentName);
        await newCasePg.selectCaseType();
        await newCasePg.selectCasePriority();
        
        await newCasePg.caseDescription(caseData.caseDescription);
        await newCasePg.submitCase();
        await page.waitForLoadState("networkidle",{timeout:50000})

        await casesPg.verifyPageBanner("Cases");
        await casesPg.verifyDisplayOfDismissibleBanner("Case created successfully.")
    })

    test("Test cancel case creation.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Cases");
        await page.waitForLoadState('networkidle',{timeout:50000});

        const casesPg=new CasesPage(page);
        await casesPg.navigateToNewCaseForm();
        const newCasePg=new NewCasePage(page);
        await newCasePg.verifySuccessfillNavigationToNewCasesForm("New Case")
        await newCasePg.addClientNRIC(caseData.clientNRIC);
        await newCasePg.addCaseClientName(caseData.clentName);
        await newCasePg.selectCaseType();
        await newCasePg.selectCasePriority();
        await newCasePg.caseDescription(caseData.caseDescription);
        await newCasePg.cancelCaseCreation()
        await page.waitForLoadState("networkidle",{timeout:50000})
        await casesPg.verifyPageBanner("Cases");
    }) 
})