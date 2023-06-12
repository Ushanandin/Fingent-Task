import { Component, OnInit, ViewChild } from '@angular/core';
import { DashboardService } from '../dashboard.service';
import { AuthService } from '../auth.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
})
export class DashboardComponent implements OnInit {
  employeeCount!: number;
  isLoggedIn!: boolean;
  employeeData!: any;
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['name', 'phone', 'email'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private dashboardService: DashboardService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.authService
      .isAuthenticatedLogin()
      .subscribe((isLoggedIn) => (this.isLoggedIn = isLoggedIn));
    this.dashboardService.getEmployeeData().subscribe((empData) => {
      this.employeeData = empData;
      this.employeeCount = empData.length;
      this.dataSource = new MatTableDataSource<any>(this.employeeData);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      console.log(this.dataSource);
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  logout() {
    localStorage.removeItem('token');
    this.router.navigate(['/login']);
  }
}
