import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { UserData } from '../models/user.model';
import { MessageService } from 'primeng/api';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient, private router:Router, private messageService:MessageService) { }

  // baseUrl:string = 'http://localhost:3000';
  baseUrl:string = environment.apiUrl;

  httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  registerUser(endPoint:string, body:UserData){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,body,{headers:this.httpHeaders})
  }

  loginUser(endPoint :string, body:any){
    // return this.http.get(`${this.baseUrl}/users?userName=${userName}`).pipe(
    //   map((users:any) => {
    //     if(users[0]?.userName === userName && users[0]?.password === password){
    //       const token = `SAMPLE_TOKEN${new Date().getTime()}`
    //       localStorage.setItem('authToken',token)
    //       localStorage.setItem('id', users[0]?.id);
    //       localStorage.setItem('department', users[0]?.department)
    //       return {success : true, role : users[0]?.role, department : users[0]?.department, token}
    //     }else{
    //       return {success : false, message : 'User does not exists'}
    //     }
    //   })
    // )
    const url = this.baseUrl + endPoint;
    return this.http.post(url, body)
  } 

  logout() {
    localStorage.removeItem('id');
    this.router.navigate(['/login']);
    this.messageService.add({
      severity: 'success',
      summary: 'Success!',
      detail: 'User logged out Successfully!',
      life: 3000,
    });
  }

}
