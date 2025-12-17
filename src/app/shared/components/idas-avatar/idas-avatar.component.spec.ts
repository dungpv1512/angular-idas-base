import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasAvatarComponent } from './idas-avatar.component';

describe('IdasAvatarComponent', () => {
  let component: IdasAvatarComponent;
  let fixture: ComponentFixture<IdasAvatarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasAvatarComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasAvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests
});
