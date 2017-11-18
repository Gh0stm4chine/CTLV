import { Injectable } from '@angular/core';
import { GitHubUser } from './githubuser';
import { Http, Response } from '@angular/http';
import 'rxjs/add/operator/toPromise';

@Injectable()
export class GitHubService {

    private githubAPI = 'https://api.github.com/users';

    constructor (private http: Http) {}

    // get("/api/contacts")
    getName(name): Promise< GitHubUser> {
      return this.http.get(this.githubAPI + '/' + name)
                 .toPromise()
                 .then(response => response.json() )
                 .catch(this.handleError);
    }


    private handleError (error: any) {
      let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
      console.error(errMsg); // log to console instead
    }
}
