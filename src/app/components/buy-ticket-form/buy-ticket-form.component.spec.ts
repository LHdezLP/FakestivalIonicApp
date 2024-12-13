import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { BuyTicketFormComponent } from './buy-ticket-form.component';

describe('BuyTicketFormComponent', () => {
  let component: BuyTicketFormComponent;
  let fixture: ComponentFixture<BuyTicketFormComponent>;

  beforeEach(waitForAsync(() => {
    
    TestBed.configureTestingModule({
      declarations: [ BuyTicketFormComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(BuyTicketFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
