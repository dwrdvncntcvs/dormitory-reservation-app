import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DormitoryDetailAdminPage } from './dormitory-detail-admin.page';

describe('DormitoryDetailAdminPage', () => {
  let component: DormitoryDetailAdminPage;
  let fixture: ComponentFixture<DormitoryDetailAdminPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryDetailAdminPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DormitoryDetailAdminPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
