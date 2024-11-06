import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { DividerModule } from 'primeng/divider';
import { SidebarModule } from 'primeng/sidebar';

@Component({
  selector: 'app-side-bar',
  standalone: true,
  imports: [ButtonModule, DividerModule, RouterModule, CommonModule, SidebarModule],
  templateUrl: './side-bar.component.html',
  styleUrl: './side-bar.component.scss'
})
export class SideBarComponent {

}
