import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MypostedproductComponent } from './mypostedproduct.component';

describe('MypostedproductComponent', () => {
  let component: MypostedproductComponent;
  let fixture: ComponentFixture<MypostedproductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [MypostedproductComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(MypostedproductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
