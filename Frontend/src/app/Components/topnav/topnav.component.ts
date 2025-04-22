import { Component, effect, Input, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { UserService } from '../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { UserData } from '../../models/user.model';
import { UtilService } from '../../services/util.service';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-topnav',
  imports: [MatButtonModule, CommonModule, MatIcon],
  templateUrl: './topnav.component.html',
  styleUrl: './topnav.component.scss'
})
export class TopnavComponent implements OnInit {

  currentUser:any = {
    
  };
  activeMenu:string = ""
  sidebarOpen: boolean = false;

  constructor(private authService:AuthService, private userService:UserService, private utilService:UtilService){
    effect(() => {
      this.activeMenu = this.utilService.activeMenu();
    });
  }

  ngOnInit(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').user;
    // const userId = localStorage.getItem('id');
    // this.userService.getCurrentUser(`/users/singleUser/${userId}`).subscribe((res:any)=>{
    //   this.currentUser = res.user;
    // })
  }

  toggleSidebar(){
    this.utilService.toggleSidebar();
  }

  logout(){
    this.authService.logout()
  }

}
