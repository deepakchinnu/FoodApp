import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { IUserLogin } from '../shared/interfaces/IUserLogin';
import { IUserRegister } from '../shared/interfaces/IUserRegister';
import { USER_LOGIN_USER, USER_REGISTER_URL } from '../shared/models/urls';
import { User } from '../shared/models/User';

const USER_KEY='User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalSorage());
  public userObservable:Observable<User>;
  constructor(private http:HttpClient,private toastrService:ToastrService) {
    this.userObservable = this.userSubject.asObservable();
  }


  public get currentUser():User{
    return this.userSubject.value;
  }

  login(userLogin:IUserLogin):Observable<User>{
    return this.http.post<User>(USER_LOGIN_USER,userLogin).pipe(
      tap({
        next:(user)=>{
          this.setUsesrToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to Foodmine ${user.name}!`,
            'Login Successful'
          )
        },
        error:(errorResponse)=>{
          this.toastrService.error(errorResponse.error,'Login Failed');
        }
      })
    );
  }

  register(userRegister:IUserRegister):Observable<User>{
    return this.http.post<User>(USER_REGISTER_URL,userRegister).pipe(
      tap({
        next:(user) => {
          this.setUsesrToLocalStorage(user);
          this.userSubject.next(user);
          this.toastrService.success(
            `Welcome to OurFood ${user.name}`,
            'Register Sucessful'
          )
        },
        error: (errorResponse) => {
          this.toastrService.error(errorResponse.error,
            'Register Failed')
        }
      })
    )
  }

  logout(){
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    window.location.reload();
  }

  private setUsesrToLocalStorage(user:User){
    localStorage.setItem(USER_KEY,JSON.stringify(user));
  }

  private getUserFromLocalSorage():User{
    const UserJson = localStorage.getItem(USER_KEY);
    if(UserJson){
      return JSON.parse(UserJson) as User;
    }
    return new User();
  }
}
