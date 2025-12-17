import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasMentionsComponent } from './idas-mentions.component';

describe('IdasMentionsComponent', () => {
  let component: IdasMentionsComponent;
  let fixture: ComponentFixture<IdasMentionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasMentionsComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasMentionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
