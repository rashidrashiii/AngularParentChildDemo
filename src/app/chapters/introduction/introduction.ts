import { CommonModule } from '@angular/common';
import { Component, inject, OnInit, ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ChapterService } from '../../services/chapter';

@Component({
  selector: 'app-introduction',
  imports: [RouterLink, CommonModule],
  templateUrl: './introduction.html',
  styleUrl: './introduction.css'
})
export class IntroductionComponent implements OnInit {
  chapterService = inject(ChapterService);
  cdr = inject(ChangeDetectorRef);

  // --- Demo 1: The Postal Service (Input/Output) ---
  postalState = {
    parentMessage: '',
    childInbox: [] as string[],
    isLetterFlyingDown: false,
    
    childReply: '',
    parentInbox: [] as string[],
    isLetterFlyingUp: false
  };

  // --- Demo 2: The Timer (ViewChild) ---
  timerState = {
    time: 0,
    isRunning: false,
    intervalId: null as any
  };

  // --- Demo 3: The Picture Frame (ContentChild) ---
  frameState = {
    selectedPhoto: null as string | null
  };

  availablePhotos = [
    { id: 'mountain', label: 'Mountain', emoji: '🏔️' },
    { id: 'ocean', label: 'Ocean', emoji: '🌊' },
    { id: 'city', label: 'City', emoji: '🏙️' }
  ];

  constructor() {}

  ngOnInit() {
    setTimeout(() => {
      this.chapterService.setActiveChapter('/');
    }, 0);
  }
  
  startLearning() {
    this.chapterService.markChapterAsCompleted('1');
  }

  // Postal Methods
  sendLetterToChild() {
    if (!this.postalState.parentMessage) return;
    
    this.postalState.isLetterFlyingDown = true;
    const messageToSend = this.postalState.parentMessage;
    this.postalState.parentMessage = ''; // Clear input immediately for better UX
    
    setTimeout(() => {
      this.postalState.isLetterFlyingDown = false;
      this.postalState.childInbox.push(messageToSend);
      this.cdr.detectChanges();
    }, 1500); // 1.5s flight time
  }

  replyToParent() {
    if (!this.postalState.childReply) return;

    this.postalState.isLetterFlyingUp = true;
    const messageToSend = this.postalState.childReply;
    this.postalState.childReply = ''; // Clear input immediately

    setTimeout(() => {
      this.postalState.isLetterFlyingUp = false;
      this.postalState.parentInbox.push(messageToSend);
      this.cdr.detectChanges();
    }, 1500);
  }

  // Timer Methods (ViewChild Logic)
  startTimer() {
    if (this.timerState.isRunning) return;
    
    this.timerState.isRunning = true;
    this.timerState.intervalId = setInterval(() => {
      this.timerState.time++;
      this.cdr.detectChanges();
    }, 100);
  }

  stopTimer() {
    this.timerState.isRunning = false;
    clearInterval(this.timerState.intervalId);
  }

  resetTimer() {
    this.stopTimer();
    this.timerState.time = 0;
  }

  get formattedTime() {
    return (this.timerState.time / 10).toFixed(1) + 's';
  }

  // Frame Methods (ContentChild Logic)
  selectPhoto(photoId: string) {
    this.frameState.selectedPhoto = photoId;
  }
  
  getPhotoEmoji(id: string | null) {
      return this.availablePhotos.find(p => p.id === id)?.emoji;
  }
}
