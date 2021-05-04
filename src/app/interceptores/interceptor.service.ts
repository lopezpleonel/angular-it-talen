import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListBanksService } from '../services/list-banks.service';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root'
})
export class InterceptorService implements HttpInterceptor {

  excludeUrls: Array<string>;

  constructor(private userService: UserService,
              private listBankService : ListBanksService) { }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

    if (req.url !== this.listBankService.getUrlExterna()) {
      let tokenizeReq = req.clone({
          headers: req.headers.set('Authorization', `Bearer ${this.userService.obtenerToken()}`),
      });
      return next.handle(tokenizeReq);
    } else {
      return next.handle(req);
    }

  }


}
