import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { HomeComponent } from './components/home/home.component';
import { AboutComponent } from './components/about/about.component';
import { AuthGuard } from './guards/auth.guard';
import { GoalListComponent } from './components/goal-list/goal-list.component';
import { GoalComponent } from './components/goal/goal.component';
import { GoalDetailsComponent } from './components/goal-details/goal-details.component';

const routes: Routes = [
  {path:'#/list/', component: AboutComponent}, //fixme
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent},
  {path: '', component: HomeComponent, canActivate: [AuthGuard]},
  {path: 'about', component: AboutComponent},
  {path: 'myGoals', component: GoalListComponent},
  {path: 'detail/:id', component: GoalDetailsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes,{useHash:true})],
  exports: [RouterModule]
})

// export const routing = RouterModule.forRoot(routes, {useHash:true});

export class AppRoutingModule { }
