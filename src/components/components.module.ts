import { NgModule } from '@angular/core';
import { AppSettingsComponent } from './app-settings/app-settings';
import { ImageTakerComponent } from './image-taker/image-taker';
@NgModule({
	declarations: [AppSettingsComponent,
    ImageTakerComponent],
	imports: [],
	exports: [AppSettingsComponent,
    ImageTakerComponent]
})
export class ComponentsModule {}
