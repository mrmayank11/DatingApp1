import { inject } from '@angular/core';
import { CanActivateFn } from '@angular/router';
import { AccountService } from '../_services/account.service';
import { ToastrService } from 'ngx-toastr';
import { map } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {
  const accountService=inject(AccountService);
  //why inject is used?
  // it is not a class so injection cannot happen in the usual way using the of the constructor so here "inject" is used
  const toastr=inject(ToastrService);

  return accountService.currentUser$.pipe(
    map((user)=>{
      if(user)return true;
      else toastr.error('you shall not pass')
      return false;
    })
  )

};
