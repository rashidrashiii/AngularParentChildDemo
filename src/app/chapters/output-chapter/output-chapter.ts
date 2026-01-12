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
      code: `<!-- parent.component.html -->
<div class="list-container">
   <!-- Listen for the (delete) event emitted by the child -->
   <!-- When it fires, run onDelete() method in parent -->
   <app-child-item 
      (delete)="onDelete()">
   </app-child-item>
</div>`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-item',
  template: '<button (click)="handleDelete()">Delete Me</button>'
})
export class ChildItemComponent {
  // 1. Create the emitter
  @Output() delete = new EventEmitter<void>();

  handleDelete() {
    // 2. Emit the event up to the parent
    this.delete.emit();
  }
}`,
    }
  ];

  // --- Demo 2: Payload (Animal Selector) ---
  selectedAnimal = '🐶';
  
  animalCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<div>
   <h3>Selected: {{ selectedAnimal }}</h3>
   
   <!-- The $event variable allows access to the emitted data -->
   <app-animal-picker 
      (picked)="selectedAnimal = $event">
   </app-animal-picker>
</div>`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-animal-picker',
  template: \`
    <button (click)="pick('🐶')">🐶</button>
    <button (click)="pick('🐱')">🐱</button>
    <button (click)="pick('🐰')">🐰</button>
  \`
})
export class AnimalPickerComponent {
  // Emitter that sends a string payload
  @Output() picked = new EventEmitter<string>();

  pick(fruit: string) {
    // Emit the specific string
    this.picked.emit(fruit);
  }
}`,
    }
  ];

  // --- Demo 3: Complex Event (Voting) ---
  voteCount = 0;
  latestVote: { option: string, timestamp: Date } | null = null;
  
  voteCodeTabs: CodeTab[] = [
    {
       title: 'Parent HTML',
       language: 'html',
       code: `<!-- parent.component.html -->
<div class="voting-booth">
   <p>Total Votes: {{ voteCount }}</p>
   
   <!-- Handle the event with a method, passing $event -->
   <app-voter (voted)="handleVote($event)"></app-voter>
</div>`,
    },
     {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Output, EventEmitter } from '@angular/core';

// Define the shape of the event data
export interface VoteEvent {
  option: 'YES' | 'NO';
  timestamp: Date;
}

@Component({
  selector: 'app-voter',
  templateUrl: './voter.component.html'
})
export class VoterComponent {
  @Output() voted = new EventEmitter<VoteEvent>();

  castVote(option: 'YES' | 'NO') {
    const payload: VoteEvent = {
      option: option,
      timestamp: new Date()
    };
    
    this.voted.emit(payload);
  }
}`,
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
  onAnimalPicked(animal: string) {
    this.selectedAnimal = animal;
  }
  resetAnimal() {
    this.selectedAnimal = '❓';
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
