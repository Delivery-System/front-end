// built-in module
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarModule,InputsModule, WavesModule,ButtonsModule,IconsModule,CardsModule,CollapseModule, MdbTableDirective  } from 'angular-bootstrap-md'
import { ModalModule,CheckboxModule, TooltipModule,TableModule, BadgeModule,PopoverModule } from 'angular-bootstrap-md';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
// custom module


@NgModule({
  declarations: [],
  imports: [
    CommonModule
  ],
  exports: [
    NavbarModule,
    WavesModule,
    IconsModule,
    CheckboxModule,
    ModalModule,
    CardsModule,
    BadgeModule,
    TooltipModule,
    InputsModule,
    TableModule,
    PopoverModule,
    CollapseModule,
    BrowserAnimationsModule,
    ButtonsModule
  ]
})
export class MdBootstrapModule { }




