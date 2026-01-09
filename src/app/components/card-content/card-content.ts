/**
 * CARD CONTENT COMPONENT - Demonstrates @ContentChild and ng-content
 * 
 * PURPOSE: This component uses content projection to receive content from parent
 * 
 * ng-content allows a component to accept and display content passed from parent
 * @ContentChild allows the component to query and access that projected content
 * 
 * WHEN TO USE: When creating reusable wrapper/container components
 * Examples: cards, modals, tabs, accordions
 * 
 * LIFECYCLE: Content is available in ngAfterContentInit, NOT in ngOnInit
 * 
 * ANTI-PATTERN WARNING:
 * ❌ DON'T access ContentChild in ngOnInit (it's not ready yet)
 * ✅ DO access ContentChild in ngAfterContentInit or later
 */

import { Component, ContentChild, ElementRef, AfterContentInit } from '@angular/core';

@Component({
  selector: 'app-card-content',
  imports: [],
  templateUrl: './card-content.html',
  styleUrl: './card-content.css'
})
export class CardContentComponent implements AfterContentInit {
  /**
   * @ContentChild queries for projected content
   * Here we're looking for a button element that was projected into this component
   * 
   * The selector 'projectedButton' matches a template reference variable
   * Parent uses: <button #projectedButton>Click me</button>
   */
  @ContentChild('projectedButton') button?: ElementRef<HTMLButtonElement>;

  /**
   * ngAfterContentInit is called AFTER projected content is initialized
   * This is the EARLIEST lifecycle hook where ContentChild is available
   * 
   * WHY NOT ngOnInit? Because projected content isn't ready yet!
   * 
   * Lifecycle order:
   * 1. ngOnInit (ContentChild is undefined here)
   * 2. ngAfterContentInit (ContentChild is available here) ✅
   */
  ngAfterContentInit() {
    if (this.button) {
      console.log('✅ Projected button detected in ngAfterContentInit!');
      console.log('Button text:', this.button.nativeElement.textContent);
    } else {
      console.log('ℹ️ No button was projected into this component');
    }
  }
}
