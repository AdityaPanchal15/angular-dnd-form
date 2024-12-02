import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CustomFormComponent } from './custom-form/custom-form.component';
import { ResizableDirective } from './resizable.directive';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DragDropModule } from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormPropertiesComponent } from './form-properties/form-properties.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FormPreviewComponent } from './form-preview/form-preview.component';

@NgModule({
  declarations: [
    AppComponent,
    CustomFormComponent,
    ResizableDirective,
    FormPropertiesComponent,
    FormPreviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DragDropModule,
    MatButtonModule,
    MatCheckboxModule,
    NgbModule,
    FormsModule,
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
