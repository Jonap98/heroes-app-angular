import { Component } from '@angular/core';
import { AuthServiceService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styles: [
  ]
})
export class LoginPageComponent {

  constructor(
    private authService: AuthServiceService,
    private router: Router
  ) {}

  onLogin(): void {
    this.authService.login('jona@gmail.com', 'vrenibui3vr4tcrv56hyv65tc.34cv64y54ct34rx43ctv5b6.hcv5cg54gx453g356g4g')
      .subscribe( user => {
        this.router.navigate(['/'])
      })
  }

}
