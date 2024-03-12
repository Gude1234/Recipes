import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Subject, catchError, tap, throwError } from "rxjs";
import { User } from "./user.model";
import { Router } from "@angular/router";




interface authsignup{
    idToken:string
    email:string
    refreshToken:string
    expiresIn:string
    localId:string
    registered?:boolean
}

@Injectable({providedIn:'root'})

export class AuthService{

    user = new Subject<User>();
    token = null;
    private expirationDuration;

    constructor(private http:HttpClient,private router:Router){}

    logout(){
        this.user.next(null)
        this.router.navigate(['/auth'])
        localStorage.removeItem('userData')

        if(this.expirationDuration){
            clearTimeout(this.expirationDuration)
        }
        this.expirationDuration = null
    }

    autologin(){
        const userdata:{
            email:string
            id:string
            _token:string
            _tokenExpirationDate:string
        } = JSON.parse(localStorage.getItem('userData'))

        const loadeduser = new User(userdata.email,userdata.id,userdata._token, new Date(userdata._tokenExpirationDate))

        if(loadeduser.token){
            this.user.next(loadeduser)
        }
        const remainingexpiration = new Date(userdata._tokenExpirationDate).getTime() - new Date().getTime()
    }

    autologout(expirationtimer:number){
        this.expirationDuration = setTimeout(() => {
            this.logout()
        },expirationtimer );
    }


    signup(email:string, password:string){
        return this.http.post<authsignup>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCfTTvw1e1MMRAyQFboNxEIEtcic-zVSCQ',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(errorRes => {
            let errormessage='An error has occured!!!'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errormessage)
            }else{
                switch(errorRes.error.error.message){
                    case 'EMAIL_EXISTS':
                        errormessage = "This Email already exists"
                }
            }
            return throwError(errormessage)
        }), tap(resdata =>{
            const expirationdate = new Date(new Date().getTime() + +resdata.expiresIn*1000)
            const user = new User(resdata.email, resdata.localId, resdata.idToken, expirationdate)
            this.token = resdata.idToken
            this.user.next(user)
            this.autologout(+resdata.expiresIn*1000)
            localStorage.setItem('userData', JSON.stringify(user))
        }))
    }

    login(email:string, password:string){
        return this.http.post<authsignup>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCfTTvw1e1MMRAyQFboNxEIEtcic-zVSCQ',{
            email:email,
            password:password,
            returnSecureToken:true
        }).pipe(catchError(errorRes => {
            let errormessage='An error has occured!!!'
            if(!errorRes.error || !errorRes.error.error){
                return throwError(errormessage)
            }else{
                switch(errorRes.error.error.message){
                    case 'INVALID_LOGIN_CREDENTIALS':
                        errormessage = "Invalid Login Credentials"
                }
            }
            return throwError(errormessage)
        }), tap(resdata =>{
            const expirationdate = new Date(new Date().getTime() + +resdata.expiresIn*1000)
            const user = new User(resdata.email, resdata.localId, resdata.idToken, expirationdate)
            this.token = resdata.idToken
            this.user.next(user)
            this.autologout(+resdata.expiresIn*1000)
            localStorage.setItem('userData', JSON.stringify(user))
        }))
    }
}