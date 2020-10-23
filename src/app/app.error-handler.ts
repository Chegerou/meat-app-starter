import { HttpErrorResponse } from '@angular/common/http';
import { Observable } from "rxjs/Observable";

export class ErrorHandler{
    static handleError(error: HttpErrorResponse | any){
        let errorMessage: string

        if(error instanceof HttpErrorResponse){
          const body = error.error;
            errorMessage = `${error.status}: ${error.url} - ${error.statusText || ''} ${body}`
        }
        console.log(errorMessage)
        return Observable.throw(errorMessage)
    }
}
