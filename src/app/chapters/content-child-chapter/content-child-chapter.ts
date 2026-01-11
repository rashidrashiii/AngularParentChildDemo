import { Component, inject, ContentChild, AfterContentInit, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

// --- Helper: Child Content (The Badge) ---
@Component({
  selector: 'app-user-badge',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="user-badge" [class.admin]="role === 'admin'">
       <span class="avatar">{{ role === 'admin' ? '🛡️' : '👤' }}</span>
       <span class="name">{{ name }}</span>
       <span class="role-tag" *ngIf="role === 'admin'">ADMIN</span>
    </div>
  `,
  styles: [`
    .user-badge {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.5rem 1rem;
        background: #f1f5f9;
        border-radius: 50px;
        border: 1px solid #cbd5e1;
        color: #334155;
        font-weight: 500;
    }
    .user-badge.admin {
        background: #fffbeb; /* yellow-50 */
        border-color: #fcd34d; /* yellow-300 */
        color: #b45309; /* yellow-700 */
    }
    .role-tag {
        font-size: 0.6rem;
        background: #fcd34d;
        color: #78350f;
        padding: 0.1rem 0.3rem;
        border-radius: 4px;
        font-weight: bold;
    }
  `]
})
export class UserBadgeComponent {
  @Input() name = 'Guest';
  @Input() role: 'user' | 'admin' = 'user';
}

// --- Helper: Parent Container (The Card) ---
@Component({
  selector: 'app-profile-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="profile-card" [class.gold-border]="role === 'admin'">
       <div class="card-header">
         User Profile
       </div>
       <div class="card-body">
         <!-- We project the badge here -->
         <ng-content></ng-content>
       </div>
       <div class="card-footer" *ngIf="role === 'admin'">
          👑 Gold Member Benefits Active
       </div>
    </div>
  `,
  styles: [`
    .profile-card {
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 12px;
      overflow: hidden;
      width: 100%;
      transition: all 0.3s;
    }
    .profile-card.gold-border {
        border-color: #f59e0b; /* Amber 500 */
        box-shadow: 0 4px 15px rgba(245, 158, 11, 0.2);
    }
    .card-header {
        background: #f8fafc;
        padding: 0.75rem 1rem;
        font-size: 0.8rem;
        font-weight: bold;
        color: #64748b;
        border-bottom: 1px solid #e2e8f0;
    }
    .card-body {
        padding: 1.5rem;
        display: flex;
        justify-content: center;
    }
    .card-footer {
        background: #fffbeb;
        color: #b45309;
        font-size: 0.75rem;
        padding: 0.5rem;
        text-align: center;
        border-top: 1px solid #fef3c7;
    }
  `]
})
export class ProfileCardComponent implements AfterContentInit {
  // Query for the projected UserBadgeComponent
  @ContentChild(UserBadgeComponent) badge?: UserBadgeComponent;
  role = 'user';

  ngAfterContentInit() {
    // ContentChild is queryable here
    if (this.badge) {
        this.role = this.badge.role;
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
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, ProfileCardComponent, UserBadgeComponent, DemoCardComponent],
  templateUrl: './content-child-chapter.html',
  styleUrl: './content-child-chapter.css'
})
export class ContentChildChapterComponent implements OnInit {
  chapterService = inject(ChapterService);
  
  // --- Demo 1: Simple Projection ---
  simpleCodeTabs: CodeTab[] = [
    {
      title: 'Usage (Parent)',
      language: 'html',
      code: `<app-demo-card>
  <header>My Title</header>
  <p>Some content goes here...</p>
</app-demo-card>`
    },
    {
      title: 'Card Template',
      language: 'html',
      code: `<div class="card">
  <ng-content select="header"></ng-content>
  <ng-content></ng-content>
</div>`
    }
  ];

  // --- Demo 2: Interactive ContentChild (Profile Card) ---
  currentUser = 'Alice';
  currentRole: 'user' | 'admin' = 'admin';

  toggleRole() {
      this.currentRole = this.currentRole === 'admin' ? 'user' : 'admin';
  }

  changeUser() {
      this.currentUser = this.currentUser === 'Alice' ? 'Bob' : 'Alice';
  }

  profileCodeTabs: CodeTab[] = [
    {
       title: 'Usage (Parent)',
       language: 'html',
       code: `<app-profile-card>
  <!-- We put the badge INSIDE the card -->
  <app-user-badge 
      [name]="currentUser" 
      [role]="currentRole">
  </app-user-badge>
</app-profile-card>`
    },
    {
      title: 'Card Component TS',
      language: 'typescript',
      code: `@ContentChild(UserBadgeComponent) badge?: UserBadgeComponent;

ngAfterContentInit() {
  // We can see what was projected!
  if (this.badge?.role === 'admin') {
     this.enableGoldMode();
  }
}`
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
