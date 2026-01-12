import { Component, inject, Input, ContentChild, AfterContentInit, AfterContentChecked, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

// --- Helper: The Content (Sticky Note) ---
@Component({
  selector: 'app-sticky-note',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="sticky-note">
       📌 {{ text }}
    </div>
  `,
  styles: [`
    .sticky-note {
        background: #fef3c7; /* yellow-100 */
        color: #92400e; /* yellow-800 */
        padding: 1rem;
        border-radius: 4px;
        box-shadow: 2px 2px 5px rgba(0,0,0,0.1);
        font-family: 'Comic Sans MS', cursive, sans-serif;
        font-weight: 500;
        border: 1px solid #fcd34d;
        display: inline-block;
    }
  `]
})
export class StickyNoteComponent {
  @Input() text = 'Buy Milk';
  @Input() urgent = false; // The Parent (Board) will read this!
}

// --- Helper: The Container (Notice Board) ---
@Component({
  selector: 'app-notice-board',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="notice-board" [class.alert-mode]="isUrgent">
       <div class="board-header">
         {{ isUrgent ? '⚠️ URGENT NOTICE' : '📋 Community Board' }}
       </div>
       <div class="board-content">
         <!-- The note is projected here -->
         <ng-content></ng-content>
       </div>
    </div>
  `,
  styles: [`
    .notice-board {
      background: #f0f9ff; /* sky-50 */
      border: 4px solid #bae6fd; /* sky-200 */
      border-radius: 8px;
      overflow: hidden;
      width: 100%;
      min-width: 280px;
      transition: all 0.3s;
    }
    .board-header {
        background: #bae6fd;
        padding: 0.75rem;
        color: #0369a1; /* sky-700 */
        font-weight: bold;
        text-align: center;
        text-transform: uppercase;
        letter-spacing: 1px;
    }
    .board-content {
        padding: 2rem;
        display: flex;
        justify-content: center;
        min-height: 100px;
        align-items: center;
    }

    /* Alert Mode Styles */
    .notice-board.alert-mode {
        border-color: #fca5a5; /* red-300 */
        background: #fef2f2; /* red-50 */
        animation: pulse 2s infinite;
    }
    .notice-board.alert-mode .board-header {
        background: #fca5a5;
        color: #991b1b; /* red-800 */
    }
    @keyframes pulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.02); }
        100% { transform: scale(1); }
    }
  `]
})
export class NoticeBoardComponent implements AfterContentInit, AfterContentChecked {
  // Query for the projected Sticky Note
  @ContentChild(StickyNoteComponent) note!: StickyNoteComponent;
  
  isUrgent = false;

  ngAfterContentInit() {
    this.updateUrgency();
  }

  ngAfterContentChecked() {
    // React to changes in the projected content (e.g., if parent toggles 'urgent')
    this.updateUrgency();
  }

  private updateUrgency() {
    if (this.note) {
      if (this.isUrgent !== this.note.urgent) {
        this.isUrgent = this.note.urgent;
      }
    }
  }
}

// --- Helper: Simple Card for Demo 1 ---
@Component({
  selector: 'app-demo-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card-frame">
       <!-- Multi-slot projection -->
       <div class="card-header">
         <ng-content select="header"></ng-content>
       </div>
       <div class="card-body">
         <ng-content></ng-content>
       </div>
    </div>
  `,
  styles: [`
    .card-frame {
      border: 1px dashed #475569;
      padding: 1rem;
      border-radius: 8px;
      background: #0f172a;
    }
    .card-header {
        border-bottom: 1px solid #334155;
        margin-bottom: 0.5rem;
        padding-bottom: 0.5rem;
        font-weight: bold;
        color: #e2e8f0;
    }
  `]
})
export class DemoCardComponent {}

// --- Main Chapter Component ---
@Component({
  selector: 'app-content-child-chapter',
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, NoticeBoardComponent, StickyNoteComponent, DemoCardComponent],
  templateUrl: './content-child-chapter.html',
  styleUrl: './content-child-chapter.css'
})
export class ContentChildChapterComponent implements OnInit {
  chapterService = inject(ChapterService);
  
  // --- Demo 1: Simple Projection ---
  simpleCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<app-card>
  <!-- Content projected into the default slot -->
  <header>Welcome Title</header>
  
  <p>This paragraph is projected into the body.</p>
  
  <footer>Copyright 2024</footer>
</app-card>`,
    },
    {
      title: 'Child HTML',
      language: 'html',
      code: `<!-- child.component.html (app-card) -->
<div class="card">
  <div class="card-header">
     <!-- Takes anything valid for the 'header' selector -->
     <ng-content select="header"></ng-content>
  </div>

  <div class="card-body">
     <!-- Takes everything else (default slot) -->
     <ng-content></ng-content>
  </div>
</div>`,
    }
  ];

  // --- Demo 2: The Urgent Note (ContentChild) ---
  noteMessage = 'Meeting at 5 PM';
  isNoteUrgent = false;

  toggleUrgent() {
      this.isNoteUrgent = !this.isNoteUrgent;
  }

  changeMessage() {
      const msgs = ['Buy Groceries', 'Call Mom', 'Fix Bug #123', 'Office Party'];
      this.noteMessage = msgs[Math.floor(Math.random() * msgs.length)];
  }

  noteCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<app-notice-board>
   <!-- We project a Sticky Note inside the Board -->
   <app-sticky-note 
      [text]="noteMessage" 
      [urgent]="isNoteUrgent">
   </app-sticky-note>
</app-notice-board>`,
    },
    {
       title: 'Child TS',
       language: 'typescript',
       code: `import { Component, ContentChild, AfterContentInit, AfterContentChecked } from '@angular/core';
import { StickyNoteComponent } from './sticky-note.component';

@Component({
  selector: 'app-notice-board',
  // ... template ...
})
export class NoticeBoardComponent implements AfterContentInit, AfterContentChecked {
  // 1. Query the projected content using @ContentChild
  @ContentChild(StickyNoteComponent) 
  note!: StickyNoteComponent;

  isUrgent = false;

  ngAfterContentInit() {
    this.checkUrgency();
  }

  ngAfterContentChecked() {
    // 2. Keep checking if the projected note changes!
    this.checkUrgency();
  }

  checkUrgency() {
    if (this.note) {
        this.isUrgent = this.note.urgent;
    }
  }
}`,
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/content-child');
    }, 0);
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('6');
  }
}
