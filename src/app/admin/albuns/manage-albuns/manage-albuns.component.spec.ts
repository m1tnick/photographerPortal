import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageAlbunsComponent } from './manage-albuns.component';

describe('ManageAlbunsComponent', () => {
  let component: ManageAlbunsComponent;
  let fixture: ComponentFixture<ManageAlbunsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ManageAlbunsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ManageAlbunsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
