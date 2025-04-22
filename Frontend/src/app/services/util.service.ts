import { Injectable, signal } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UtilService {

  constructor() { }
  private _activeMenu = signal<string>('Dashboard');
  private _activeTab = signal<boolean>(false);

  setActiveMenu(menu: string) {
    this._activeMenu.set(menu);
  }

  get activeMenu() {
    return this._activeMenu.asReadonly();
  }


  setActiveTab(tab: boolean) {
    this._activeTab.set(tab);
  }

  get activeTab() {
    return this._activeTab.asReadonly();
  }

  private sidebarOpenSubject = new BehaviorSubject<boolean>(false);
  sidebarOpen$ = this.sidebarOpenSubject.asObservable();

  toggleSidebar() {
    this.sidebarOpenSubject.next(!this.sidebarOpenSubject.value);
  }

  setSidebarState(state: boolean) {
    this.sidebarOpenSubject.next(state);
  }

  formatDate(dateObj: { year: number, month: number, day: number }): string {
    const months = [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ];
    const { year, month, day } = dateObj;
    return `${day} ${months[month - 1]} ${year}`;
  }
}
