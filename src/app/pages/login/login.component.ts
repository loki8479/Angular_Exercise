import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { DatabaseService } from 'src/app/services/database/database.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  public loginForm!: FormGroup;
  public userNotFound: boolean = false;

  constructor(
    private rouetr: Router,
    private formBuilder: FormBuilder,
    private databaseService: DatabaseService
  ) {
    this.createForm();
  }

  ngOnInit(): void { }

  createForm() {
    this.loginForm = this.formBuilder.group({
      username: new FormControl(null, Validators.compose([Validators.required])),
      password: new FormControl(null, Validators.compose([Validators.required]))
    });
  }

  authenticate() {
    const loggingUser: any = this.loginForm.value;
    this.databaseService.login().subscribe((people: any) => {
      people.results.forEach((user: any) => {
        if (loggingUser.username === user.name && loggingUser.password === user.birth_year) {
          // Navigate Here
          localStorage.setItem("user", JSON.stringify(user));
          this.loginForm.reset();
          this.rouetr.navigateByUrl("/search");
        } else {
          this.userNotFound = true;
          setTimeout(() => {
            this.userNotFound = false;
          }, 3000);
        }
      });
    }, (err: any) => {
      console.error("Error while getting people:::::::::::::::\n", err);
    });
  }
}
