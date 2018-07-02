import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpHandler, HttpRequest, HttpEvent, HttpResponse }
  from '@angular/common/http';

import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/do';



@Injectable()
export class JWTInterceptor implements HttpInterceptor {


  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
   // alert(window.localStorage.getItem("id_token"));
    req = req.clone({
      setHeaders: {
        Authorization: 'Bearer '+ window.localStorage.getItem("id_token")
      }
    });
    console.log("REQUEST--");
    console.log(req);
    return next.handle(req).do((event: HttpEvent<any>) => {
        if (event instanceof HttpResponse) {
          // do stuff with response if you want
          console.log("RESPONSE--");
          console.log(event);
        }
      }, (err: any) => {
        console.log(err);
      }
  );
}

}