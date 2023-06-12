import { EventEmitter, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  dataEmitter: EventEmitter<any> = new EventEmitter<any>();

  emitData(data: any): void {
    this.dataEmitter.emit(data);
  }
}
