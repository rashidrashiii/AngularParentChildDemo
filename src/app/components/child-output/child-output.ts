/**
 * CHILD OUTPUT COMPONENT - Demonstrates @Output decorator
 * 
 * PURPOSE: This component sends data/events TO its parent component
 * 
 * @Output decorator allows a child component to emit events that the parent can listen to.
 * This is the PRIMARY way for child-to-parent communication in Angular.
 * 
 * WHEN TO USE: When a child component needs to notify the parent about an action or send data up
 * 
 * ANTI-PATTERN WARNING:
 * ❌ DON'T pass a callback function from parent to child via @Input
 * ✅ DO use @Output with EventEmitter for child-to-parent communication
 */

import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-child-output',
  imports: [],
  templateUrl: './child-output.html',
  styleUrl: './child-output.css'
})
export class ChildOutputComponent {
  /**
   * @Output() decorator marks this property as an output property
   * EventEmitter is used to emit custom events
   * 
   * The generic type <string> indicates what type of data will be emitted
   * 
   * Parent listens to this event in its template:
   * <app-child-output (messageEvent)="handleMessage($event)"></app-child-output>
   */
  @Output() messageEvent = new EventEmitter<string>();

  /**
   * This method is called when the button is clicked
   * It emits an event with a message that the parent can receive
   */
  sendMessage() {
    const message = `Hello from Child! Sent at ${new Date().toLocaleTimeString()}`;
    
    /**
     * emit() method sends the data to the parent component
     * The parent receives this in the $event variable
     */
    this.messageEvent.emit(message);
  }
}
