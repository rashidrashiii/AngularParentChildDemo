import { Component, inject, ViewChild, ElementRef, AfterViewInit, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';
import { InteractiveDemoComponent } from '../../components/interactive-demo/interactive-demo';
import { CodeTab } from '../../components/code-viewer/code-viewer';

// --- Helper Component for Demo 2 ---
@Component({
  selector: 'app-audio-player',
  standalone: true,
  template: `
    <div class="player-display">
      <div class="track-info">
        <span class="icon">{{ isPlaying ? '🔊' : '🔇' }}</span>
        <span class="text">{{ currentTrack }}</span>
      </div>
      <div class="progress-bar">
        <div class="fill" [style.width.%]="progress"></div>
      </div>
    </div>
  `,
  styles: [`
    .player-display {
      background: #0f172a;
      border: 2px solid #334155;
      color: #38bdf8;
      padding: 1rem;
      border-radius: 8px;
      text-align: center;
      width: 100%;
    }
    .track-info {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
        font-family: monospace;
    }
    .progress-bar {
        height: 6px;
        background: #1e293b;
        border-radius: 3px;
        overflow: hidden;
    }
    .fill {
        height: 100%;
        background: #38bdf8;
        transition: width 0.2s linear;
    }
  `]
})
export class AudioPlayerComponent {
  isPlaying = false;
  currentTrack = 'Track 1';
  progress = 0;
  private intervalId: any;

  play() {
    if (this.isPlaying) return;
    this.isPlaying = true;
    this.intervalId = setInterval(() => {
        this.progress += 5;
        if (this.progress > 100) this.progress = 0;
    }, 200);
  }

  pause() {
    this.isPlaying = false;
    clearInterval(this.intervalId);
  }

  setTrack(trackName: string) {
    this.currentTrack = trackName;
    this.progress = 0;
    // Auto play new track
    this.pause(); 
    this.play();
  }

  reset() {
      this.pause();
      this.progress = 0;
      this.currentTrack = 'Track 1';
  }
}

// --- Main Chapter Component ---
@Component({
  selector: 'app-view-child-chapter',
  imports: [CommonModule, RouterLink, InteractiveDemoComponent, AudioPlayerComponent],
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
  @ViewChild(AudioPlayerComponent) player!: AudioPlayerComponent;
  
  audioCodeTabs: CodeTab[] = [
    {
       title: 'Parent HTML',
       language: 'html',
       code: `<app-audio-player></app-audio-player>
<button (click)="playMusic()">Play</button>
<button (click)="nextTrack()">Next</button>`
    },
    {
      title: 'Parent TS',
      language: 'typescript',
      code: `@ViewChild(AudioPlayerComponent) player!: AudioPlayerComponent;

playMusic() {
  this.player.play(); // Direct control!
}

nextTrack() {
  this.player.setTrack('Next Song');
}`
    },
    {
      title: 'Child TS',
      language: 'typescript',
      code: `@Component({...})
export class AudioPlayerComponent {
  isPlaying = false;

  play() {
    this.isPlaying = true;
    // ... start audio logic
  }
}`
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
  playMusic() { this.player.play(); }
  pauseMusic() { this.player.pause(); }
  nextTrack() { 
      const tracks = ['Track 1', 'Track 2', 'Track 3'];
      const currentIdx = tracks.indexOf(this.player.currentTrack);
      const nextIdx = (currentIdx + 1) % tracks.length;
      this.player.setTrack(tracks[nextIdx]);
  }

  resetAudioDemo() {
    this.player.reset();
  }

  nextChapter() {
    this.chapterService.markChapterAsCompleted('5');
  }
}
