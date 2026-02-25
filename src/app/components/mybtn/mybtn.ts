import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-mybtn',
  standalone: true,
  templateUrl: './mybtn.html',
  styleUrl: './mybtn.css',
})
export class Mybtn {

  @Input() text: string = 'ok';
  @Output() clicked = new EventEmitter<void>();

  onClick() {
    this.clicked.emit();
  }
}