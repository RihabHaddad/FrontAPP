import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { UserModel } from './user.model';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  userList: UserModel []; // Remplacez le type "any[]" par le modèle approprié pour votre application

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.getUserList();
  }

  getUserList() {
    this.userService.getUsers().subscribe(
      (users) => {
        this.userList = users;
      },
      (error) => {
        console.error(error);
      }
    );
  }
}


