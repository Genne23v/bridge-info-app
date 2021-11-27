import { Component, OnInit } from '@angular/core';
import { User } from '../user';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public user: User;
  public error: string;

  constructor(private auth: AuthService, private router: Router) {}

  ngOnInit(): void {
    this.user = new User();
  }

  onSubmit(): void {
    this.auth.login(this.user).subscribe(
      () => this.router.navigate(['/bridges']),
      (err) => {
        this.error = err.error.message;
      }
    );
  }
}
