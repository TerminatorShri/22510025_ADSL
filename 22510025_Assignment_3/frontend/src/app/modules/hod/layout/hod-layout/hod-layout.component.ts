import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-hod-layout',
  imports: [RouterModule],
  templateUrl: './hod-layout.component.html',
  styleUrl: './hod-layout.component.css',
})
export class HodLayoutComponent {
  constructor(private router: Router) {}

  navigateHod(route: string | undefined) {
    this.router.navigate([`/hod/${route}`]);
  }
}
