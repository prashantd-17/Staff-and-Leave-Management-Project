import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { LeaveDetails } from '../models/leave.model';
import { Observable } from 'rxjs';
import { UserData } from '../models/user.model';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  baseUrl:string = environment.apiUrl;
  httpHeaders:HttpHeaders = new HttpHeaders({'Content-Type':'application/json'});

  constructor(private http:HttpClient) { }

  getAllUsers(endPoint:string):Observable<UserData[]>{
    const url = this.baseUrl + endPoint;
    return this.http.get<UserData[]>(url,{headers : this.httpHeaders});
  }

  getCurrentUser(endPoint:string):Observable<UserData>{
    const url = this.baseUrl + endPoint;
    return this.http.get<UserData>(url,{headers:this.httpHeaders});
  }

  requestLeave(endPoint:string, body:LeaveDetails){
    const url = this.baseUrl + endPoint;
    return this.http.post(url,body,{headers : this.httpHeaders});
  }

  getMemberLeaveDetails(endPoint:string):Observable<LeaveDetails[]>{
    const url = this.baseUrl + endPoint;
    return this.http.get<LeaveDetails[]>(url,{headers : this.httpHeaders})
  }

  updateLeaveStatus(endPoint:string, status:string){
    const url = this.baseUrl + endPoint;
    return this.http.put(url,{status})
  }

  deleteStaffMember(endPoint:string){
    const url = this.baseUrl + endPoint;
    return this.http.delete(url);
  }

}
