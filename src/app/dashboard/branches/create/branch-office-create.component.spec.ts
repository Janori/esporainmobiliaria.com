import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchOfficeCreateComponent } from './branch-office-create.component';

describe('BranchOfficeCreateComponent', () => {
  let component: BranchOfficeCreateComponent;
  let fixture: ComponentFixture<BranchOfficeCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ BranchOfficeCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(BranchOfficeCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
