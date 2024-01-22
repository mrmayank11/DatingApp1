// import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AccountService } from './_services/account.service';
import { User } from './_models/user';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Dating App';
  users: any;


  constructor(private accountService: AccountService) {

  }
  ngOnInit(): void {
    // this.getUser();
    this.setCurrentUser();
  }
  // getUser(){
  //   return this.http.get('http://localhost:5000/api/users').subscribe({
  //     next:(res)=> {
  //       console.log(res);
  //       this.users=res;

  //     },
  //     error:(error)=>console.log(error),
  //     complete:()=> console.log("Requets has completed")

  //   })
  // }

  setCurrentUser() {
    const userString = localStorage.getItem('user');
    console.log(userString);

    if (userString == null) return;
    const user: User = JSON.parse(userString);

    this.accountService.setCurrentUser(user);
    console.log(user);

  }
}
