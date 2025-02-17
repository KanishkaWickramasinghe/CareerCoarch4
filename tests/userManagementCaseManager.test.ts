import {test} from "@playwright/test";
import { BasePage } from "../pages/basePage.page";
import { LoginPage } from "../pages/loginPage.page";
import loginCredentials from "../testData/loginCredentials.json";
import { DashboardPage } from "../pages/dashboardPage.page";
import { UserserPage } from "../pages/usersPage.Page";
import { NewUserPage } from "../pages/newUserPage.page";
import { EditUserPage } from "../pages/editUserPage.page";
import { CommonActionsPage } from "../pages/commonActionsPage.page";

test.describe("Test case manager test scenarios.",()=>{
    test.beforeEach("Setup test case pre-execution of create cases.",async({page,baseURL})=>{
        const basePage=new BasePage(page,`${baseURL}`);
        await basePage.initialize();
        await page.waitForLoadState('load',{timeout:50000});
        const loginPg=new LoginPage(page);
        await loginPg.verifyLoginPageLoad("Login");
        await loginPg.loginToSystem(loginCredentials.adminUserName,loginCredentials.adminPassword);
        await page.waitForLoadState('networkidle',{timeout:50000});
        })
    test("Create new case manager.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        await usersPg.verifyUsersPageBanner("User Management")
        await usersPg.navigateToNewUserPage();
        await page.waitForLoadState('networkidle',{timeout:50000});
    
        const newUserPg=new NewUserPage(page);
        const userName=await newUserPg.fillInNewUserLoginPredentials("case_manager_");
        await newUserPg.addNewUserPassword(loginCredentials.caseManagerPassword);
        await newUserPg.fillInNewUserEmail(userName+"@test.com");
        await newUserPg.selectNewUserRole("case_manager");
        await newUserPg.createNewUsers();
        await page.waitForLoadState('networkidle',{timeout:50000}); 
    
        await usersPg.verifyDismissableAlert("User created successfully.")
    })

    test("Edit existing case manager user.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        await usersPg.navigateToEditUserPage("case_manager");
        
        const editUserPg=new EditUserPage(page);
        const updatedEmail=await editUserPg.inputUpdatedUserEmail("case_manager_");
        await editUserPg.inputUserPassword(loginCredentials.caseManagerPassword);
        await editUserPg.submitEditedDetails();
        await page.waitForLoadState('networkidle',{timeout:50000});

        await usersPg.verifyDismissableAlert("User updated successfully.");
        await usersPg.verifyUpdatedDetails(updatedEmail)
    })

    test("Deactivate case manager record.",async({page})=>{
        const commonPg=new CommonActionsPage(page);
        await commonPg.navigateToMenuItem("Users");
        await page.waitForLoadState('networkidle',{timeout:50000});
        
        const usersPg=new UserserPage(page);
        const userName=await usersPg.deactivaUserRecord("case_manager")
        await usersPg.verifyDismissableAlert("User "+userName+" has been deactivated.")
    })


})
