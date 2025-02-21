
export class BaseModel {
    [index: string]: any;
    checkFields(row?: any): void {
      if (row) {
        for (const prop in this) {
          if (row.hasOwnProperty(prop)) {
              this[prop] =  row[prop];
          }
        }
      }
    }
  
  }


export enum DeadlineEnum {
    meeting = 1,
    approaching,
    miss,
}


export interface ITask {
    id: number;
    title: string;
    description: string;
    startDate: number;
    endDate: number;
    isOpen: boolean;
    deadline: DeadlineEnum;
}

export class Task extends BaseModel implements ITask {
    id = 0;
    title = '';
    description = '';
    startDate = Date.now();
    endDate = Date.now();
    isOpen = false;
    deadline = DeadlineEnum.meeting;

    constructor(row: unknown) {
        super();
        this.checkFields(row);
        this.deadline = this.defineDeadline();
    }

    private defineDeadline(): DeadlineEnum {
        const daysToDeadline = (this.endDate - Date.now()) / (24 * 60 * 60 * 1000);
        return  daysToDeadline < 0 ? DeadlineEnum.miss : 
                daysToDeadline < 3 ? DeadlineEnum.approaching :
                DeadlineEnum.meeting;
    }
}