import test, { expect } from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import { DashboardPage } from "../pages/dashboardPage.page";
import loginCredentials from "../testData/loginCredentials.json"

test.describe("Test login scenarios",()=>{

    test.beforeEach("Setup test case pre-execution of login tests.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
    })
    test("Login successfully to system as admin login",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});

        const dashboardPg=new DashboardPage(page);
        await dashboardPg.verifyPageBannerDisplay("Career Coach 4.0")
        await dashboardPg.verifyLoggedInUser("admin")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Total Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Open Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Closed Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("High Priority")
    })
    
    test("Login as admin with invalid password",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,"TestPassword");
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })

    test("Login as admin with invalid username",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem("TestUserAdmin",loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })

    test("Logout from admin login from career coach system.",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});

        const dashboardPg=new DashboardPage(page);
        await dashboardPg.verifyPageBannerDisplay("Career Coach 4.0");
        
        await dashboardPg.logoutFromSystem();
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyLoginPageLoad("Login");
    })

    test("Loginto system as case manager with valid credentials.",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.caseManagerUserName,loginCredentials.caseManagerPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.verifyPageBannerDisplay("Career Coach 4.0")
        await dashboardPg.verifyLoggedInUser("case_manager")
        await dashboardPg.verifyMenuItems("Users")

        await dashboardPg.verifyDisplayedDisplayOfCardText("Total Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Open Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Closed Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("High Priority")
    })

    test("Login as case manage with invalid password",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.caseManagerPassword,"TestPassword");
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })

    test("Login as case manager with invalid username",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem("TestUserAdmin",loginCredentials.caseManagerUserName);
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })


    test("Login to system as Regular user with valid credentials.",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.regularUser1Username,loginCredentials.regularUser1Password);
        await page.waitForLoadState('networkidle',{timeout:50000});
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.verifyPageBannerDisplay("Career Coach 4.0")
        await dashboardPg.verifyLoggedInUser("user");
        await dashboardPg.verifyMenuItems("New Case")
        await dashboardPg.verifyMenuItems("Users")

        await dashboardPg.verifyDisplayedDisplayOfCardText("Total Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Open Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("Closed Cases")
        await dashboardPg.verifyDisplayedDisplayOfCardText("High Priority")
    })

    test("Login as regular user with invalid password",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.regularUser1Username,"TestPassword");
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })

    test("Login as regular user with invalid username",async({page})=>{
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem("TestUserAdmin",loginCredentials.regularUser1Password);
        await page.waitForLoadState('networkidle',{timeout:50000});
        await loginPg.verifyDisplayofLoginValidationMessage("Invalid username or password")
    })


})