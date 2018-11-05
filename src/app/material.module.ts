import { NgModule } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatIconModule} from '@angular/material/icon';
import {MatCardModule} from '@angular/material/card';

const modules = [
    MatToolbarModule,
    MatIconModule,
    MatCardModule
];

@NgModule({
  imports: modules,
  exports: modules
})
export class MaterialModule {}
