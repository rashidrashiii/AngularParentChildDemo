import { Component, inject, ContentChild, AfterContentInit, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

// --- Helper: Coupon (The Data) ---
@Component({
  selector: 'app-coupon',
  standalone: true,
  template: `
    <div class="coupon-tag">
       ✂️ {{ code }}
    </div>
  `,
  styles: [`
    .coupon-tag {
        display: inline-block;
        background: #fdf2f8; /* pink-50 */
        color: #db2777; /* pink-600 */
        border: 1px dashed #db2777;
        padding: 0.25rem 0.5rem;
        border-radius: 4px;
        font-size: 0.8rem;
        font-weight: bold;
        margin-top: 0.5rem;
    }
  `]
})
export class CouponComponent {
  @Input() code = '';
}

// --- Helper: Ticket Card (The Host) ---
@Component({
  selector: 'app-ticket-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="ticket">
       <div class="ticket-header">
         <ng-content select=".route"></ng-content>
       </div>
       <div class="ticket-body">
         <div class="price-row">
            <span>Total:</span>
            <div class="prices">
                <span class="original-price" [class.crossed]="!!coupon">
                    $500
                </span>
                <span class="discount-price" *ngIf="coupon">
                    $400
                </span>
            </div>
         </div>
         
         <!-- We project the coupon visual here too, just so you see it -->
         <ng-content select="app-coupon"></ng-content>
       </div>
       
       <div class="msg" *ngIf="coupon">
          ✅ Coupon Applied: {{ coupon.code }}
       </div>
    </div>
  `,
  styles: [`
    .ticket {
      background: white;
      color: #0f172a;
      border-radius: 8px;
      overflow: hidden;
      width: 100%;
      box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
    }
    .ticket-header {
        background: #38bdf8;
        padding: 0.75rem;
        font-weight: bold;
        color: white;
    }
    .ticket-body {
        padding: 1rem;
    }
    .price-row {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 0.5rem;
        font-weight: 600;
    }
    .original-price.crossed {
        text-decoration: line-through;
        color: #94a3b8;
        font-size: 0.9rem;
    }
    .discount-price {
        color: #22c55e;
        font-size: 1.2rem;
        margin-left: 0.5rem;
    }
    .msg {
        background: #ecfdf5;
        color: #166534;
        font-size: 0.75rem;
        padding: 0.5rem;
        text-align: center;
    }
  `]
})
export class TicketCardComponent implements AfterContentInit {
  // Query for the projected CouponComponent
  @ContentChild(CouponComponent) coupon?: CouponComponent;

  ngAfterContentInit() {
    // ContentChild is queryable here
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
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, TicketCardComponent, CouponComponent, DemoCardComponent],
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

  // --- Demo 2: Interactive ContentChild (Flight Ticket) ---
  hasCoupon = false;

  toggleCoupon() {
      this.hasCoupon = !this.hasCoupon;
  }

  ticketCodeTabs: CodeTab[] = [
    {
       title: 'Usage (Parent)',
       language: 'html',
       code: `<app-ticket-card>
  <div class="route">NYC -> LHR</div>
  
  <!-- Projected Conditionally -->
  <app-coupon *ngIf="hasCoupon" code="SAVE20">
  </app-coupon>
</app-ticket-card>`
    },
    {
      title: 'Ticket Component TS',
      language: 'typescript',
      code: `@ContentChild(CouponComponent) coupon?: CouponComponent;

// Now we can access properties of the projected component!
// e.g. this.coupon.code`
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
