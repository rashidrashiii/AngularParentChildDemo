/**
 * CHILD INPUT COMPONENT - Demonstrates @Input decorator
 * 
 * PURPOSE: This component receives data FROM its parent component
 * 
 * @Input decorator allows a parent component to pass data down to a child.
 * This is the PRIMARY way to pass data from parent to child in Angular.
 * 
 * WHEN TO USE: When a child component needs to display or use data that the parent controls
 * 
 * ANTI-PATTERN WARNING:
 * ❌ DON'T use @ViewChild to access child component properties to set data
 * ✅ DO use @Input to pass data from parent to child
 */

import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-child-input',
  imports: [],
  templateUrl: './child-input.html',
  styleUrl: './child-input.css'
})
export class ChildInputComponent {
  /**
   * @Input() decorator marks these properties as input properties
   * The parent component can bind to these properties in its template
   * 
   * Example in parent template:
   * <app-child-input [username]="parentUsername" [role]="parentRole"></app-child-input>
   */
  @Input() username: string = '';
  @Input() role: string = '';
}
