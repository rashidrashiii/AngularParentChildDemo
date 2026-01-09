/**
 * PARENT COMPONENT - Demonstrates all parent-child communication patterns
 * 
 * This component demonstrates:
 * 1. @Input - Passing data to child components
 * 2. @Output - Receiving events from child components
 * 3. @ViewChild - Accessing child component methods
 * 4. Content Projection - Passing content to child components
 */

import { Component, ViewChild, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ChildInputComponent } from '../child-input/child-input';
import { ChildOutputComponent } from '../child-output/child-output';
import { ChildViewComponent } from '../child-view/child-view';
import { CardContentComponent } from '../card-content/card-content';

@Component({
  selector: 'app-parent',
  imports: [
    CommonModule,
    ChildInputComponent,
    ChildOutputComponent,
    ChildViewComponent,
    CardContentComponent
  ],
  templateUrl: './parent.html',
  styleUrl: './parent.css'
})
export class ParentComponent implements AfterViewInit {
  // ========== @Input Demo Data ==========
  /**
   * These properties will be passed to ChildInputComponent via @Input
   */
  username: string = 'John Doe';
  role: string = 'Developer';

  /**
   * Method to change the input values dynamically
   * This demonstrates that @Input properties are reactive
   */
  changeUserData() {
    this.username = 'Jane Smith';
    this.role = 'Senior Developer';
  }

  // ========== @Output Demo Data ==========
  /**
   * This property stores messages received from ChildOutputComponent
   */
  receivedMessage: string = '';

  /**
   * Event handler for messages from child
   * The $event parameter contains the data emitted by the child
   */
  handleMessage(message: string) {
    this.receivedMessage = message;
  }

  // ========== @ViewChild Demo ==========
  /**
   * @ViewChild gets a reference to the ChildViewComponent instance
   * This allows us to call methods on the child component
   * 
   * IMPORTANT: ViewChild is only available AFTER the view is initialized
   * That's why we implement AfterViewInit interface
   */
  @ViewChild(ChildViewComponent) childViewComponent!: ChildViewComponent;

  /**
   * ngAfterViewInit is called AFTER the component's view is fully initialized
   * This is the EARLIEST lifecycle hook where @ViewChild is available
   * 
   * WHY NOT ngOnInit? Because the child component's view isn't ready yet!
   * 
   * Lifecycle order:
   * 1. ngOnInit (ViewChild is undefined here)
   * 2. ngAfterViewInit (ViewChild is available here) ✅
   */
  ngAfterViewInit() {
    console.log('✅ Parent ngAfterViewInit - ChildViewComponent is now available');
    
    /**
     * ANTI-PATTERN WARNING:
     * If you try to access childViewComponent in ngOnInit, it will be undefined!
     * Always use ngAfterViewInit for ViewChild access
     */
  }

  /**
   * Method to focus the input in the child component
   * This demonstrates imperative control via @ViewChild
   */
  focusChildInput() {
    this.childViewComponent.focusInput();
  }

  /**
   * Another example of calling child methods
   */
  clearChildInput() {
    this.childViewComponent.clearInput();
  }
}
