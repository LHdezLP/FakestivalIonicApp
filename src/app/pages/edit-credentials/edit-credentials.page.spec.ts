import { ComponentFixture, TestBed } from '@angular/core/testing';
import { EditCredentialsPage } from './edit-credentials.page';

describe('EditCredentialsPage', () => {
  let component: EditCredentialsPage;
  let fixture: ComponentFixture<EditCredentialsPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCredentialsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
