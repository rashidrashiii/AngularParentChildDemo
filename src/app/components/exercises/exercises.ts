import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';

@Component({
  selector: 'app-exercises',
  imports: [CommonModule, RouterLink],
  templateUrl: './exercises.html',
  styleUrl: './exercises.css'
})
export class ExercisesComponent {
  chapterService = inject(ChapterService);

  constructor() {
    this.chapterService.setActiveChapter('/exercises');
  }

  showHint: { [key: number]: boolean } = {};
  showSolution: { [key: number]: boolean } = {};

  toggleHint(id: number) {
    this.showHint[id] = !this.showHint[id];
  }

  toggleSolution(id: number) {
    this.showSolution[id] = !this.showSolution[id];
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('8');
  }

  exercises = [
    {
      id: 1,
      title: 'Exercise 1: The Messenger',
      description: 'Create a parent "Dashboard" and a child "Alert". Pass a message string from Dashboard to Alert using @Input.',
      hint: 'Use [message]="myMessage" in the parent template.',
      solution: `// Child
@Input() message: string = '';

// Parent Template
<app-alert [message]="'System Online'"></app-alert>`
    },
    {
      id: 2,
      title: 'Exercise 2: The Button Click',
      description: 'Create a "SaveButton" child component. When clicked, it should notify the parent "Form" component using @Output.',
      hint: 'Create an EventEmitter in the child and call .emit() on click.',
      solution: `// Child
@Output() save = new EventEmitter<void>();
onBtnClick() { this.save.emit(); }

// Parent Template
<app-save-button (save)="handleSave()"></app-save-button>`
    }
  ];
}
