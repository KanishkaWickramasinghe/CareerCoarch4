import {test,Page, expect} from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json";
import { DashboardPage } from "../pages/dashboardPage.page";
import { UserserPage } from "../pages/usersPage.Page";
import { NewUserPage } from "../pages/newUserPage.page";
import { EditUserPage } from "../pages/editUserPage.page";

test.describe("Test new user scenarios.",()=>{
    test.beforeEach("Setup test case pre-execution of create cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        })
    test("Create new admin user for system.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        await usersPg.verifyUsersPageBanner("User Management")
        await usersPg.navigateToNewUserPage();
        await page.waitForLoadState('networkidle',{timeout:50000});

        const newUserPg=new NewUserPage(page);
        const userName=await newUserPg.fillInNewUserLoginPredentials("admin_");
        await newUserPg.addNewUserPassword(loginCredentials.adminPassword);
        await newUserPg.fillInNewUserEmail(userName+"@test.com");
        await newUserPg.selectNewUserRole("admin");
        await newUserPg.createNewUsers();
        await page.waitForLoadState('networkidle',{timeout:50000}); 

        await usersPg.verifyDismissableAlert("User created successfully.")
    })

    test("Edit existing admin user.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        await usersPg.navigateToEditUserPage("admin");
        
        const editUserPg=new EditUserPage(page);
        const updatedEmail=await editUserPg.inputUpdatedUserEmail("admin_");
        await editUserPg.inputUserPassword(loginCredentials.adminPassword);
        await editUserPg.submitEditedDetails();
        await page.waitForLoadState('networkidle',{timeout:50000});

        await usersPg.verifyDismissableAlert("User updated successfully.");
        await usersPg.verifyUpdatedDetails(updatedEmail)
    })

    test("Deactivate admin record.",async({page})=>{
        const dashboardPg=new DashboardPage(page);
        await dashboardPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        const userName=await usersPg.deactivaUserRecord("admin")
        await usersPg.verifyDismissableAlert("User "+userName+" has been deactivated.")
    })
})