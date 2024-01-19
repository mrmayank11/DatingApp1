import { Component } from '@angular/core';
import { AccountService } from '../_services/account.service';
import { Observable, of } from 'rxjs';
import { User } from '../_models/user';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent {
  model: any={}
  // currentUser$: Observable<User| null>=of(null);
  constructor(public accountService: AccountService){
    
  }

  ngOnInit():void{
    // console.log('inside ngONinIt');
    
    // this.currentUser$=this.accountService.currentUser$;
  }
  // getCurrentUser(){
  //   console.log(this.loggedIn);
    
  //   return this.accountService.currentUser$.subscribe({
  //     next: user=>{
  //       console.log(user);
  //       this.loggedIn=!!user} ,
  //     error: err=>console.log(err)
  //   })
  // }
  login(){
    this.accountService.login(this.model).subscribe({
      next:(res)=>{
        console.log(res);
        // console.log(user);
        // this.loggedIn=true;

      },
      error: err=>console.log(err)
      
    })
  }

  logout(){
    this.accountService.logout();
    // this.loggedIn=false;
  }
}
