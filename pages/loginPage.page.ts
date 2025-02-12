import { expect, Locator, Page } from "@playwright/test";

export class LoginPage{
    readonly page:Page;
    readonly input_username:Locator
    readonly input_password:Locator;
    readonly btn_login:Locator;
    readonly lbl_login:Locator;
    readonly lbl_loginValidationMessage:Locator;


    constructor(page:Page){
        this.page=page;
        this.input_username=page.locator("#username");
        this.input_password=page.locator("#password");
        this.btn_login=page.locator("#submit");
        this.lbl_login=page.locator(".text-center");
        this.lbl_loginValidationMessage=page.locator(".alert-dismissible")
    }

    async loginToSystem(userName:string,password:string){
        const uname=this.input_username;
        const pw=this.input_password;
        const login=this.btn_login;

        await uname.fill(userName);
        await pw.fill(password);
        await login.click();
    }

    async verifyLoginPageLoad(login:string){
        const loginLable=this.lbl_login;
        await expect(loginLable).toHaveText(login)

    }
    async verifyDisplayofLoginValidationMessage(message:string){
        const validationMessage=this.lbl_loginValidationMessage;
        expect(validationMessage).toHaveText(message)
    }
}