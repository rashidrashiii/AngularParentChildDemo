import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';

export interface CodeTab {
  title: string;
  code: string;
  language: string;
}

@Component({
  selector: 'app-code-viewer',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './code-viewer.html',
  styleUrl: './code-viewer.css'
})
export class CodeViewerComponent {
  @Input() tabs: CodeTab[] = [];
  @Input() activeTabIndex = 0;
  
  // Backward compatibility
  @Input() set code(value: string) {
    if (value) {
       this.tabs = [{ title: 'Source', code: value, language: this.language || 'typescript' }];
    }
  }
  @Input() title: string = ''; 
  @Input() language: string = 'typescript';

  get activeTab() {
    return this.tabs[this.activeTabIndex];
  }

  setActiveTab(index: number) {
    this.activeTabIndex = index;
  }

  copyToClipboard() {
    if (this.activeTab) {
      navigator.clipboard.writeText(this.activeTab.code);
    }
  }
}

