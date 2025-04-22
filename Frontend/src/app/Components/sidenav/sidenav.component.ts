import { CommonModule } from '@angular/common';
import { Component, effect, OnInit } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { Router, RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { UserService } from '../../services/user.service';
import { UserData } from '../../models/user.model';
import { UtilService } from '../../services/util.service';

@Component({
  selector: 'app-sidenav',
  imports: [CommonModule, RouterModule, MatIconModule,ButtonModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {

    currentUser:any = {}
    activeMenu:string = "";
    selectedMenuOption:string = 'Dashboard'
    sidebarOpen: boolean = false;

  constructor(public router: Router, private userService:UserService, public utilService:UtilService){
    effect(() => {
      this.activeMenu = this.utilService.activeMenu();
    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').user;
    // this.userService.getCurrentUser(`/users/singleUser/${this.currentUser._id}`).subscribe((res:any) => {
    //   this.currentUser = res.user
    //   console.log('sdenav', this.currentUser)
    // });

    this.utilService.sidebarOpen$.subscribe((isOpen) => {
      this.sidebarOpen = isOpen;
      console.log(isOpen)
    });
  }


  toggleSidebar(){
    this.utilService.toggleSidebar();
  }

  closeOnMobile() {
    if (window.innerWidth < 768) {
      this.sidebarOpen = false;
    }
  }
  
  setActiveMenu(menu: string) {
    this.utilService.setActiveMenu(menu)
  }
  
}
