import { HttpClient, HttpClientModule } from "@angular/common/http";
import { NgModule } from "@angular/core";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";

import { AppComponent } from "./app.component";
import { FileDropDirective } from "./file-drop.directive";
import { UploadComponent } from "./upload/upload.component";

@NgModule({
  declarations: [AppComponent, FileDropDirective, UploadComponent],
  imports: [BrowserAnimationsModule, FormsModule, HttpClientModule],
  bootstrap: [AppComponent]
})
export class AppModule {}
