import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Record } from '../../models/record.model';
import { RecordService } from '../../services/record.service';

@Component({
  selector: 'app-record',
  templateUrl: './record.component.html',
  styleUrls: ['./record.component.css']
})
export class RecordComponent implements OnInit {

  @Input() records: Record [];

  @Output() deleteRecordClicked = new EventEmitter<boolean>();
  @Output() updatRecordClicked = new EventEmitter<boolean>();

  constructor(
    private recordService: RecordService
  ) { }

  ngOnInit() {
  }

  deleteRecord(recordId: string) {
    this.recordService.deleteRecord(recordId)
      .subscribe(() => this.deleteRecordClicked.emit(true));
  }

  updateRecord(finishedDate: HTMLInputElement,
    finishedUnits: HTMLInputElement,
    goalId: HTMLInputElement,
    recordId: HTMLInputElement,
    ) {

    let newRecord = new Record(goalId.value, finishedUnits.valueAsNumber, finishedDate.valueAsDate, recordId.value);

    this.recordService.updateRecord(newRecord)
      .subscribe(() => this.updatRecordClicked.emit(true));
  }
}
