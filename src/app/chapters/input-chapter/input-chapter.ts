import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

@Component({
  selector: 'app-input-chapter',
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, FormsModule],
  templateUrl: './input-chapter.html',
  styleUrl: './input-chapter.css'
})
export class InputChapterComponent implements OnInit {
  chapterService = inject(ChapterService);

  // --- Demo 1: Basic String ---
  basicParentData = 'Hello World';
  basicChildData = 'Hello World';

  basicCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<div class="parent-container">
  <h2>Parent Component</h2>
  
  <!-- Pass string literal -->
  <app-child message="Hello direct string"></app-child>

  <!-- Pass variable -->
  <app-child [message]="parentData"></app-child>
</div>`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child',
  template: '<p>Message: {{ message }}</p>'
})
export class ChildComponent {
  // The @Input decorator marks this property as settable by the parent
  @Input() message: string = '';
}`,
    }
  ];

  // --- Demo 2: User Object ---
  userProfile = {
    name: 'Alice Johnson',
    role: 'Admin',
    avatar: '👩‍💻'
  };
  
  userCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<div class="user-manager">
  <!-- Parent passes the entire user object -->
  <!-- Any changes to 'currentUser' in parent will flow down -->
  <app-user-card [user]="currentUser"></app-user-card>
</div>`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Input } from '@angular/core';

export interface User {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html'
})
export class UserCardComponent {
  // Input accepts complex objects (interfaces/classes)
  // The '!' tells TypeScript this will be set before use
  @Input() user!: User;
}`,
    }
  ];

  // --- Demo 3: Interceptor (Setter) ---
  rawAgeInput: number = 25;
  processedAgeMessage: string = 'Age set to 25';
  
  interceptorCodeTabs: CodeTab[] = [
    {
       title: 'Parent HTML',
       language: 'html',
       code: `<!-- parent.component.html -->
<div class="form-control">
   <label>Enter Age:</label>
   <!-- Parent binds a number value -->
   <app-age-display [age]="userAge"></app-age-display>
</div>`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-age-display',
  template: '<p>Status: {{ _age }}</p>'
})
export class AgeDisplayComponent {
  private _age = 0;

  // Use a setter to intercept values from the parent
  // This runs every time the parent updates the value
  @Input()
  set age(val: number) {
    if (val < 0) {
      console.warn('Invalid age!');
      this._age = 0; // Sanitize logic
    } else {
      this._age = val;
    }
  }

  get age() {
    return this._age;
  }
}`,
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/'); // It should be /input ideally, but user reverted to / for intro? No, Input is /input.
      // Wait, let's check routes. Input is '/input'.
      // The user previous edits were about Intro page. This is Input chapter.
      this.chapterService.setActiveChapter('/input'); 
    }, 0);
  }

  // Basic Demo Logic
  updateBasicData(val: string) {
    this.basicParentData = val;
    this.basicChildData = val;
  }
  
  resetBasic() {
    this.basicParentData = 'Hello World';
    this.basicChildData = 'Hello World';
  }

  // User Profile Logic
  updateUserName(name: string) {
    // We must create a new object reference to trigger OnChanges if we were using it, 
    // but default change detection picks up property hydration in input often. 
    // Best practice is immutability.
    this.userProfile = { ...this.userProfile, name };
  }
  
  resetUser() {
    this.userProfile = { name: 'Alice Johnson', role: 'Admin', avatar: '👩‍💻' };
  }

  // Interceptor Logic
  updateAge(val: number) {
    this.rawAgeInput = val;
    // Simulate what the child setter does logic-wise for the display
    if (val < 0) {
        this.processedAgeMessage = '⛔ Invalid Age (Reset to 0)';
    } else if (val > 100) {
        this.processedAgeMessage = '👴 Wow, that is old! (' + val + ')';
    } else {
        this.processedAgeMessage = '✅ Age accepted: ' + val;
    }
  }

  resetInterceptor() {
    this.updateAge(25);
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('3');
  }
}
