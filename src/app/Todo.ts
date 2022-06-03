export class Todo {
  id: string;
  title: string;
  dateCreated: string;
  status: boolean;
  priority: string;
  constructor() {
    (this.id = ''), (this.title = '');
    this.dateCreated = '';
    this.status = false;
    this.priority = '';
  }
}

export interface StatusOptions {
  completed: boolean;
  notCompleted: boolean;
}

export interface PriorityOptions {
  high: boolean;
  medium: boolean;
  low: boolean;
}
