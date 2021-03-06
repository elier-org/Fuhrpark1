import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { BookcarComponent } from './bookcar.component';

describe('BookcarComponent', () => {
  let component: BookcarComponent;
  let fixture: ComponentFixture<BookcarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ BookcarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BookcarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
