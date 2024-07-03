import { HttpClient , HttpEvent, HttpHeaders, HttpRequest} from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Randonneur } from '../models/randonneur';
import { Observable, Subject, catchError } from 'rxjs';
import { ProcessHttpmsgService } from './process-httpmsg.service';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class RandonneurServService {
  allRandonneurs: Subject<any> = new Subject<any>()
 
  httpOptions={
    headers:new HttpHeaders({'Content-Type':'application/json'}),
    withCredentials: true
  };
  constructor(private http: HttpClient,  @Inject('BaseURL')private baseUrl:string, private processHTTPMsgService : ProcessHttpmsgService
  ) { }
  //operation getRandonneur
   getRandonneur(){
    const url=this.baseUrl+"getAllRandonneurs";
    return this.http.get<Randonneur[]>(url)
  }
  //operation addRandonneur
  addRandonneur(randonneur:any) {
    const url=this.baseUrl+"addRandonneur"
    return this.http.post(url,randonneur)

  }
//operation deleteRandonneur 

  deleteRandonneur(idRandonneur:number):Observable<Randonneur>
  {
  const url=this.baseUrl+"DeleteRandonneur/"+idRandonneur
   return this.http.delete<Randonneur>(url)
 }
 updateRandonneur(idRandonneur:number){ 
  const url=this.baseUrl+"updateRandonneur/"+idRandonneur
  return this.http.patch(url,idRandonneur)
}
uploadUserImage(idRandonneur:any,image:File): Observable<HttpEvent<{}>> {
  const formData:FormData=new FormData();
  formData.append('image',image)

  const url=this.baseUrl+"/uploadRandonneurImage/"+idRandonneur
  const req=new HttpRequest('POST',url,formData,{reportProgress:true,responseType:'text'})
  return this.http.request(req);
}

getRandonneurImageURL(idRandonneur: number): Observable<string> {
 
  const url=this.baseUrl+"/getRandonneurImageURL/"+idRandonneur
  return this.http.get<string>(url);
}
getRandonneurById(idRandonneur:number){
  const url=this.baseUrl+"/getRandonneur/"+idRandonneur
  return this.http.get(url)
}
  
  dispatchGetAllRandonneur(){
    this.getRandonneur().subscribe(data =>{
      this.setAllRandonneurs(data)
    })
  }
  setAllRandonneurs(randonneurs:any){
    this.allRandonneurs.next(randonneurs)
  }
  
      
}
