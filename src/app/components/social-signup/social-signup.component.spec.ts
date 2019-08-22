import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SocialSignupComponent } from './social-signup.component';

describe('SocialSignupComponent', () => {
  let component: SocialSignupComponent;
  let fixture: ComponentFixture<SocialSignupComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SocialSignupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SocialSignupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
