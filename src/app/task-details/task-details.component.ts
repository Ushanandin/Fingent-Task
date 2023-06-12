import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { DashboardService } from '../dashboard.service';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog } from '@angular/material/dialog';
import { AddNewTaskDialogComponent } from '../add-new-task-dialog/add-new-task-dialog.component';
import { map } from 'rxjs';
import { DialogService } from '../dialog.service';
@Component({
  selector: 'app-task-details',
  templateUrl: './task-details.component.html',
  styleUrls: ['./task-details.component.scss'],
})
export class TaskDetailsComponent implements OnInit {
  id!: any;
  taskCount!: number;
  insertTaskData!: any;
  getTask!: {};
  dataSource!: MatTableDataSource<any>;
  displayedColumns: string[] = ['Task', 'status'];
  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;
  constructor(
    private router: Router,
    private routes: ActivatedRoute,
    private dashboardService: DashboardService,
    public dialog: MatDialog,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.id = this.routes.snapshot.paramMap.get('id');

    this.dashboardService.getTaskDetails(this.id).subscribe((details) => {
      console.log(details);
      this.insertTaskData = details;
      this.populateTasktable(this.insertTaskData);
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

  openDialog(
    enterAnimationDuration: string,
    exitAnimationDuration: string
  ): void {
    this.dialog.open(AddNewTaskDialogComponent, {
      width: '500px',
      height: '200px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
    this.dialogService.dataEmitter.subscribe((data) => {
      data['completed'] = false;
      this.insertTaskData.unshift(data);
      this.populateTasktable(this.insertTaskData);
      console.log('Data emitted from dialog:', data);
    });
  }
  populateTasktable(tabledataSource: any) {
    this.taskCount = tabledataSource.length;
    this.dataSource = new MatTableDataSource<any>(tabledataSource);
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
}
