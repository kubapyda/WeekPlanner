import { ActionComponent } from './planner/action/action.component';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { BrowserModule } from '@angular/platform-browser';
import { ContentComponent } from './content/content.component';
import { ContentService } from './services/content.service';
import { DayComponent } from './content/day/day.component';
import { FooterComponent } from './footer/footer.component';
import { FormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
import { LoginService } from './services/login.service';
import { NgModule } from '@angular/core';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { OnlyNumber } from './directives/only-number.directive';
import { PlannerComponent } from './planner/planner.component';
import { RepeatableComponent } from './planner/repeatable/repeatable.component';
import { CategoriesComponent } from './planner/categories/categories.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    ContentComponent,
    FooterComponent,
    DayComponent,
    PlannerComponent,
    RepeatableComponent,
    ActionComponent,
    OnlyNumber,
    LoginComponent,
    CategoriesComponent
  ],
  imports: [
    BrowserModule,
    NgbModule.forRoot(),
    FormsModule,
    NgSelectModule,
    AppRoutingModule
  ],
  entryComponents: [
    LoginComponent
  ],
  providers: [
    ContentService,
    LoginService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
