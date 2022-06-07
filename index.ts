// Import stylesheets
import './style.css';
import {
  LonelyInt,
  DiagDifference,
  CountingSort,
  TowerBreaker,
} from './exercises';

// Write TypeScript code!
const appDiv: HTMLElement = document.getElementById('app');

// Lonely Integer HR
customElements.define('lonely-int', LonelyInt);
customElements.define('diag-diff', DiagDifference);
customElements.define('counting-sort', CountingSort);
customElements.define('tower-breaker', TowerBreaker);
