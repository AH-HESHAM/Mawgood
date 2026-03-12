import { Component } from '@angular/core';
import { Slider } from '../slider/slider';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [Slider, RouterLink],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home {}
