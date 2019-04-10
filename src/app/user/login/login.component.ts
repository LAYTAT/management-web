import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../../shared/service/auth.service';
import {Router} from '@angular/router';
import {RoleName} from '../../shared/entity/role';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  loading = false;

  constructor(private authService: AuthService,
              private fb: FormBuilder,
              private router: Router) {
    this.loginForm = fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]]
    });
  }

  ngOnInit() {
  }

  onSubmit(): void {
    this.authService.logout();
    this.loading = true;
    this.authService.login(this.loginForm.get('username').value,
      this.loginForm.get('password').value)
      .subscribe(
        () => {
          const roles = this.authService.currentUser.roles;
          if (this.authService.redirectUrl) {
            this.router.navigate([this.authService.redirectUrl]);
          } else if (roles.find(role => role.roleName === RoleName.ROLE_DRIVER)) {
            this.router.navigate(['/']);
          } else if (roles.find(role => role.roleName === RoleName.ROLE_ADMIN ||
            role.roleName === RoleName.ROLE_BOSS)) {
            this.router.navigate(['/management']);
          }
        },
        () => {
          this.loading = false;
          this.loginForm.setErrors({'mismatchedPassword': true});
        }
      );
  }
}
