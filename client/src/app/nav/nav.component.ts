import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';
import { Router } from '@angular/router';
import { Toast, ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any = {}
  // currentUser$: Observable<User| null>=of(null);
  constructor(public accountService: AccountService, private router: Router, private toastr: ToastrService) {

  }

  ngOnInit(): void {
    // console.log('inside ngONinIt');

    // this.currentUser$=this.accountService.currentUser$;
  }

  login() {
    console.log("inside login method");

    this.accountService.login(this.model).subscribe({
      next: (res) => {
        console.log(res);
        this.router.navigateByUrl('/members')
        // console.log(user);
        // this.loggedIn=true;

      },
      error: err => {
        console.log(err);
        this.toastr.error(err.error);
      }

    })

    console.log("after login method");

  }

  logout() {
    this.accountService.logout();
    this.router.navigateByUrl('/')

    // this.loggedIn=false;
  }
}
