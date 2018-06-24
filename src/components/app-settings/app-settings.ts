import { Component } from '@angular/core';

/**
 * Generated class for the AppSettingsComponent component.
 *
 * See https://angular.io/api/core/Component for more info on Angular
 * Components.
 */
@Component({
  selector: 'app-settings',
  templateUrl: 'app-settings.html'
})
export class AppSettingsComponent {

  text: string;
  public static API_ENDPOINT='http://inspection-service-dev02.herokuapp.com';
  
  public static MEDIA_ENDPOINT= 'https://media-service-dev02.herokuapp.com' + '/media';

    public static INSPECTION_SERVICE= AppSettingsComponent.API_ENDPOINT + '/inspection';
  public static INSPECTION_RESOURCE_NOUN= AppSettingsComponent.API_ENDPOINT + '/inspection/resources/noun';
  public static INSPECTION_RESOURCE_LOCATION = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/location';
  public static INSPECTION_RESOURCE_DAMAGE = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/damage';
  public static INSPECTION_RESOURCE_FINDING = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/finding';
  public static INSPECTION_FINDING = AppSettingsComponent.API_ENDPOINT + '/inspection/finding';
  public static VIN_SEARCH = 'https://vehicle-service-stage.herokuapp.com' + '/vehicle';
  public static INSPECTION_PHOTO = AppSettingsComponent.API_ENDPOINT + '/inspection/photo';
  
  
  public static AI_SERVICE= AppSettingsComponent.API_ENDPOINT + '/damageAnalysis';
  
  public static LOGOUT =  'http://autofinance.auth0.com/v2/logout';
  
  constructor() {
    console.log('Hello AppSettingsComponent Component');
    this.text = 'Hello World';
  }

}
