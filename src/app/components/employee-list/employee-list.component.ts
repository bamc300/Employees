import { Component, inject, signal, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-employee-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css'],
})
export class EmployeeListComponent implements OnInit {
  private employeeService = inject(EmployeeService);

  employees = signal<Employee[]>([]);   // Se usa para mostrar datos en la tabla
  allEmployees = signal<Employee[]>([]); // Almacena todos los empleados desde el inicio
  searchId = signal<string>('');

  ngOnInit(): void {
    this.employeeService.getEmployees().subscribe((data) => {
      this.allEmployees.set(data); // Carga los datos pero no los muestra en la tabla
    });
  }

  searchEmployee(): void {
    const id = this.searchId().trim();

    if (id === '') {
      this.employees.set(this.allEmployees()); // Si el campo está vacío, muestra todos los empleados
    } else {
      const numId = Number(id);
      if (!isNaN(numId)) {
        this.employeeService.getEmployeeById(numId).subscribe((data) => this.employees.set(data));
      }
    }
  }
}
