import { HttpClient } from '@angular/common/http';
import {
  Component,
  ElementRef,
  Injectable,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Todo } from './Todo';
import { v4 as uuid } from 'uuid';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ngbCarouselTransitionOut } from '@ng-bootstrap/ng-bootstrap/carousel/carousel-transition';

declare let $: any;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
@Injectable()
export class AppComponent implements OnInit {
  constructor(private http: HttpClient, private formBuilder: FormBuilder) {}
  @ViewChild('modal') modal: ElementRef;
  todos: Todo[] = [];

  id: string = uuid();

  piorities: string[] = ['low', 'medium', 'high'];
  todo: Todo = new Todo();
  openToggle: boolean = false;
  display = 'none';
  checking: boolean = false;
  enableEdit: boolean = false;

  validateForm!: FormGroup;
  submitted = false;

  url = 'http://localhost:3000/todo';

  getAll(): any {
    return this.http
      .get(this.url)
      .toPromise()
      .then((response: any) => {
        this.todos = response;
      });
  }

  createTodo(item: any): any {
    return this.http
      .post(this.url, item)
      .toPromise()
      .then(() => {
        this.todos.push(item);
        this.todo = new Todo();
      });
  }

  editTodo(item: any): any {
    return this.http
      .put(this.url + `/${item.id}`, item)
      .toPromise()
      .then(() => {
        this.enableEdit = false;
        this.todo = new Todo();
      });
  }

  deleteTodo(item: any): any {
    return this.http
      .delete(this.url + `/${item.id}`, item)
      .toPromise()
      .then(() => {
        this.getAll();
      });
  }

  ngOnInit(): void {
    this.getAll();
    this.validateForm = this.formBuilder.group({
      formTitle: ['', Validators.required],
      formPriority: ['', Validators.required],
    });
  }

  onCheckboxChange(index: any) {
    const target: any = this.todos?.find((i) => i.id === index);
    this.editTodo(target);
    this.checking = false;
  }

  onSubmit(user: any) {
    //this.submitted = true;
    if (this.enableEdit) {
      const target: any = this.todos?.find((i) => i.id === this.todo.id + 1);
      this.editTodo(this.todo);
    } else {
      const now = new Date();
      if (user.form.value.formTitle && user.form.value.formPriority) {
        this.todo.id = uuid();
        this.todo.title = user.form.value.formTitle;
        this.todo.priority = user.form.value.formPriority;
        this.todo.dateCreated = now.toLocaleString();

        this.createTodo(this.todo);
      }
    }
    /* if (this.validateForm.invalid) {
      return;
    } */
  }

  edit(id: string) {
    const target: any = this.todos?.find((i) => i.id === id);
    this.enableEdit = true;
    this.todo = target;
  }

  remove(id: string) {
    const target: any = this.todos?.find((i) => i.id === id);
    this.deleteTodo(target);
  }
}
