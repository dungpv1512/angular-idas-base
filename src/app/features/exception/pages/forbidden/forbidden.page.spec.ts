import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Router } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';
import { ForbiddenPage } from './forbidden.page';

describe('ForbiddenPage', () => {
  let component: ForbiddenPage;
  let fixture: ComponentFixture<ForbiddenPage>;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ForbiddenPage, TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(ForbiddenPage);
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
