import { Component } from '@angular/core';
import { IUser, UsersService } from '../../services/users-service';
import { Observable } from 'rxjs/internal/Observable';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-admin-portal',
  imports: [AsyncPipe],
  templateUrl: './admin-portal.html',
  styleUrl: './admin-portal.css',
})
export class AdminPortal {
  constructor(public usersService: UsersService) {}

  usersList$!: Observable<IUser[]>

  ngOnInit(): void {
    this.usersService.loadUsers();
    this.usersList$ = this.usersService.users$;
    console.log("Users loaded:", this.usersList$);
  }

  deleteUser(id: string) {
    console.log("Delete user:", id);

    this.usersService.deleteUser(id).subscribe(() => {
      this.usersService.loadUsers();
    });
  }
}
