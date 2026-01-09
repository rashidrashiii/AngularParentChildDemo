import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

@Component({
  selector: 'app-output-chapter',
  imports: [CommonModule, RouterLink, InteractiveDemoComponent],
  templateUrl: './output-chapter.html',
  styleUrl: './output-chapter.css'
})
export class OutputChapterComponent implements OnInit {
  chapterService = inject(ChapterService);
  private cd = inject(ChangeDetectorRef);

  // --- Demo 1: Simple Notification (Delete) ---
  isItemDeleted = false;
  
  deleteCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<// Parent listens to the event
<app-delete-button (delete)="onDelete()"></app-delete-button>`
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `@Component({...})
export class DeleteButtonComponent {
  // Output with void (no data)
  @Output() delete = new EventEmitter<void>();

  onClick() {
    this.delete.emit();
  }
}`
    }
  ];

  // --- Demo 2: Payload (Fruit Selector) ---
  selectedFruit = '🍒';
  
  fruitCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<// Parent receives data via $event
<app-fruit-picker (picked)="onFruitPicked($event)"></app-fruit-picker>`
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `@Component({...})
export class FruitPickerComponent {
  // Output sends a string
  @Output() picked = new EventEmitter<string>();

  pick(fruit: string) {
    this.picked.emit(fruit);
  }
}`
    }
  ];

  // --- Demo 3: Complex Event (Voting) ---
  voteCount = 0;
  latestVote: { option: string, timestamp: Date } | null = null;
  
  voteCodeTabs: CodeTab[] = [
    {
       title: 'Parent HTML',
       language: 'html',
       code: `<// Parent receives complex object
<app-vote-machine (voted)="handleVote($event)"></app-vote-machine>`
    },
     {
      title: 'Child TS',
      language: 'typescript',
      code: `interface VoteEvent {
  option: string;
  timestamp: Date;
}

@Component({...})
export class VoteMachineComponent {
  @Output() voted = new EventEmitter<VoteEvent>();

  voteYes() {
    this.voted.emit({ 
      option: 'YES', 
      timestamp: new Date() 
    });
  }
}`
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/output');
    }, 0);
  }

  // Demo 1 Logic
  onDelete() {
    this.isItemDeleted = true;
    setTimeout(() => {
        this.isItemDeleted = false; // Reset for demo
        this.cd.detectChanges();
    }, 2000);
  }

  // Demo 2 Logic
  onFruitPicked(fruit: string) {
    this.selectedFruit = fruit;
  }
  resetFruit() {
    this.selectedFruit = '🍒';
  }

  // Demo 3 Logic
  handleVote(event: { option: string, timestamp: Date }) {
    this.voteCount++;
    this.latestVote = event;
  }
  resetVote() {
    this.voteCount = 0;
    this.latestVote = null;
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('4');
  }
}
