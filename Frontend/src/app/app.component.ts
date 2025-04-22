import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Toast } from 'primeng/toast';


@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RouterModule, CommonModule, Toast],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {

  constructor(public router:Router){
    
  }
}
