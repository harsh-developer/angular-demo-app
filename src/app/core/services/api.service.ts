import { Injectable, Injector } from "@angular/core";
import { environment } from "../../../environments/environment";
import { Utilities } from "../utils/utilities";
// import { LoaderService } from "./loader-service";
// import { ToastrService } from 'ngx-toastr';
import { GlobalComponent } from "../../global-component";
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

declare var $: any;
export class RequestData {
  constructor(public data: any, public token?: string) { }
}
@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private sendData: RequestData = new RequestData({}, "");
  constructor(private http: HttpClient, private utils: Utilities) { }


  makePostRequest(method: string, params: any) {
    return new Promise((resolve, reject) => {
      const headers: any = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("source", "app");
      params = params || {};
      this.sendData.data = params;
      const jwToken = localStorage.getItem('token');
      const logid: any = environment.hasOwnProperty('log_id');


      //   if (logid) {
      //     this.sendData['log_id'] = environment['log_id'];
      //   }
      if (jwToken) {
        this.sendData.token = jwToken;
      }
      this.http
        .post(environment.api_url + method, JSON.stringify(this.sendData), {})
        // .pipe((res: any) =>  res.json())
        .subscribe({
          next: (data: any) => {
            // var jsondata = this.utils.base64_decode(data);
            resolve(data);
          },
          error: err => {
            if (err.status == 401) {
              resolve(err);
              window.location.href = "/login";
            } else if ((err.status == 500 || err.status == 501)) {
              this.errorLog(err);
              resolve({ error: true, msg: 'Internal Server Error' });
            } else if (err.status === 503) {
              this.errorLog(err);
              resolve({ error: true, msg: 'Server Maintenance error' });
            } else if (err.status) {
              this.errorLog(err);
              resolve({ error: true, msg: 'Unexpected Error' });
            } else {
              this.errorLog(err);
              resolve({ error: true, msg: 'Internet Connection Lost or Backend Not Connected', status: 400 });
            }
          }
        });
    });
  }

  makeGetRequest(method: string, rparams: any) {
    return new Promise((resolve, reject) => {
      const headers: any = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("source", "app");
      rparams = rparams || {};
      this.http
        .get(environment.api_url + method, { params: rparams })
        // .pipe((res: any) => res.json())
        .subscribe({
          next: (data: any) => {
            var jsondata = this.utils.base64_decode(data.response);
            resolve(JSON.parse(jsondata));
          },
          error: err => {
            if (err.status == 401) {
              resolve(err);
              //   this._loaderSerive.hide();
              // this.jwtService.destroyToken();
              window.location.href = "/login";
            } else if ((err.status == 500 || err.status == 501)) {
              this.errorLog(err);
              resolve({ error: true, msg: 'Internal Server Error' });
            } else if (err.status) {
              this.errorLog(err);
              resolve({ error: true, msg: 'Unexpected Error' });
            } else {
              this.errorLog(err);
              resolve({ error: true, msg: 'Internet Connection Lost or VPN Not Connected', status: 400 });
            }
          }
        })
    })
  }

  makePostErrorRequest(method: string, params: any) {
    return new Promise((resolve, reject) => {
      const headers: any = new Headers();
      headers.append("Content-Type", "application/json");
      headers.append("source", "app");
      params = params || {};
      this.sendData.data = params;
      //   const jwToken = this.jwtService.getToken();
      const jwToken = localStorage.getItem('token');
      if (jwToken) {
        this.sendData.token = jwToken;
      }
      this.http
        .post(environment.api_url + method, JSON.stringify(this.sendData), {})
        // .pipe((res: any) => res.json())
        .subscribe({
          next: (data: any) => {
            var jsondata = this.utils.base64_decode(data.response);
            resolve(JSON.parse(jsondata));
          },
          error: err => {
            if (err.status == 401) {
              resolve(err);
              //   this._loaderSerive.hide();
              //   this.jwtService.destroyToken();
              window.location.href = "/login";
            } else if ((err.status == 500 || err.status == 501)) {
              resolve({ error: true, msg: 'Internal Server Error' });
            } else if (err.status) {
              resolve({ error: true, msg: 'Unexpected Error' });
            } else {
              resolve({ error: true, msg: 'Internet Connection Lost or VPN Not Connected', status: 400 });
            }
          }
        });
    });
  }

  errorLog(data) {
    this.makePostErrorRequest('saveErrorLog', { data: data });
  }

  showNoInternetConnectionMessage() {
    const locations = new Observable((observer) => {
      var noInternetModal = document.getElementById('noInternetModal');
      if (!noInternetModal) {
        noInternetModal = this.initNoInternetModal();
      }
      var confirmBox = $("#internet-message-overlay");
      confirmBox.find(".try-again-btn").unbind().click(function () {
        if (window.navigator.onLine) {
          observer.next(true);
          confirmBox.hide();
        } else {
          observer.next(false);
          //   this.toastr.error("Internet Connection Lost or VPN Not Connected !");
        }
      }.bind(this));
      confirmBox.show();
    });
    return locations;
  }

  initNoInternetModal() {
    var modal = document.createElement('div');
    modal.setAttribute('id', 'internet-message-overlay');
    var html =
      ' <div id = "noInternetModal">' +
      ' <div class="header"></i>Internet Connection or VPN Error</div>' +
      ' <div class="body"><i class="fa fa-times-circle text-danger m-right-5"><strong></i>You are not connected with internet. <br> &nbsp;&nbsp;&nbsp;&nbsp;Please check your internet connection or VPN !</strong></div>' +
      ' <div class="footer pull-right"><button class="btn btn-primary btn-xs try-again-btn">Save Again</button></div>' +
      '</div>';
    modal.innerHTML = html
    document.body.appendChild(modal);
    return modal;
  }
}
