import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
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

  // --- Demo 1: The Postal Service (Input/Output) ---
  postalState = {
    parentMessage: '',
    childInbox: [] as string[],
    isLetterFlyingDown: false,
    
    childReply: '',
    parentInbox: [] as string[],
    isLetterFlyingUp: false
  };

  // --- Demo 2: The Remote Control (ViewChild) ---
  remoteState = {
    isShaking: false,
    robotColor: 'neutral', // neutral, happy, angry
    statusMessage: 'Ready for commands...'
  };

  // --- Demo 3: The Gift Box (ContentChild) ---
  giftState = {
    selectedGift: null as string | null,
    isBoxOpen: false
  };

  availableGifts = ['🍎', '🧸', '⚽', '🎸'];

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
    }, 1500);
  }

  // Remote Methods
  commandShake() {
    this.remoteState.statusMessage = 'Executing: SHAKE command...';
    this.remoteState.isShaking = true;
    setTimeout(() => {
      this.remoteState.isShaking = false;
      this.remoteState.statusMessage = 'Command complete.';
    }, 800);
  }

  commandColor(color: string) {
    this.remoteState.statusMessage = `Executing: CHANGE_COLOR(${color}) command...`;
    this.remoteState.robotColor = color;
  }

  resetRobot() {
    this.remoteState.isShaking = false;
    this.remoteState.robotColor = 'neutral';
    this.remoteState.statusMessage = 'Robot reset.';
  }

  // Gift Methods
  wrapGift(gift: string) {
    this.giftState.isBoxOpen = false; // Reset
    setTimeout(() => {
        this.giftState.selectedGift = gift;
    }, 100);
  }

  openGiftBox() {
    this.giftState.isBoxOpen = true;
  }
}
