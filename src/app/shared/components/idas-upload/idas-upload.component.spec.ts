import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IdasUploadComponent } from './idas-upload.component';

describe('IdasUploadComponent', () => {
  let component: IdasUploadComponent;
  let fixture: ComponentFixture<IdasUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasUploadComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(IdasUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  // TODO: Thêm tests chi tiết
});
