import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-sidebar',
  imports: [CommonModule, RouterLink, RouterLinkActive],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.css'
})
export class SidebarComponent {
  chapterService = inject(ChapterService);
  
  // Expose signals to template
  chapters = this.chapterService.chapters;
  progress = this.chapterService.getProgress.bind(this.chapterService);
}
