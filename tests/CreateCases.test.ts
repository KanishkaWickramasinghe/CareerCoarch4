import { test } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json"
import { DashboardPage } from "../pages/dashboardPage.page";
import { NewCasePage } from "../pages/newCasePage.page";
import caseData from "../testData/caseDetails.json"

test.describe("Test view cases scenarios.",()=>{

    test.beforeEach("",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        })

    test("Test create new case via dashboard button.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToMenuItem("New Case");
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
        
    }) 
    
    test("Test required field validation messages.",async({page})=>{
        
    })
})