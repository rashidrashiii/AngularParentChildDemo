import { Component, inject, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';

@Component({
  selector: 'app-communication-overview',
  imports: [RouterLink],
  templateUrl: './communication-overview.html',
  styleUrl: './communication-overview.css'
})
export class CommunicationOverviewComponent implements OnInit {
  chapterService = inject(ChapterService);

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/communication');
    }, 0);
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('2');
  }
}
