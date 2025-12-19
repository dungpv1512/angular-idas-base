import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { NotFoundPage } from './not-found.page';

describe('NotFoundPage', () => {
  let component: NotFoundPage;
  let fixture: ComponentFixture<NotFoundPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NotFoundPage, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(NotFoundPage);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to home when goHome is called', () => {
    const navigateSpy = spyOn(router, 'navigate');
    component.goHome();
    expect(navigateSpy).toHaveBeenCalledWith(['/']);
  });

  it('should go back when goBack is called', () => {
    const historySpy = spyOn(window.history, 'back');
    component.goBack();
    expect(historySpy).toHaveBeenCalled();
  });
});
