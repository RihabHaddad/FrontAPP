import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';

import { UserModel } from 'src/app/pages/user/user.model';
import { finalize, map } from 'rxjs/operators';


@Injectable({ providedIn: 'root' })
export class AuthenticationService {
    private currentUserSubject: BehaviorSubject<UserModel>;
    public currentUser: Observable<UserModel>;
    isLoadingSubject: BehaviorSubject<boolean>;
    isLoading$: Observable<boolean>;

   
      
  
    constructor(private http: HttpClient) {
        this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser') || 'null'));
        this.currentUser = this.currentUserSubject.asObservable();
        this.isLoadingSubject = new BehaviorSubject<boolean>(false);
        this.isLoading$ = this.isLoadingSubject.asObservable();

    }

    public get currentUserValue(): UserModel {
        return this.currentUserSubject.value;
    }
    private apiUrl = 'http://localhost:8002/api/auth';
    login(email: string, password: string) {
        this.isLoadingSubject.next(true);

        const body = { email, password };
    
        return this.http.post<UserModel>(`${this.apiUrl}/login`, body)
          .pipe(
            map(user => {
              localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next(user);
              return user;
            }),
            
          );
          
      }

   
}