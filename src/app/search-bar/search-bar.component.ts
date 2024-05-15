import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'] // <-- Corrected property name
})
export class SearchBarComponent {
  @Output() searchEvent = new EventEmitter<string>();

  constructor() { }

  search(input: HTMLInputElement) {
    const value = input.value;
    this.searchEvent.emit(value);
  }
}
