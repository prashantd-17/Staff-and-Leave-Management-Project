import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { NgbToastModule } from '@ng-bootstrap/ng-bootstrap';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-login',
  imports: [FormsModule, CommonModule, RouterModule, NgbToastModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  username:string = '';
  password:string = '';
  showPassword:boolean = false;
  activeMenu:string = 'dashboard'

  constructor(private authService:AuthService, private router:Router, private messageService:MessageService){}

  ngOnInit(): void {

  }

  // login(userName:NgModel, password:NgModel){
  //   userName.control.markAsTouched();
  //   password.control.markAsTouched();
  //   if(userName.valid || password.valid){
  //     this.authService.loginUser(this.username, this.password).subscribe((res)=>{
  //       if(res.success){
  //         this.router.navigate(['/dashboard'])
  //         this.messageService.add({
  //           severity: 'success',
  //           summary: 'Success!',
  //           detail: 'User Logged In Successfully!',
  //           life: 3000,
  //         });
  //       }else{
  //         this.router.navigate(['/login'])
  //         this.messageService.add({
  //           severity: 'error',
  //           summary: 'Error!',
  //           detail: 'User does not exists',
  //           life: 3000,
  //         });
  //       }
  //     },
  //     (err) => {
  //       console.log("Error logging in:", err);
  //       this.messageService.add({
  //         severity: 'error',
  //         summary: 'Error!',
  //         detail: 'Error logging in',
  //         life: 3000,
  //       });
  //       userName.control.setErrors({ invalid: true });
  //       password.control.setErrors({ invalid: true });
  //     })
  //   }
  // }

  login(){
    const body = {userName : this.username, password : this.password}
    this.authService.loginUser('/auth/login', body).subscribe({
     next : (res:any) => {
      console.log(res);
      localStorage.setItem('token', res.user.token);
      localStorage.setItem('id', res.user._id);
      localStorage.setItem('currentUser', JSON.stringify(res))
      localStorage.setItem('department', res.user.department)
      if (res.user) {
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User Logged In Successfully!',
          life: 3000,
        });
        this.router.navigate(['/dashboard']);
      }
     },
     error : (err) =>{
       // Show server error message
       this.messageService.add({
        severity: 'error',
        summary: 'API Error!',
        detail: err?.error?.message || 'Something went wrong. Please try again.',
        life: 3000,
      });
     }
    })
  }


    
}
