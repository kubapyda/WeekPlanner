import { RouterModule, Routes } from "@angular/router";

import { ContentComponent } from './content/content.component';
import { NgModule } from '@angular/core';

const appRoutes: Routes = [
  {
    path: '',
    component: ContentComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
