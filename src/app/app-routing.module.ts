import { Component, NgModule } from '@angular/core';
import { RouterModule, Routes } from "@angular/router";

import { ContentComponent } from './content/content.component';
import { PlannerComponent } from './planner/planner.component';

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent
  }, {
    path: 'planner',
    component: PlannerComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
