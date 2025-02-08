import { Component } from '@angular/core';
import {EmployeeListComponent} from './components/employee-list/employee-list.component';

@Component({
  selector: 'app-root',
  imports: [EmployeeListComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'employee-app';
}
