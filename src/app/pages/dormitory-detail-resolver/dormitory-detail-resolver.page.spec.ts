import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DormitoryDetailResolverPage } from './dormitory-detail-resolver.page';

describe('DormitoryDetailResolverPage', () => {
  let component: DormitoryDetailResolverPage;
  let fixture: ComponentFixture<DormitoryDetailResolverPage>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DormitoryDetailResolverPage ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DormitoryDetailResolverPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
