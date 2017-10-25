import { AppComponent } from './app.component';
import { RouterTestingModule } from '@angular/router/testing';
import { CoreModule } from './core/core.module';
import { routes } from './routes';
import { DebugElement } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

describe('AppComponent', () => {
  let de: DebugElement;
  let comp: AppComponent;
  let fixture: ComponentFixture<AppComponent>;

  // TODO: only define routes needed for testing, maybe don't want to test this file at all?
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [ RouterTestingModule.withRoutes(routes), CoreModule ],
      declarations: [ AppComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('img'));
  });

  it('should create component', () => expect(comp).toBeDefined() );

  it('should have <img>', () => {
    fixture.detectChanges();
    expect(de).toBeDefined();
  });
});
