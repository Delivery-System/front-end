// built-in module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

// built-in material module
import {MatStepperModule} from '@angular/material/stepper';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';
import { NgxMatFileInputModule } from '@angular-material-components/file-input';

@NgModule({
  declarations: [],
  exports: [
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatSelectModule,
    NgxMatFileInputModule,
    MatStepperModule
  ]
})
export class MaterialModule { }
