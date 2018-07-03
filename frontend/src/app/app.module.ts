import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';

import {
  MatToolbarModule,
  MatFormFieldModule,
  MatButtonModule,
  MatTableModule,
  MatCardModule,
  MatDividerModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { ListComponent } from './list/list.component';
import { CreateComponent } from './create/create.component';
import { EditComponent } from './edit/edit.component';
import { IssueService } from './issue.service';

const routes: Routes = [
  { path: 'create', component: CreateComponent },
  { path: 'edit/:id', component: EditComponent },
  { path: 'list', component: ListComponent },
  { path: '', redirectTo: 'list', pathMatch: 'full' }
];

@NgModule({
  declarations: [AppComponent, ListComponent, CreateComponent, EditComponent],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    RouterModule.forRoot(routes),
    HttpClientModule,
    MatToolbarModule,
    MatFormFieldModule,
    MatButtonModule,
    MatTableModule,
    MatCardModule,
    MatDividerModule
  ],
  providers: [IssueService],
  bootstrap: [AppComponent]
})
export class AppModule {}
