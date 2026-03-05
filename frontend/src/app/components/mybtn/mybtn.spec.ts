import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Mybtn } from './mybtn';

describe('Mybtn', () => {
  let component: Mybtn;
  let fixture: ComponentFixture<Mybtn>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Mybtn]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Mybtn);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
