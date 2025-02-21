import { ChangeDetectionStrategy, Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDatepickerModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

export interface IDate {
  startDate: number; 
  endDate: number;
}

@Component({
  selector: 'app-datepicker-range-popup',
	imports: [NgbDatepickerModule, FormsModule],
  templateUrl: './datepicker-range-popup.component.html',
  styleUrl: './datepicker-range-popup.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class DatepickerRangePopupComponent {
	calendar = inject(NgbCalendar);
	formatter = inject(NgbDateParserFormatter);

	hoveredDate: NgbDate | null = null;

  @Input() startDate: NgbDate | null = null;
  @Input() endDate: NgbDate | null = null;
  @Output() fromToDate = new EventEmitter<IDate>();

	fromDate: NgbDate | null = this.startDate || this.calendar.getToday();
  toDate: NgbDate | null = this.endDate || this.calendar.getNext(this.calendar.getToday(), 'd', 10);

  constructor() {
    setTimeout(()=>{
      if (this.fromDate && this.toDate) {
        this.fromToDate.emit({
          startDate: new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day).getTime(), 
          endDate: new Date(this.toDate.year, this.toDate.month-1, this.toDate.day).getTime()
        });
      }
    },0)
    
  }

	onDateSelection(date: NgbDate) {
    
		if (!this.fromDate && !this.toDate) {
			this.fromDate = date;
		} else if (this.fromDate && !this.toDate && date && date.after(this.fromDate)) {
			this.toDate = date;
		} else {
			this.toDate = null;
			this.fromDate = date;
		}

    if (this.fromDate && this.toDate) {
      this.fromToDate.emit({
        startDate: new Date(this.fromDate.year, this.fromDate.month-1, this.fromDate.day).getTime(), 
        endDate: new Date(this.toDate.year, this.toDate.month-1, this.toDate.day).getTime()
      })
    }
	}

	isHovered(date: NgbDate) {
		return (
			this.fromDate && !this.toDate && this.hoveredDate && date.after(this.fromDate) && date.before(this.hoveredDate)
		);
	}

	isInside(date: NgbDate) {
		return this.toDate && date.after(this.fromDate) && date.before(this.toDate);
	}

	isRange(date: NgbDate) {
		return (
			date.equals(this.fromDate) ||
			(this.toDate && date.equals(this.toDate)) ||
			this.isInside(date) ||
			this.isHovered(date)
		);
	}

	validateInput(currentValue: NgbDate | null, input: string): NgbDate | null {
		const parsed = this.formatter.parse(input);
		return parsed && this.calendar.isValid(NgbDate.from(parsed)) ? NgbDate.from(parsed) : currentValue;
	}
}
