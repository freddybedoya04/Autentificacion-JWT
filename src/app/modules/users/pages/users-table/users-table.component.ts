import { Component,OnInit } from '@angular/core';

import { DataSourceUser } from './data-source';
import { UsersService } from '@services/users.service';
import { AuthService } from '@services/auth.service';
import { User } from '@models/user.model';
@Component({
  selector: 'app-users-table',
  templateUrl: './users-table.component.html'
})
export class UsersTableComponent  implements OnInit {

  dataSource = new DataSourceUser();
  columns: string[] = ['id', 'avatar', 'name', 'email'];
  user:User | null=null;

  constructor(private _users:UsersService,private _auth:AuthService) {
    this.dataSource.init([
      
    ]);
  }
  ngOnInit(): void {
    this._users.getUser().subscribe(users=>{
      this.dataSource.init(users)  
      })
      this._auth.user$.subscribe(user=>{
        this.user=user;
      })
  }

}
