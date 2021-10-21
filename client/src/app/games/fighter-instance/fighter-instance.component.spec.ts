import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FighterInstanceComponent } from './fighter-instance.component';

describe('FighterInstanceComponent', () => {
  let component: FighterInstanceComponent;
  let fixture: ComponentFixture<FighterInstanceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FighterInstanceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FighterInstanceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
