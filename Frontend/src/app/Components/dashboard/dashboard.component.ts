import { Component } from '@angular/core';
import { LeaveDetailsComponent } from '../leave-details/leave-details.component';
import { SidenavComponent } from '../sidenav/sidenav.component';
import { TopnavComponent } from '../topnav/topnav.component';

@Component({
  selector: 'app-dashboard',
  imports: [SidenavComponent, TopnavComponent, LeaveDetailsComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

}
