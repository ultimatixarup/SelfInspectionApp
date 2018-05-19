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
  public static API_ENDPOINT='http://inspection-service.herokuapp.com';
  
  public static MEDIA_ENDPOINT='http://media-service-dev.herokuapp.com/media';

    public static INSPECTION_SERVICE= AppSettingsComponent.API_ENDPOINT + '/inspection';
  public static INSPECTION_RESOURCE_NOUN= AppSettingsComponent.API_ENDPOINT + '/inspection/resources/noun';
  public static INSPECTION_RESOURCE_LOCATION = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/location';
  public static INSPECTION_RESOURCE_DAMAGE = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/damage';
  public static INSPECTION_RESOURCE_FINDING = AppSettingsComponent.API_ENDPOINT + '/inspection/resources/finding';
  public static INSPECTION_FINDING = AppSettingsComponent.API_ENDPOINT + '/inspection/finding';
  public static VIN_SEARCH = 'https://vehicle-service-dev.herokuapp.com/vehicle';
  public static INSPECTION_PHOTO = AppSettingsComponent.API_ENDPOINT + '/inspection/photo';
  
  
  
  
  constructor() {
    console.log('Hello AppSettingsComponent Component');
    this.text = 'Hello World';
  }

}
