import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CodeViewerComponent, CodeTab } from '../code-viewer/code-viewer';

@Component({
  selector: 'app-interactive-demo',
  standalone: true,
  imports: [CommonModule, CodeViewerComponent],
  templateUrl: './interactive-demo.html',
  styleUrl: './interactive-demo.css'
})
export class InteractiveDemoComponent {
  @Input() title = '';
  @Input() description = '';
  
  // Support both single code and tabs
  @Input() code = ''; 
  @Input() language = 'typescript';
  @Input() tabs: CodeTab[] = [];

  @Output() reset = new EventEmitter<void>();

  activeTab: 'demo' | 'code' = 'demo';

  onReset() {
    this.reset.emit();
  }
}
