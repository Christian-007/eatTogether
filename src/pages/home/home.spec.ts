import { async, TestBed } from '@angular/core/testing';
import { IonicModule } from 'ionic-angular';
import { HomePage } from './home';
import { NavController, AlertController, LoadingController, Loading } from 'ionic-angular'; 
import { HttpModule } from '@angular/http';
import { RestapiserviceProvider } from '../../providers/restapiservice/restapiservice';

describe('HomePage', () => {
  let fixture;
  let component;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [HomePage],
      imports: [
        IonicModule.forRoot(HomePage),
        HttpModule
      ],
      providers: [
        NavController,
        RestapiserviceProvider,
        LoadingController,
        AlertController
      ]
    })
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomePage);
    component = fixture.componentInstance;
  });

  it ('should be created', () => {
    expect(component instanceof HomePage).toBe(true);
  });

  it('should return a title', () => {
    let result = component.getTitle();
    expect(result).toBe('My Page');
            
  });

  it('should have no loading spinner', () => {
    expect(component.loading).toBeUndefined();
  });


});