import { Component, Input } from "@angular/core";
import { UploadService } from "app/upload.service";
import * as _ from "lodash";

@Component({
  selector: "upload",
  templateUrl: "./upload.component.html",
  styleUrls: ["./upload.component.scss"],
  providers: [UploadService]
})
export class UploadComponent {
  @Input() autoUpload: boolean = false;
  filesToUpload: File[] = [];
  constructor(private upSvc: UploadService) {}

  handleDrop(fileList: FileList) {
    let filesIndex = _.range(fileList.length);

    _.each(filesIndex, idx => {
      this.filesToUpload.push(fileList[idx]);
    });
    if (this.autoUpload) this.Upload();
  }

  Upload() {
    this.upSvc.BatchUpload(this.filesToUpload).subscribe(m => {
      if (m.result) this.filesToUpload = [];
      console.log(m);
    });
  }
}
