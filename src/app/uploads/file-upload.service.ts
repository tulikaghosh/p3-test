import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class FileUploadService {

  public files: any[] = [];
  baseUrl = "http://localhost:7777/file";


  constructor(private http: HttpClient) {
    this.files = [];
  }

  onFileChanged(event: any) {
    this.files = event.target.files;
  }

  onUpload(image: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', image);

    console.log("file-upload Service"+image);

    // let httpOptions = {
    //   headers: new HttpHeaders({
    //     'Accept': 'text/html, application/xhtml+xml, */*',
    //     'Content-Type': 'application/x-www-form-urlencoded'
    //   }),
    //   responseType: 'text'
    // };

    return this.http.post<any>(this.baseUrl + '/upload', formData);
  }
  // const formData = new FormData();
  // for (const file of this.files) {
  // formData.append(name, file, file.name);


}


// return this.http.post<string>(this.baseUrl + '/upload', formData, {
//   headers: new HttpHeaders({
//     'Accept': 'application/json',
//     'Content-Type': 'application/json'
//   })
// });

// {
//   headers: new HttpHeaders({
//     'Accept': 'text/html, application/xhtml+xml, */*',
//     'Content-Type': 'application/x-www-form-urlencoded'
//   }),
//   responseType: 'text'
// }