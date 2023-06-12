import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DashboardService } from '../dashboard.service';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogService } from '../dialog.service';

@Component({
  selector: 'app-add-new-task-dialog',
  templateUrl: './add-new-task-dialog.component.html',
  styleUrls: ['./add-new-task-dialog.component.scss'],
})
export class AddNewTaskDialogComponent implements OnInit {
  taskForm!: FormGroup;
  constructor(
    public dialogRef: MatDialogRef<AddNewTaskDialogComponent>,
    private fb: FormBuilder,
    private dialogService: DialogService
  ) {}
  ngOnInit(): void {
    this.taskForm = this.fb.group({ title: ['', Validators.required] });
  }
  saveTask(task: FormGroup) {
    this.dialogService.emitData(task.value);
  }
}
