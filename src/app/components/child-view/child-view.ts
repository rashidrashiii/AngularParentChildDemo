/**
 * CHILD VIEW COMPONENT - Demonstrates @ViewChild decorator (from parent perspective)
 * 
 * PURPOSE: This component will be accessed by the parent using @ViewChild
 * 
 * @ViewChild allows a parent to get a reference to a child component instance
 * and call its methods or access its properties directly.
 * 
 * WHEN TO USE: When parent needs to call child's methods or access DOM elements
 * Common use cases: focusing inputs, triggering animations, calling utility methods
 * 
 * ANTI-PATTERN WARNING:
 * ❌ DON'T use @ViewChild for data flow (use @Input/@Output instead)
 * ❌ DON'T access ViewChild in constructor or ngOnInit (it's not ready yet)
 * ✅ DO use @ViewChild for imperative actions (focus, scroll, etc.)
 * ✅ DO access ViewChild in ngAfterViewInit or later
 */

import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-child-view',
  imports: [],
  templateUrl: './child-view.html',
  styleUrl: './child-view.css'
})
export class ChildViewComponent {
  /**
   * @ViewChild gets a reference to the input element in this component's template
   * We use template reference variable #myInput in the template
   * 
   * ElementRef gives us access to the native DOM element
   */
  @ViewChild('myInput') inputElement!: ElementRef<HTMLInputElement>;

  /**
   * Public method that parent can call via @ViewChild reference
   * This demonstrates imperative control - parent tells child what to do
   */
  focusInput() {
    /**
     * Access the native DOM element and call focus()
     * This is a valid use case for direct DOM manipulation
     */
    this.inputElement.nativeElement.focus();
  }

  /**
   * Another example method that parent could call
   */
  clearInput() {
    this.inputElement.nativeElement.value = '';
  }
}
