import { HttpClient, HttpEvent, HttpRequest } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FileUploadServiceService {

  constructor(private http: HttpClient,
    @Inject('BaseURL') private baseUrl: string) { }

   upload(file: File, id: number): Observable<HttpEvent<any>> {
  
    const formData: FormData = new FormData();
    formData.append('file', file); 

    const req = new HttpRequest('PATCH',
      `${this.baseUrl}storage/upload/${id}`,
      formData,
      {
        reportProgress: true,  
        responseType: 'json',  
        withCredentials: true 
      });

    return this.http.request(req);
  }
}
