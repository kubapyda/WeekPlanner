import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ActionComponent } from './planner/action/action.component';
import { CategoriesComponent } from './planner/categories/categories.component';
import { ContentComponent } from './content/content.component';
import { LoginService } from './services/login.service';
import { PlannerComponent } from './planner/planner.component';
import { RepeatableComponent } from './planner/repeatable/repeatable.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent
  }, {
    path: 'planner',
    component: PlannerComponent,
    children: [
      {
        path: 'repeatable',
        component: RepeatableComponent
      }, {
        path: 'action',
        component: ActionComponent
      }, {
        path: 'categories',
        component: CategoriesComponent,
        canActivate: [LoginService]
      }
    ]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
