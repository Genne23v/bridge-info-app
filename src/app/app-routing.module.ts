import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BridgeInfoComponent } from './bridge-info/bridge-info.component';
import { BridgeFormTemplateDrivenComponent } from './bridge-form-template-driven/bridge-form-template-driven.component';
import { BridgeFormReactiveComponent } from './bridge-form-reactive/bridge-form-reactive.component';
import { BridgeFormMaterialComponent } from './bridge-form-material/bridge-form-material.component';
import { LoginComponent } from './login/login.component';
import { BridgeGuard } from './bridge.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent},
  { path: 'bridges/:id', canActivate: [BridgeGuard], component: BridgeInfoComponent },
  { path: 'bridges', canActivate: [BridgeGuard], component: BridgeInfoComponent },
  { path: 'new-template', component: BridgeFormTemplateDrivenComponent },
  { path: 'new-reactive', component: BridgeFormReactiveComponent },
  { path: 'new-material', component: BridgeFormMaterialComponent},
  { path: '', redirectTo: 'bridges', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
