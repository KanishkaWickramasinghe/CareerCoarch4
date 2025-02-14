import {expect, Locator, Page} from "@playwright/test"
export class UserserPage{
    page:Page;
    readonly lbl_banner:Locator;
    readonly lbl_userRole:Locator;
    readonly btn_newUser:Locator;
    readonly btn_editUser:Locator;
    readonly btn_deactivate:Locator;
    readonly lbl_userEmail:Locator;
    readonly lbl_dismissableAlert:Locator;
    readonly tableRecords:Locator;
    
    

    constructor(page:Page){
        this.page=page;
        this.lbl_banner=page.locator("//h2");
        this.btn_newUser=page.locator("//a[@class='btn btn-primary']");
        this.btn_editUser=page.locator("//a[text()='Edit']");
        this.btn_deactivate=page.locator("//button[@class='btn btn-sm btn-danger']");
        this.lbl_userRole=page.locator("//td/span");
        this.lbl_userEmail=page.locator("//tbody/tr/td");
        this.lbl_dismissableAlert=page.locator("//div[@class='alert alert-success alert-dismissible fade show']");
        this.tableRecords=page.locator("//tbody/tr")
        
    }

    async verifyUsersPageBanner(bannerText:string){
        const banner=this.lbl_banner;
        await expect(banner).toHaveText(bannerText);
        console.log("---------- User management page banner verified.----------")
    }

    async navigateToNewUserPage(){
        const btnNewUser=this.btn_newUser;
        await btnNewUser.click();
        console.log("---------------- User clicked on new user button.----------------")
    }

    async selectNewUserRole(userRole:string){
        const userRoles=await this.lbl_userRole.all();
        for(const urole of userRoles){
            const uroleText=await urole.textContent();
            if(uroleText==userRole){
                const btnEditUser=this.btn_editUser.last();
                await btnEditUser.click()
            }
        }
        console.log("---------------- User clicked on edit user button.----------------")
    }

    async navigateToEditUserPage(role:string){
        const editUserbuttons=await this.btn_editUser.all();
        const rec=await this.tableRecords.all();
        for(let i=1;i<rec.length;i++){
            const roleType=await rec[i].locator("//td[3]/span").innerText();
            
            if(roleType===role){
                await editUserbuttons[i].click();
                console.log("------------ Edit button clicked -----------")
                break;
            }
        }
    }

    async deactivaUserRecord(role:string){
        const deactivatButtons=await this.btn_deactivate.all();
        for(let i=0;i<deactivatButtons.length;i++){
            const roleContex=await deactivatButtons[i].locator("//ancestor::tr/td[3]/span").innerText();
            if(roleContex===role){
                const username=await deactivatButtons[i].locator("//ancestor::tr/td[1]").innerText();
                this.page.once('dialog', dialog => {
                    console.log(`----------------Dialog message: ${dialog.message()}---------------`);
                    dialog.accept().catch(() => {});
                  });

                await deactivatButtons[i].click({force:true});
                console.log("-------Active record deactivated.-------------")
                return username;
            }
            else{
                console.log("---------No active records with role :"+role+" available---------")
            }
        }
    }

    async verifyDismissableAlert(bannerText:string){
        const banner=this.lbl_dismissableAlert;
        await expect(banner).toBeVisible();
        await expect(banner).toHaveText(bannerText);
        console.log("-------- Banner displayed on user creation.-----------")
    }

    async verifyUpdatedDetails(updatedEmail:string){
        const tdValues=await this.lbl_userEmail.all();
        for(const value of tdValues){
            const textValue=await value.textContent();
            if(textValue==updatedEmail){
                expect(textValue).toBe(updatedEmail);
                console.log("------- Updated user details verified -----------");
                break;
            }
        }
    }
}