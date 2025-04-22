import { Component, effect, OnInit, ViewChild } from '@angular/core';
import { LeaveDetails } from '../../models/leave.model';
import { UserService } from '../../services/user.service';
import { Table, TableModule } from 'primeng/table';
import { UtilService } from '../../services/util.service';
import { CommonModule } from '@angular/common';
import { IconFieldModule } from 'primeng/iconfield';
import { InputIconModule } from 'primeng/inputicon';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { UserData } from '../../models/user.model';
import { MessageService, SortEvent } from 'primeng/api';
import { CardModule } from 'primeng/card';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { leaveDateValidator } from '../leaveDateValidator';
import { NgbDatepickerModule } from "@ng-bootstrap/ng-bootstrap";
import { Tag } from 'primeng/tag';

@Component({
  selector: 'app-leave-details',
  imports: [TableModule, CommonModule,IconFieldModule, InputTextModule, InputIconModule, ButtonModule, CardModule, ReactiveFormsModule,NgbDatepickerModule, FormsModule, Tag],
  templateUrl: './leave-details.component.html',
  styleUrl: './leave-details.component.scss'
})
export class LeaveDetailsComponent implements OnInit {

  leavesForm!:FormGroup;
  allUsers:UserData[] = []
  leaveDetails:LeaveDetails[] = [];
  staffMembers:UserData[] = [];
  currentUser:any = {};
  activeMenu:any = ''
  department:string | null = ''

  @ViewChild('dt1') dt1: Table | undefined;
  @ViewChild('dt2') dt2: Table | undefined;
  userIdToDelete: string = '';
  showConfirmationModal: boolean = false;
  showModal: boolean = false;
  selectedMember: any =  {
    
  };
  pendingLeavesCount: number = 0;
  pendingLeavesCountStaff: number = 0;
  approvedLeavesCount: number= 0;
  approvedLeavesCountStaff: number= 0;
  rejectedLeavesCount: number = 0;
  rejectedLeavesCountStaff:number = 0;
  leaveRequest:boolean = false;
  isHod:boolean = false;

  constructor(private userService:UserService, private utilService:UtilService, private messageService:MessageService, private fb:FormBuilder){
    effect(() => {
      this.activeMenu = this.utilService.activeMenu();
    });
  }

  ngOnInit(): void {
    this.currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}').user;
    this.isHod = this.currentUser.role === 'head' ? true : false
    // this.getCurrentUserDetails()
    this.department = localStorage.getItem('department')
    this.userService.getAllUsers("/users").subscribe((res:UserData[])=>{
      this.staffMembers = res.filter((user:UserData) => user.department === this.department && user.role === 'staff');
    })

    this.getLeaveDetails();
    this.leavesForm = this.fb.group({
      leaveFrom : ['', Validators.required],
      leaveTo : ['', Validators.required],
      reason : ['', Validators.required],
    },
    {
      validators: leaveDateValidator(),
    })
  }

  customSort(event: SortEvent) {
    if (!event.data) return;
  
    const statusPriority: Record<string, number> = {
      pending: 1,
      approved: 2,
      rejected: 3
    };
  
    const sortOrder = event.order ?? 1; 
  
    event.data.sort((a, b) => {
      const value1 = statusPriority[a.status] ?? 99;
      const value2 = statusPriority[b.status] ?? 99;
  
      let result = 0;
      if (value1 < value2) result = -1;
      else if (value1 > value2) result = 1;
  
      return sortOrder * result;
    });
  }
  
  updateLeaveStatus(id: string, status: string) {
    this.userService.updateLeaveStatus(`/leaves/updateStatus/${id}`, status ).subscribe({
      next: () => {
        this.getLeaveDetails();
        this.messageService.add({
          severity: 'success',
          summary: 'Saved!',
          detail: 'Leave Status has been updated!',
          life: 3000,
        });
      },
      error: (err) => {
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'Error updating leave status',
          life: 3000,
        });
        console.error('Error updating leave status:', err);
      }
    });
  }

  getLeaveDetails() {
    this.userService.getMemberLeaveDetails('/leaves/leaveDetails').subscribe((res: LeaveDetails[]) => {
      this.leaveDetails = res.filter((leave:any)=> leave.department === this.department);
      this.pendingLeavesCountStaff = this.leaveDetails.filter((count : LeaveDetails) => count.status === 'pending').length;
      this.approvedLeavesCountStaff = this.leaveDetails.filter((count : LeaveDetails) => count.status === 'approved').length;
      this.rejectedLeavesCountStaff = this.leaveDetails.filter((count : LeaveDetails) => count.status === 'rejected').length;

      this.approvedLeavesCount = this.leaveDetails.filter(((leave:LeaveDetails) => leave.status === 'approved')).length;
      this.rejectedLeavesCount = this.leaveDetails.filter(((leave:LeaveDetails) => leave.status === 'rejected')).length;
      this.pendingLeavesCount = this.leaveDetails.filter(((leave:LeaveDetails) => leave.status === 'pending')).length;
    });
  }

  // getCurrentUserDetails(){
  //   const userId = localStorage.getItem('id')
  //   this.userService.getCurrentUser(`/users/singleUser/${userId}`).subscribe((res:any)=>{
  //     this.currentUser = res.user;
  //     console.log('current user', res)
  //     this.isHod = res.user.role === 'head' ? true : false
  //   })
  // }

    filterGlobal($event: any, stringVal: string, type:string) {
      type === 'leave' ? this.dt1!.filterGlobal($event.target.value, stringVal) : this.dt2!.filterGlobal($event.target.value, stringVal);
    }

    openConfirmationModal(userId: string) {
      this.userIdToDelete = userId;
      this.showConfirmationModal = true;
    }

      // view user details 
  viewDetails(id:string){
    this.showModal = true
    this.selectedMember = this.staffMembers.filter((user:any)=> user._id === id)[0];
  }

  removeStaffMember(){
    this.userService.deleteStaffMember(`/users/deleteUser/${this.userIdToDelete}`).subscribe({
      next : () => {
        this.staffMembers = this.staffMembers.filter((user:any) => user._id !== this.userIdToDelete);
        this.messageService.add({
          severity: 'success',
          summary: 'Deleted!',
          detail: 'User Deleted Successfully!',
          life: 3000,
        });
        this.showConfirmationModal = false
      },
      error : (err) =>{
        this.messageService.add({
          severity: 'error',
          summary: 'Error!',
          detail: 'Error deleting staff Member',
          life: 3000,
        });
        console.error("Error deleting staff Member", err)
      }
    })
}

requestLeave(){
  const modifiedForm = {
    userId : this.currentUser?._id,
    fullName : this.currentUser?.fullName,
    status : 'pending',
    department : this.currentUser?.department,
    ...this.leavesForm.value
  }
  this.userService.requestLeave('/leaves/requestLeave',modifiedForm).subscribe(res => {})
  this.getLeaveDetails();
  this.messageService.add({
    severity: 'success',
    summary: 'Success!',
    detail: 'Leave Requested Successfully!',
    life: 3000,
  });
  this.leavesForm.reset();
  this.leaveRequest = false;
}

getTagSeverity(status: string): 'success' | 'warn' | 'danger' | 'secondary' | 'info' | 'contrast' | undefined {
  switch (status) {
    case 'accepted':
    case 'approved':
      return 'success';
    case 'pending':
      return 'warn';
    case 'rejected':
      return 'danger';
    default:
      return 'secondary';
  }
}


  clear(table: Table) {
    table.clear();
}
  formatDate(dateObj: { year: number, month: number, day: number }) {
    return this.utilService.formatDate(dateObj);
   }  

}
