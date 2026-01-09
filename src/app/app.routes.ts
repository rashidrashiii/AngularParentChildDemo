import { Routes } from '@angular/router';
import { SidebarComponent } from './components/sidebar/sidebar';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./chapters/introduction/introduction').then(m => m.IntroductionComponent),
    title: 'Introduction - Angular Parent-Child Communication'
  },
  {
    path: 'communication',
    loadComponent: () => import('./chapters/communication-overview/communication-overview').then(m => m.CommunicationOverviewComponent),
    title: 'Overview - Angular Parent-Child Communication'
  },
  {
    path: 'input',
    loadComponent: () => import('./chapters/input-chapter/input-chapter').then(m => m.InputChapterComponent),
    title: '@Input - Angular Parent-Child Communication'
  },
  {
    path: 'output',
    loadComponent: () => import('./chapters/output-chapter/output-chapter').then(m => m.OutputChapterComponent),
    title: '@Output - Angular Parent-Child Communication'
  },
  {
    path: 'view-child',
    loadComponent: () => import('./chapters/view-child-chapter/view-child-chapter').then(m => m.ViewChildChapterComponent),
    title: '@ViewChild - Angular Parent-Child Communication'
  },
  {
    path: 'content-child',
    loadComponent: () => import('./chapters/content-child-chapter/content-child-chapter').then(m => m.ContentChildChapterComponent),
    title: '@ContentChild - Angular Parent-Child Communication'
  },
  {
    path: 'best-practices',
    loadComponent: () => import('./chapters/best-practices/best-practices').then(m => m.BestPracticesComponent),
    title: 'Best Practices - Angular Parent-Child Communication'
  },
  {
    path: 'exercises',
    loadComponent: () => import('./components/exercises/exercises').then(m => m.ExercisesComponent),
    title: 'Exercises - Angular Parent-Child Communication'
  },
  {
    path: 'summary',
    loadComponent: () => import('./chapters/summary-chapter/summary-chapter').then(m => m.SummaryChapterComponent),
    title: 'Summary - Angular Parent-Child Communication'
  }
];
