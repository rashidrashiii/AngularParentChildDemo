import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';

@Component({
  selector: 'app-best-practices',
  imports: [CommonModule, RouterLink],
  templateUrl: './best-practices.html',
  styleUrl: './best-practices.css'
})
export class BestPracticesComponent implements OnInit {
  chapterService = inject(ChapterService);

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/best-practices');
    }, 0);
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('7');
  }
}
