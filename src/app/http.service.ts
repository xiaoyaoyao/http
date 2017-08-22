/**
 * Created by Administrator on 2017/8/22 0022.
 */
import {Injectable} from '@angular/core';
import {Http, RequestOptionsArgs, Response} from '@angular/http';

import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

class Result {
  static readonly ERR_CODE_INVALID_CLIENT_ID = -99;
  userId: string;
  id: number;
  title: string;
  body: string;
  msg: string;
}

//服务端数据返回的格式
export class CommonResponse<T> {

  static readonly ERR_CODE_INVALID_CLIENT_ID = -99;

  success: boolean;

  data: T;

  msg: string;

  errcode: number;

  handle: number;
}

@Injectable()
export class HttpService {
  constructor(private _http: Http) {
  }

  get<T>(url: string, options?: RequestOptionsArgs): Observable<CommonResponse<T>> {
    options = options || {};
    options.withCredentials = true;
    return this._http.get(url, options)
      .map((res: Response) => this.parseResponse(res))
      .catch((err: any) => Observable.throw(err));
  }

  private parseResponse<T>(res: Response): CommonResponse<T> {
    try {
      const r: CommonResponse<T> = res.json();
      return r;
    } catch (error) {
      const ress = new CommonResponse<any>();
      ress['success'] = false;
      ress['msg'] = '解析返回异常数据';
      return ress;
    }
  }

  getData(): Observable<Result> {
    const url = 'http://jsonplaceholder.typicode.com/posts/1';
    return this.get(url).map((res: any) => res);
  }

}
