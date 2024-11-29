import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormPropertiesComponent } from './form-properties.component';

describe('FormPropertiesComponent', () => {
  let component: FormPropertiesComponent;
  let fixture: ComponentFixture<FormPropertiesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormPropertiesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormPropertiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
