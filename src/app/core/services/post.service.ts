import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  constructor(private http: HttpClient) { }

  private getHeaders(): HttpHeaders {
    let headers = new HttpHeaders();
    headers = headers.set('token', JSON.parse(localStorage.getItem('user') || '{}')['access_token']);
    return headers;
  }

  newPost(file: File | undefined, caption: String): Observable<any> {
    return this.http.post(`${environment.postApi}/posts`,
      {
        file: file!.name,
        caption: caption
      },
      {
        headers: this.getHeaders()
      }
    );
  }

  uploadPost(file: File | undefined, uri: string): Observable<any> {
    return this.http.put(`${environment.imageEndpoint}/${uri.split('/')[4]}`, file)
  }

  validatePost(generatedFilename: string | undefined): Observable<any> {
    return this.http.put(`${environment.postApi}/posts/validate`,
      {
        generated_filename: generatedFilename,
        uploaded: true
      },
      {
        headers: this.getHeaders()
      }
    );
  }

  getMyPost(): Observable<any> {
    return this.http.get(`${environment.postApi}/posts/me`, { headers: this.getHeaders() });
  }
}
