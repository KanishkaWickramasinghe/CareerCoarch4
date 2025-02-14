import { expect, Locator, Page } from "@playwright/test";

export class NewUserPage{
    page:Page;
    readonly lbl_pageBanner:Locator;
    readonly input_userName:Locator;
    readonly input_password:Locator;
    readonly input_email:Locator;
    readonly dropdown_userRole:Locator;
    readonly dropdown_userRoleOption:Locator;
    readonly btn_submit:Locator;
    readonly btn_cancel:Locator;

    constructor(page:Page){
        this.page=page;
        this.lbl_pageBanner=page.locator("//div[@class='card-header']/h3");
        this.input_userName=page.locator("#username");
        this.input_password=page.locator("#password");
        this.input_email=page.locator("#email");
        this.dropdown_userRole=page.locator("#role");
        this.btn_submit=page.locator("#submit");
        this.btn_cancel=page.locator("//a[text()='Cancel']");
        this.dropdown_userRoleOption=page.locator("#role option");
    }

    async fillInNewUserLoginPredentials(uname:string){
        const userName=this.input_userName;
        const uniqUserName=uname+Math.floor(1000 + Math.random() * 9000);
        await userName.fill(uniqUserName)
        console.log("-------- New user username added. -----------")
        
        return uniqUserName;
    }

    async addNewUserPassword(pwd:string){
        const password=this.input_password;
        await password.fill(pwd);
        console.log("-------- New user password added. -----------")
    }

    async fillInNewUserEmail(email:string){
        const uemail=this.input_email;
        await uemail.fill(email);
        console.log("---- New user email address added. -----------")

    }

    async selectNewUserRole(role:string){
        const drpRole=this.dropdown_userRole;
        await drpRole.selectOption(role);
        const selectedValue = await drpRole.inputValue();
        expect(selectedValue).toBe(role)
        console.log("----------- New user's "+role+" user role selected -----------")
    }

    async createNewUsers(){
        const submit=this.btn_submit;
        await submit.click();
        console.log("--------- Submitted new user details. -------------")
    }

    async cancelNewUserCreation(){
        const cancel=this.btn_cancel;
        await cancel.click();
        console.log("--------- New user creation cancelled. -------------")
    }
}