import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Component, TemplateRef, ViewChild } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { IdasDrawerComponent } from './idas-drawer.component';

/**
 * Test host component để test IdasDrawerComponent
 */
@Component({
  standalone: true,
  imports: [IdasDrawerComponent],
  template: `
    <app-idas-drawer
      [visible]="visible"
      [title]="title"
      [width]="width"
      [placement]="placement"
      [closable]="closable"
      [maskClosable]="maskClosable"
      [keyboard]="keyboard"
      [footer]="footerTemplate ?? undefined"
      [extra]="extraTemplate ?? undefined"
      (visibleChange)="onVisibleChange($event)"
      (onClose)="onClose()"
      (onOpen)="onOpen()"
    >
      <div class="drawer-content">Test Content</div>
    </app-idas-drawer>

    <ng-template #footerTemplate>
      <div class="footer-content">Footer</div>
    </ng-template>

    <ng-template #extraTemplate>
      <div class="extra-content">Extra</div>
    </ng-template>
  `,
})
class TestHostComponent {
  visible = false;
  title = 'Test Drawer';
  width: string | number = 400;
  placement: 'left' | 'right' | 'top' | 'bottom' = 'right';
  closable = true;
  maskClosable = true;
  keyboard = true;

  @ViewChild('footerTemplate') footerTemplate!: TemplateRef<object>;
  @ViewChild('extraTemplate') extraTemplate!: TemplateRef<object>;

  visibleChangeCount = 0;
  closeCount = 0;
  openCount = 0;

  onVisibleChange(visible: boolean): void {
    this.visible = visible;
    this.visibleChangeCount++;
  }

  onClose(): void {
    this.closeCount++;
  }

  onOpen(): void {
    this.openCount++;
  }
}

describe('IdasDrawerComponent', () => {
  let component: IdasDrawerComponent;
  let fixture: ComponentFixture<IdasDrawerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [IdasDrawerComponent, NoopAnimationsModule],
    }).compileComponents();

    fixture = TestBed.createComponent(IdasDrawerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('Default values', () => {
    it('should have default visible as false', () => {
      expect(component.visible).toBe(false);
    });

    it('should have default title as empty string', () => {
      expect(component.title).toBe('');
    });

    it('should have default width as 256', () => {
      expect(component.width).toBe(256);
    });

    it('should have default placement as right', () => {
      expect(component.placement).toBe('right');
    });

    it('should have default closable as true', () => {
      expect(component.closable).toBe(true);
    });

    it('should have default maskClosable as true', () => {
      expect(component.maskClosable).toBe(true);
    });

    it('should have default keyboard as true', () => {
      expect(component.keyboard).toBe(true);
    });

    it('should have default mask as true', () => {
      expect(component.mask).toBe(true);
    });

    it('should have default zIndex as 1000', () => {
      expect(component.zIndex).toBe(1000);
    });
  });

  describe('handleClose', () => {
    it('should set visible to false', () => {
      component.visible = true;
      component.handleClose();
      expect(component.visible).toBe(false);
    });

    it('should emit visibleChange with false', () => {
      const spy = spyOn(component.visibleChange, 'emit');
      component.handleClose();
      expect(spy).toHaveBeenCalledWith(false);
    });

    it('should emit onClose event', () => {
      const spy = spyOn(component.onClose, 'emit');
      component.handleClose();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleAfterOpen', () => {
    it('should emit onOpen event', () => {
      const spy = spyOn(component.onOpen, 'emit');
      component.handleAfterOpen();
      expect(spy).toHaveBeenCalled();
    });
  });

  describe('handleVisibleChange', () => {
    it('should update visible and emit visibleChange when visible changes to true', () => {
      const spy = spyOn(component.visibleChange, 'emit');
      component.handleVisibleChange(true);
      expect(component.visible).toBe(true);
      expect(spy).toHaveBeenCalledWith(true);
    });

    it('should update visible, emit visibleChange and onClose when visible changes to false', () => {
      const visibleSpy = spyOn(component.visibleChange, 'emit');
      const closeSpy = spyOn(component.onClose, 'emit');
      component.visible = true;
      component.handleVisibleChange(false);
      expect(component.visible).toBe(false);
      expect(visibleSpy).toHaveBeenCalledWith(false);
      expect(closeSpy).toHaveBeenCalled();
    });
  });
});

describe('IdasDrawerComponent with TestHost', () => {
  let hostComponent: TestHostComponent;
  let hostFixture: ComponentFixture<TestHostComponent>;
  let drawerComponent: IdasDrawerComponent;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TestHostComponent, NoopAnimationsModule],
    }).compileComponents();

    hostFixture = TestBed.createComponent(TestHostComponent);
    hostComponent = hostFixture.componentInstance;
    hostFixture.detectChanges();

    const drawerDebugElement = hostFixture.debugElement.query(
      By.directive(IdasDrawerComponent)
    );
    drawerComponent = drawerDebugElement.componentInstance;
  });

  it('should create host component', () => {
    expect(hostComponent).toBeTruthy();
  });

  it('should pass inputs correctly', () => {
    expect(drawerComponent.title).toBe('Test Drawer');
    expect(drawerComponent.width).toBe(400);
    expect(drawerComponent.placement).toBe('right');
    expect(drawerComponent.closable).toBe(true);
    expect(drawerComponent.maskClosable).toBe(true);
    expect(drawerComponent.keyboard).toBe(true);
  });

  it('should emit visibleChange when drawer closes', () => {
    hostComponent.visible = true;
    hostFixture.detectChanges();

    drawerComponent.handleClose();
    hostFixture.detectChanges();

    expect(hostComponent.visible).toBe(false);
    expect(hostComponent.visibleChangeCount).toBeGreaterThan(0);
  });

  it('should emit onClose when drawer closes', () => {
    hostComponent.visible = true;
    hostFixture.detectChanges();

    drawerComponent.handleClose();
    hostFixture.detectChanges();

    expect(hostComponent.closeCount).toBe(1);
  });

  it('should update width when input changes', () => {
    hostComponent.width = 600;
    hostFixture.detectChanges();
    expect(drawerComponent.width).toBe(600);
  });

  it('should update placement when input changes', () => {
    hostComponent.placement = 'left';
    hostFixture.detectChanges();
    expect(drawerComponent.placement).toBe('left');
  });
});
