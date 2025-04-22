import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent implements OnInit {

  registrationForm!:FormGroup;
  loginForm!:FormGroup;
  showPassword:boolean = false;
  imageString:string | null | ArrayBuffer = '';
  addUser:boolean = false;
  department:string[] = ["JavaScript", "Python", "Java", "Machine Learning", "AI", "Big Data", "Data Analyst", "Sales"]

  constructor(private fb:FormBuilder, private authService:AuthService, private router:Router, private route: ActivatedRoute, private messageService:MessageService){}

  ngOnInit(): void {
    this.registrationForm = this.fb.group({
      fullName: ["", Validators.required],
      userName: ["", Validators.required],
      email: ["", [Validators.required, Validators.email]],
      contactNumber: ["", [Validators.required, Validators.pattern(/^\d{10}$/)]],
      department: ["", Validators.required],
      role: ["", Validators.required],
      password: ["", [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/)]],
      profileImage: [null],
    });

    this.route.queryParams.subscribe(params => {
      this.addUser = params['add']
    });

    if(this.addUser){
      this.registrationForm.removeControl('department')
    }


  }

  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imageString = reader.result;
      };
    }
  }
  
  onSubmit(){
    if (this.registrationForm.invalid) {
      this.registrationForm.markAllAsTouched();
      return;
    }
    const modifiedData = {
      ...this.registrationForm.value,
      profileImage : this.imageString,
    }
    this.addUser ? modifiedData.department = 'staff' : null;
    this.authService.registerUser("/auth/register", modifiedData).subscribe((res:any)=>{
      if(res){
        this.addUser ? this.router.navigate(['/dashboard']) : this.router.navigate(['/login']);
        this.messageService.add({
          severity: 'success',
          summary: 'Success!',
          detail: 'User Registered Successfully!',
          life: 3000,
        });
      }
    })
  }

}
