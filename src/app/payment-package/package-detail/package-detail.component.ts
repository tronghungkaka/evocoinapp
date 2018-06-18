import { Component, OnInit, Output} from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import * as $ from 'jquery';

import * as AppUtils from '../../utils/app.utils';
import { UserService, AuthenticationService } from '../../registration-login/_services';
import { User } from '../../registration-login/_models';

@Component({
    selector: 'app-package-detail',
    styleUrls: ['./package-detail.component.css'],
    templateUrl: './package-detail.component.html'
})
export class PackageDetailComponent implements OnInit {
    packagename: string;
    packagefullname: string;
    color: string;

    unamePattern = AppUtils.UNAME_PATTERN;
    pwdPattern = AppUtils.PWD_PATTERN;
    mobnumPattern = AppUtils.MOBNUM_PATTERN;
    emailPattern = AppUtils.EMAIL_PATTERN;

    personal_error: string;
    account_error: string;
    error: boolean;

    registered_email_error: boolean = null;
    registered_phone_error: boolean = null;
    registered_username_error: boolean = null;

    isPasswordMatching: boolean = null;

    userForm: FormGroup;
    isValidFormSubmitted = null;

    constructor(private router: Router, route: ActivatedRoute, form: FormBuilder, private userService: UserService, private authenticationService: AuthenticationService) {
        this.packagename = route.snapshot.params['name'];
        if(this.packagename === AppUtils.FREE_PACKAGE) {
            this.packagefullname = AppUtils.FREE_PACKAGE_DETAIL;
            this.color = AppUtils.FREE_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.GOLD_PACKAGE) {
            this.packagefullname = AppUtils.GOLD_PACKAGE_DETAIL;
            this.color = AppUtils.GOLD_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.DIAMOND_PACKAGE) {
            this.packagefullname = AppUtils.DIAMOND_PACKAGE_DETAIL;
            this.color = AppUtils.DIAMOND_PACKAGE_COLOR;
        } else if(this.packagename === AppUtils.SUPERVIP_PACKAGE) {
            this.packagefullname = AppUtils.SUPERVIP_PACKAGE_DETAIL;
            this.color = AppUtils.SUPERVIP_PACKAGE_COLOR;
        } else {
            this.packagename = AppUtils.DIAMOND_PACKAGE;
            this.packagefullname = AppUtils.DIAMOND_PACKAGE_DETAIL;
            this.color = AppUtils.DIAMOND_PACKAGE_COLOR;
        }

        this.userForm = form.group({
            // firstname: ['', Validators.required],
            // lastname: ['', Validators.required],
            fullname: ['', Validators.compose([Validators.required])],
            email: ['', Validators.compose([Validators.required, Validators.pattern(this.emailPattern)])],
            phone: ['', Validators.compose([Validators.required, Validators.pattern(this.mobnumPattern)])],
            username: ['', Validators.compose([Validators.required, Validators.pattern(this.unamePattern)])],
            password: ['', Validators.compose([Validators.required, Validators.pattern(this.pwdPattern)])],
            // confirm_password: ['', Validators.compose([Validators.required])]
        });
    }

    ngOnInit() {

    }

    // checkPassword() {
    //     // console.log("password: " + $('#password')[0].value);
    //     // console.log("confirm password: " + $('#confirm_password')[0].value)
    //     if($('#password')[0].value === $('#confirm_password')[0].value) {
    //         this.isPasswordMatching = true;
    //     } else {
    //         this.isPasswordMatching = false;
    //     }
    //     // console.log("isPasswordMatching: " + this.isPasswordMatching);
    // }

    showPassword() {
        if($('#password')[0].type === 'password') {
            $('#password')[0].type = 'text';
        } else {
            $('#password')[0].type = 'password';
        }
    }

    validateUsername(username: string) {
        if(username === null || username.length == 0)
            return;
        this.userService.validateUsername(username).subscribe(
            res => this.registered_username_error = res
        );
    }

    validateEmail(email: string) {
        if(email === null || email.length == 0)
            return;
        this.userService.validateEmail(email).subscribe(
            res => this.registered_email_error = res
        );
    }

    validatePhone(phone: string) {
        if(phone === null || phone.length == 0)
            return;
        this.userService.validatePhone(phone).subscribe(
            res => this.registered_phone_error = res
        );
    }

    onFormSubmit() {
        this.isValidFormSubmitted = false;
        if (this.userForm.invalid) {
           return;
        }
        this.isValidFormSubmitted = true;
        let user: User = new User();
        user.fullName = this.userForm.value.fullname;
        user.email = this.userForm.value.email;
        user.phone = this.userForm.value.phone;
        user.username = this.userForm.value.username;
        user.password = this.userForm.value.password;
        user.role = AppUtils.Utilities.getRole(this.packagename);
        user.isExpired = true;
        user.isFreeTrial = true;
        user.isPaymentPending = false;
        console.log(JSON.stringify(user));
        this.userService.create(user).subscribe(
            res => {
                if (res) {
                    // console.log(JSON.stringify(res));
                    sessionStorage.setItem(AppUtils.STORAGE_ACCOUNT, JSON.stringify(res));
                    this.authenticationService.loggedInOutEvent.emit('created account');
                    if (this.packagename === AppUtils.FREE_PACKAGE)
                        this.router.navigate(['home']);
                    else 
                        this.router.navigate(['payment', this.packagename]);
                }
            }
        );
        this.userForm.reset();
    }

    get username() {
        return this.userForm.get('username');
    }

    get password() {
        return this.userForm.get('password');
    }

    get confirm_password() {
        return this.userForm.get('confirm_password');
    }

    get phone() {
        return this.userForm.get('phone');
    }

    get email() {
        return this.userForm.get('email');
    }
}