import { AbstractControl, ValidationErrors, ValidatorFn } from "@angular/forms";

export function passwordMatched():ValidatorFn{
  return(control:AbstractControl):ValidationErrors|null=>{
    let password = control.get("password")
    let confirmedpassword = control.get("confirmedpassword")
    
    if(!password||!confirmedpassword||!password.value||!confirmedpassword.value){
      return null;
    }

    let errVal = {'unMatchedPassword':{'pass':password.value,'confirm':confirmedpassword.value}}
    return password.value === confirmedpassword.value ? null : errVal
  }
}
