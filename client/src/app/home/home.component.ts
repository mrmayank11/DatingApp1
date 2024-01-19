import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  registerMode = false;
  users: any;

  constructor(private http: HttpClient) {
  }

  ngOnInit(): void {
    this.getUsers();
  }

  getUsers() {
    this.http.get('http://localhost:5000/api/users').subscribe({
      next: (res) => {
        console.log(res);
        this.users = res;

      },
      error: (error) => console.log(error),
      complete: () => console.log("Requets has completed")

    })
  }
  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  cancelRegisterMode(a : boolean){
    this.registerMode=a;
  }

}
