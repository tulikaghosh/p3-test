import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../users/auth.service';
import { TokenStorageService } from '../users/token-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

 
  isSuccessful = false;
  isSignUpFailed = false;

  form: any = {
   // user_id: 0,
    username: null,
    password: null,
    first_name: null,
    last_name: null,
    email: null,
    address: null, 
    contact: null
  };
  isLoginFailed = false;
  errorMessage = '';

  private roles: string[] = [];
  isLoggedIn = false;
  username?: string;
  showAdmin = false;
  currentUser: any;

  constructor(private router: Router, 
    private tokenStorageService: TokenStorageService,
    private authService: AuthService) { }

  ngOnInit(): void {
    this.isLoggedIn = !!this.tokenStorageService.getToken();
    if (this.tokenStorageService.getToken()) {
      this.isLoggedIn = true;
      this.roles = this.tokenStorageService.getUser().roles;
      this.currentUser = this.tokenStorageService.getUser();
    }
    if (this.isLoggedIn) {
      const user = this.tokenStorageService.getUser();
      this.roles = user.roles;
      this.username = user.username;
      this.showAdmin = this.roles.includes('ROLE_ADMIN');
    }
    this.currentUser = this.tokenStorageService.getUser();
  }

  logout(): void {
    this.tokenStorageService.signOut();
    window.location.reload();
  }

  
  onSubmit(): void {
    const { username, password } = this.form;

    this.authService.login(username, password).subscribe(
      data => {
        this.tokenStorageService.saveToken(data.accessToken);
        this.tokenStorageService.saveUser(data);

        this.isLoginFailed = false;
        this.isLoggedIn = true;
        this.roles = this.tokenStorageService.getUser().roles;
        this.username = this.tokenStorageService.getUser().username;
        setTimeout(() => {
          this.router.navigate(['/product']);
       }, 3000);
       setTimeout(() => {
        this.reloadPage();
     }, 3000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isLoginFailed = true;
      }
    );
  }

  reloadPage(): void {
    window.location.reload();
  }
  
  onSubmitregister(): void {
    const {first_name, last_name, username, email, password, address, contact } = this.form;

   

    this.authService.register(first_name, last_name, username, email, password, address, contact).subscribe(
      data => {
        console.log(data);
        this.isSuccessful = true;
        this.isSignUpFailed = false;
        setTimeout(() => {
          this.router.navigate(['/product']);
       }, 3000);
       setTimeout(() => {
        this.reloadPage();
     }, 3000);
      },
      err => {
        this.errorMessage = err.error.message;
        this.isSignUpFailed = true;
      }
    );
  }

}