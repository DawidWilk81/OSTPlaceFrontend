import { Component, OnInit } from '@angular/core';
import { faCancel } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-cancel',
  templateUrl: './cancel.component.html',
  styleUrls: ['./cancel.component.scss']
})
export class CancelComponent implements OnInit {
  cancel = faCancel;
  constructor() { }

  ngOnInit(): void {
  }

}
