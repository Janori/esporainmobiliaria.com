import { Pipe, PipeTransform } from '@angular/core';
import { Service } from '../shared/services/Service';
import { Http, Headers } from '@angular/http';

declare var lscache: any;

@Pipe({
  name: 'enumWs'
})
export class EnumWsPipe implements PipeTransform {

  constructor(private http:Http){}

  transform(value: any, url:string): any {
    let headers = new Headers();
    headers.append("Authorization", lscache.get('authToken'));
    let cUrl = new Service().url + url;

    return this.http.get(cUrl, { headers })
    .map(res=>{
      if(res.json().status){
        let dic:IKeyValue[] = res.json().data;
        for(let row of dic){
          if(row.key == value){
            return row.value;
          }
        }
        return value;
      }else{
        return value;
      }
    });
  }

}

interface IKeyValue{
  key:string,
  value:string
}
