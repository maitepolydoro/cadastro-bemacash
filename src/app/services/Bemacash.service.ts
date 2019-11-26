import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
//import { url } from 'inspector';
import { jsonAPIBemacash } from '../model/jsonAPI';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { JSONP_ERR_WRONG_RESPONSE_TYPE } from '@angular/common/http/src/jsonp';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { any } from 'prop-types';
import { error } from 'protractor';

@Injectable()

export class BemacashApi{

  constructor(private http: HttpClient) { }
  
  getHeaders() {
    return {
      headers: new HttpHeaders({
        // Adicionado para retirar as mensagens de erro de conexão do servidor
        'Content-Type': 'application/json; charset=utf8',
        'Authorization': 'PROTHEUS_INTEGRATION PROTHEUS:u98KDirFFJqYqWrTsiiBwvtKOa23VeZt'

      })
    };
  }  
  public async envioAPI(jsonAPI:jsonAPIBemacash): Promise<any> {
    const httpOptions = this.getHeaders();
    const url = `${environment.apiUrl}/integration/protheus/client/${jsonAPI.document}`
    console.log(url,JSON.stringify(jsonAPI),httpOptions)
    this.http.put(url,JSON.stringify(jsonAPI), httpOptions)
    .toPromise()
    .then((resp) => {return resp;})
    .catch ((err:HttpErrorResponse) => {return err.error.messages[0]})
  }
  

 
  

}
  /*

}
    
    public sendOrderRefund(): Promise<any> {
    const httpOptions = this.getHeaders();
    // const order = new Order();
    order.createdAt = DateTimeHelper.NowUTCLocal();
     return this.http
    .put(environment.apiURL + 'sale/sale-order-refund/' + orderId, order, httpOptions)
      .toPromise()
      .then((response: ResponseData) => {
            return response;
        })
      .catch((response: HttpErrorResponse) => {this.httpErrorResponseHandler(response);});
  }
*/