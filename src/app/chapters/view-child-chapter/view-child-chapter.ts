import { Component, inject, ViewChild, ElementRef, AfterViewInit, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

// --- Helper Component for Demo 2 ---
@Component({
  selector: 'app-stopwatch',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="stopwatch-display">
       {{ formattedTime }}
    </div>
  `,
  styles: [`
    .stopwatch-display {
      background: #0f172a;
      border: 4px solid #334155;
      color: #38bdf8;
      padding: 1.5rem;
      border-radius: 50%;
      text-align: center;
      width: 150px;
      height: 150px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: 'Courier New', monospace;
      font-size: 2rem;
      font-weight: bold;
      box-shadow: 0 0 15px rgba(0,0,0,0.3);
      transition: border-color 0.3s, color 0.3s;
    }
    .running {
        border-color: #38bdf8;
        color: #e0f2fe;
    }
  `]
})
export class StopwatchComponent {
  seconds = 0;
  isRunning = false;
  private intervalId: any;
  cdr = inject(ChangeDetectorRef);

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.intervalId = setInterval(() => {
        this.seconds++;
        this.cdr.markForCheck();
    }, 100);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.intervalId);
    this.cdr.markForCheck();
  }

  reset() {
      this.stop();
      this.seconds = 0;
      this.cdr.markForCheck();
  }

  get formattedTime() {
      return (this.seconds / 10).toFixed(1);
  }
}

// --- Main Chapter Component ---
@Component({
  selector: 'app-view-child-chapter',
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, StopwatchComponent],
  templateUrl: './view-child-chapter.html',
  styleUrl: './view-child-chapter.css'
})
export class ViewChildChapterComponent implements OnInit, AfterViewInit {
  chapterService = inject(ChapterService);
  
  // Demo 1: DOM Elements
  @ViewChild('colorInput') colorInput!: ElementRef<HTMLInputElement>;
  currentColor = '#38bdf8'; // Default Cyan

  domCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<input #myInput type="color">
<button (click)="focusInput()">Focus It</button>`
    },
    {
      title: 'Parent TS',
      language: 'typescript',
      code: `@ViewChild('myInput') inputRef!: ElementRef;

focusInput() {
  // Direct DOM access
  this.inputRef.nativeElement.focus();
  this.inputRef.nativeElement.click(); // Open picker
}`
    }
  ];
  // Demo 2: Child Components
  @ViewChild(StopwatchComponent) stopwatch!: StopwatchComponent;
  
  stopwatchCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<div class="control-panel">
  <h3>Parent Controls</h3>
  <!-- We put a template reference variable (#timer) on the child tag -->
  <app-stopwatch #timer></app-stopwatch>

  <div class="buttons">
    <button (click)="startChildTimer()">Start</button>
    <button (click)="stopChildTimer()">Stop</button>
  </div>
</div>`,
    },
    {
      title: 'Parent TS',
      language: 'typescript',
      code: `import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { StopwatchComponent } from './stopwatch.component';

@Component({
  selector: 'app-parent',
  templateUrl: './parent.component.html'
})
export class ParentComponent implements AfterViewInit {
  // Query the child component using its class
  @ViewChild(StopwatchComponent) 
  stopwatch!: StopwatchComponent;

  ngAfterViewInit() {
    // Child is fully available here
    console.log(this.stopwatch);
  }

  startChildTimer() {
    // Call methods on the child instance directly!
    this.stopwatch.start();
  }

  stopChildTimer() {
    this.stopwatch.stop();
  }
}`,
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `import { Component } from '@angular/core';

@Component({
  selector: 'app-stopwatch',
  template: '<h2>{{ time }}</h2>'
})
export class StopwatchComponent {
  time = 0;
  intervalId: any;

  // This method is called by the parent
  start() {
    if (this.intervalId) return;
    this.intervalId = setInterval(() => this.time++, 1000);
  }

  stop() {
    clearInterval(this.intervalId);
    this.intervalId = null;
  }
}`,
    }
  ];

  // DOM Demo
  colorCodeTabs: CodeTab[] = [
    {
      title: 'Parent HTML',
      language: 'html',
      code: `<!-- parent.component.html -->
<div>
   <!-- A plain HTML element with a reference variable #box -->
   <div #box class="color-box"></div>
   
   <button (click)="changeColor()">Change Color</button>
</div>`,
    },
    {
      title: 'Parent TS',
      language: 'typescript',
      code: `import { Component, ViewChild, ElementRef } from '@angular/core';

@Component({ ... })
export class ParentComponent {
  // Query for the DOM element. The type is ElementRef.
  @ViewChild('box') 
  boxRef!: ElementRef<HTMLDivElement>;

  changeColor() {
    // Access the native DOM element
    const div = this.boxRef.nativeElement;
    
    div.style.backgroundColor = 'purple';
    div.innerHTML = 'Clicked!';
  }
}`,
    }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/view-child');
    }, 0);
  }

  ngAfterViewInit() {
    // ViewChild is ready here
  }

  // Demo 1 Logic
  openColorPicker() {
    this.colorInput.nativeElement.click();
    this.colorInput.nativeElement.focus();
  }

  onColorChange(e: Event) {
    const target = e.target as HTMLInputElement;
    this.currentColor = target.value;
  }

  resetDomDemo() {
    this.currentColor = '#38bdf8';
  }

  // Demo 2 Logic
  startStopwatch() { this.stopwatch.start(); }
  stopStopwatch() { this.stopwatch.stop(); }
  resetStopwatch() { this.stopwatch.reset(); }

  resetTimerDemo() {
    this.stopwatch.reset();
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('5');
  }
}
