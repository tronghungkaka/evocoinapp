import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { BollingerBandComponent } from './bollinger-band/bollinger-band.component';
import { LoginComponent } from './registration-login/login';
import { RegisterComponent } from './registration-login/register';
import { AuthGuard } from './registration-login/_guards';
import { DasboardComponent } from './registration-login/dasboard';
import { AdminAuthGuard } from './registration-login/_guards/admin-auth.guard';
import { UpdateComponent } from './registration-login/update';
import { BollingerBandStreamComponent } from './bollinger-band-stream/bollinger-band-stream.component';
import { DominanceComponent } from './dominance/dominance.component';
import { PackageComponent } from './payment-package/package/package.component';
import { PackageDetailComponent } from './payment-package/package-detail/package-detail.component';
import { PaymentComponent } from './payment-package/payment/payment.component';
import { FreeAuthGuard } from './registration-login/_guards/free-auth.guard';
import { GuideComponent } from './payment-package/guide/guide.component';
import { PaymentPackageDasboardComponent } from './payment-package/payment-package-dasboard/payment-package-dasboard.component';
import { PaymentDetailComponent } from './payment-package/payment-detail/payment-detail.component';
import { NoneAuthGuard } from './registration-login/_guards/none-auth.guard';
import { RootAuthGuard } from './registration-login/_guards/root-auth.guard';
import { PaymentSuccessComponent } from './payment-package/payment-success/payment-success.component';
import { PaymentAuthGuard } from './registration-login/_guards/payment-auth.guard';
import { DetailComponent } from './registration-login/detail/detail.component';

const routes: Routes = [
    { path: '', redirectTo: '/home', pathMatch: 'full' },

    { path: 'login', component: LoginComponent},

    // { path: 'register', component: RegisterComponent, canActivate: [AdminAuthGuard]},
    { path: 'dasboard', component: DasboardComponent, canActivate: [RootAuthGuard]},
    { path: 'update', component: UpdateComponent, canActivate: [AuthGuard]},
    { path: 'detail/:userId', component: DetailComponent, canActivate: [AdminAuthGuard]},
    
    { path: 'home', component: HomeComponent},

    { path: 'bollingerband', component: BollingerBandComponent, canActivate: [FreeAuthGuard]},
    { path: 'bollingerbandstream', component: BollingerBandStreamComponent, canActivate: [FreeAuthGuard]},
    { path: 'realcashflow', component: DominanceComponent, canActivate: [FreeAuthGuard]},

    { path: 'package', component: PackageComponent},
    { path: 'packagedetail/:name', component: PackageDetailComponent, canActivate: [NoneAuthGuard]},
    { path: 'payment/:name', component: PaymentComponent, canActivate: [AuthGuard, PaymentAuthGuard]},
    { path: 'guide', component: GuideComponent},
    { path: 'payment-package-dasboard', component: PaymentPackageDasboardComponent, canActivate: [AdminAuthGuard]},
    { path: 'payment-detail/:createrId', component: PaymentDetailComponent, canActivate: [AdminAuthGuard]},
    { path: 'payment-detail', component: PaymentDetailComponent, canActivate: [AuthGuard]},
    { path: 'payment-success', component: PaymentSuccessComponent, canActivate: [AuthGuard]},
    
    { path: '**', redirectTo: ''}
];

@NgModule({
    imports: [ RouterModule.forRoot(routes, { useHash: true })],
    exports: [ RouterModule ]
})
export class AppRoutingModule {}