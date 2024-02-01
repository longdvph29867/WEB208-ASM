import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { User } from '../../../../types/user';
import { UserService } from '../../../../services/user/user.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { ToasterService } from '../../../../services/toaster/toaster.service';
import { CommonModule } from '@angular/common';
import { ConfirmBoxComponent } from '../../../../components/confirm-box/confirm-box.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-list-users',
  standalone: true,
  imports: [RouterLink, CommonModule],
  templateUrl: './list-users.component.html',
  styleUrl: './list-users.component.css'
})
export class ListUsersComponent {
  usersList:User[]=[];
  error: string = '';
  constructor(
    private categoryService: UserService,
    private spinner: NgxSpinnerService,
    private notification: ToasterService,
    private dialog: MatDialog
    ) {}

  ngOnInit(): void {
    this.getAllMovies();
  }
  getAllMovies() {
    this.spinner.show();
    this.categoryService.getAll().subscribe((data: any) => {
      this.usersList = data
      this.spinner.hide();
    }, (error) => {
      this.spinner.hide();
      this.error = error.message
    })
  }
  delete(id: string){
    this.categoryService.delete(id).subscribe(res =>{
      this.usersList = this.usersList.filter(item=>item.id !==id);
      this.notification.success('User delete Successfull!', '')
    })
  }

  openConfirmBox(id: string) {
    const dialogRef = this.dialog.open(ConfirmBoxComponent, {
      width: '300px',
      data: { title: 'Bạn có chắc chắn xoá không!', message: ''}
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.delete(id)
      } else {
      }
    });
  }
}
