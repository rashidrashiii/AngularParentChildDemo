import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';

@Component({
  selector: 'app-summary-chapter',
  imports: [CommonModule, RouterLink],
  templateUrl: './summary-chapter.html',
  styleUrl: './summary-chapter.css'
})
export class SummaryChapterComponent implements OnInit {
  chapterService = inject(ChapterService);

  // Cheat Sheet Data
  cheatSheet = [
    {
      pattern: '@Input()',
      syntax: '[prop]="value"',
      direction: 'Parent → Child',
      useCase: 'Configuration, Data Passing',
      icon: '📥'
    },
    {
      pattern: '@Output()',
      syntax: '(event)="handler($event)"',
      direction: 'Child → Parent',
      useCase: 'Notifications, User Actions',
      icon: '📤'
    },
    {
      pattern: '@ViewChild()',
      syntax: 'this.child.method()',
      direction: 'Parent ↔ Child (Direct)',
      useCase: 'Focus, Scroll, Complex Control',
      icon: '👁️'
    },
    {
      pattern: '@ContentChild()',
      syntax: '<ng-content></ng-content>',
      direction: 'Parent ⤢ Child (Projection)',
      useCase: 'wrappers, Compound Components',
      icon: '📦'
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/summary');
      this.chapterService.markChapterAsCompleted('9');
    }, 0);
  }
}
