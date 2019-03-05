import {Component, Input, OnInit} from '@angular/core';
import {RoleName} from '../../shared/model/role';
import {UserService} from '../../shared/service/user.service';
import {Gender, User} from '../../shared/model/user';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {BehaviorSubject} from 'rxjs';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {
  @Input()
  roleName: RoleName;
  @Input()
  role: string;

  pageIndex = 1;
  pageSize = 20;
  total = 0;
  loading = true;
  sort = 'createdDate,desc';

  users: User[] = [];

  isVisible = false;
  okLoading = false;
  userForm: FormGroup;

  searchTerms = new BehaviorSubject<string>('');

  constructor(private userService: UserService) {
    this.userForm = new FormGroup({
      employeeId: new FormControl('', [Validators.required]),
      username: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      name: new FormControl('', [Validators.required]),
      gender: new FormControl(Gender.Man, [Validators.required]),
      age: new FormControl(25, [Validators.required])
    });
  }

  ngOnInit() {
    this.findAllByRoleName();
  }

  handleOk(): void {
    this.okLoading = true;
    const user: User = {
      employeeId: this.userForm.get('employeeId').value,
      username: this.userForm.get('username').value,
      password: this.userForm.get('password').value,
      name: this.userForm.get('name').value,
      gender: this.userForm.get('gender').value,
      age: this.userForm.get('age').value
    };
    this.userService.save(user, this.roleName).subscribe(
      u => {
        this.users.unshift(u);
        this.isVisible = false;
        this.okLoading = false;
      }, () => this.okLoading = false
    );
  }

  changeSort(sort: { key: string, value: string }): void {
    switch (sort.value) {
      case 'descend':
        this.sort = 'employeeId,desc';
        break;
      case 'ascend':
        this.sort = 'employeeId,asc';
        break;
      default:
        this.sort = 'createdDate,desc';
    }
    this.findAllByRoleName();
  }

  findAllByRoleName(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    this.userService.findAllByRoleName(this.roleName,
      this.pageIndex, this.pageSize, this.sort)
      .subscribe(
        page => {
          this.loading = false;
          this.users = page.content;
          this.total = page.totalElements;
        },
        () => this.loading = false
      );
  }

  confirm(employeeId: number): void {
    this.userService.deleteByEmployeeId(employeeId).subscribe();
    this.users = this.users.filter(
      driver => driver.employeeId !== employeeId);
  }
}
