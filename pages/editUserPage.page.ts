import { Locator, Page } from "@playwright/test";

export class EditUserPage{
    page:Page;
    readonly input_email:Locator;
    readonly input_password:Locator;
    readonly btn_submit:Locator;
    readonly btn_cancel:Locator;

    constructor(page:Page){
        this.page=page;
        this.input_email=page.locator("#email")
        this.input_password=page.locator("#password");
        this.btn_submit=page.locator("#submit");
        this.btn_cancel=page.locator("//a[text()='Cancel']");
    }

    async inputUpdatedUserEmail(uname:string){
        const userEmail=this.input_email;
        const uniqueEmail_prefix=uname+Math.floor(1000 + Math.random() * 9000);
        const uniqueEmail=uniqueEmail_prefix+"@test.com";
        await userEmail.fill(uniqueEmail)
        console.log("-------- User email address updated. -----------")
        return uniqueEmail;
    }

    async inputUserPassword(userPassword:string){
        const password=this.input_password;
        await password.fill(userPassword);
        console.log("-----------Update user password.------------");
    }

    async submitEditedDetails(){
        const submit=this.btn_submit;
        await submit.click();
        console.log("------- User submitted updated details----------")
    }

}