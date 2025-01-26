import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  template: `
    <div class="container mx-auto">
      <router-outlet></router-outlet>
    </div>
  `,
  standalone: true,
  imports: [RouterOutlet],
})
export class AppComponent {}
