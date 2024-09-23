import {Component, NgModule} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {provideHttpClient} from "@angular/common/http";
import {SharedModule} from "./shared/shared.module";
import {NgOptimizedImage} from "@angular/common";


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [SharedModule, NgOptimizedImage],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'fitness_tracking';
}
