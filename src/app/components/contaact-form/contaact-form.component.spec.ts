import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContaactFormComponent } from './contaact-form.component';

describe('ContaactFormComponent', () => {
  let component: ContaactFormComponent;
  let fixture: ComponentFixture<ContaactFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContaactFormComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ContaactFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
