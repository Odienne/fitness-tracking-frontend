import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {DemoNgZorroAntdModule} from "../DemoNgZorroAntdModule";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {RouterLink, RouterOutlet} from "@angular/router";


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ],
  exports: [
    CommonModule,
    DemoNgZorroAntdModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink,
    RouterOutlet
  ]
})
export class SharedModule {
}
