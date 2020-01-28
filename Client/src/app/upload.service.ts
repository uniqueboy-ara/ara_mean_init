import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { ApiResult } from "./models/apiResult";
import { API_ROUTE } from "./api-routes";

@Injectable({
  providedIn: "root"
})
export class UploadService {
  constructor(private http: HttpClient) {}

  BatchUpload(upload: File[]): Observable<ApiResult> {
    var formData: any = new FormData();
    upload.forEach(f => formData.append(f.name, f));
    return this.http.post<ApiResult>(API_ROUTE.MEDIA.upload, formData);
  }

  Upload(upload: File): Observable<ApiResult> {
    var formData: any = new FormData();
    formData.append(upload.name, upload);
    return this.http.post<ApiResult>(API_ROUTE.MEDIA.upload, formData);
  }
}
