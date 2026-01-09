import { Injectable, signal } from '@angular/core';

export interface Chapter {
  id: string;
  title: string;
  route: string;
  isCompleted: boolean;
  isActive: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ChapterService {
  readonly chapters = signal<Chapter[]>([
    { id: '1', title: 'Introduction', route: '/', isCompleted: false, isActive: true },
    { id: '2', title: 'Component Communication', route: '/communication', isCompleted: false, isActive: false },
    { id: '3', title: '@Input Decorator', route: '/input', isCompleted: false, isActive: false },
    { id: '4', title: '@Output Decorator', route: '/output', isCompleted: false, isActive: false },
    { id: '5', title: '@ViewChild Decorator', route: '/view-child', isCompleted: false, isActive: false },
    { id: '6', title: '@ContentChild Decorator', route: '/content-child', isCompleted: false, isActive: false },
    { id: '7', title: 'Best Practices', route: '/best-practices', isCompleted: false, isActive: false },
    { id: '8', title: 'Hands-On Exercises', route: '/exercises', isCompleted: false, isActive: false },
    { id: '9', title: 'Summary & Resources', route: '/summary', isCompleted: false, isActive: false },
  ]);

  currentChapterIndex = signal(0);
  
  markChapterAsCompleted(id: string) {
    this.chapters.update(chapters => 
      chapters.map(c => c.id === id ? { ...c, isCompleted: true } : c)
    );
  }

  setActiveChapter(route: string) {
    this.chapters.update(chapters => 
      chapters.map((c, index) => {
        const isActive = c.route === route;
        if (isActive) this.currentChapterIndex.set(index);
        return { ...c, isActive };
      })
    );
  }
  
  getNextChapterRoute(): string | null {
    const nextIndex = this.currentChapterIndex() + 1;
    if (nextIndex < this.chapters().length) {
      return this.chapters()[nextIndex].route;
    }
    return null;
  }
  
  getPreviousChapterRoute(): string | null {
    const prevIndex = this.currentChapterIndex() - 1;
    if (prevIndex >= 0) {
      return this.chapters()[prevIndex].route;
    }
    return null;
  }
  
  getProgress(): number {
    const completed = this.chapters().filter(c => c.isCompleted).length;
    return Math.round((completed / this.chapters().length) * 100);
  }
}
