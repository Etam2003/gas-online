import { Component, EventEmitter, Output, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss']
})
export class MenuComponent implements OnInit, OnDestroy {
  currentDateTime!: string;
  private timer: any;

  @Input() currentPage: string = '';
  @Input() loggedInUser ?: firebase.default.User | null;
  @Output() selectedPage: EventEmitter<string> = new EventEmitter();
  @Output() onCloseSidenav: EventEmitter<boolean> = new EventEmitter();
  @Output() onLogout: EventEmitter<boolean> = new EventEmitter();

  constructor (private router: Router) {}

  ngOnInit(): void {
    this.updateCurrentDateTime();

    this.timer = setInterval(() => {
      this.updateCurrentDateTime();
    }, 1000);
  }

  ngOnDestroy(): void {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  private updateCurrentDateTime(): void {
    this.currentDateTime = new Date().toISOString();
  }

  menuSwitch() {
    this.selectedPage.emit(this.currentPage);
  }

  close(logout?: boolean){
    this.onCloseSidenav.emit(true);
    if (logout === true){
      this.onLogout.emit(true);
    }
  }
}
