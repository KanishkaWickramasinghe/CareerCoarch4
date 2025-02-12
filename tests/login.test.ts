import test, { expect } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import { DashboardPage } from "../pages/dashboardPage.page";
import loginCredentials from "../testData/loginCredentials.json"

test.describe("Test login scenarios",()=>{

    test.beforeEach("",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
    })
    test("Test successful admin login",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});

        const dashboardPg=new DashboardPage(page);
        await dashboardPg.verifyPageBannerDisplay("Career Coach 4.0")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Total Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Open Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Closed Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("High Priority")
    })
    
    test("Test invalid login with invalid password",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,"TestPassword");
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })
    
    test("Test invalid login with invalid username",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem("TestUserAdmin",loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })

})