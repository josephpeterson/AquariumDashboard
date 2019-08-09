import { Input, Component, ViewChild, ElementRef } from '@angular/core';
import { MatFileUploadQueue, MatFileUpload } from 'angular-material-fileupload';


@Component({
  selector: 'attachment-uploader',
  templateUrl: './attachment-uploader.component.html',
  styleUrls: ['./attachment-uploader.component.scss']
})
export class AttachmentUploaderComponent {

  @ViewChild("fileInput") filePicker: ElementRef;
  @ViewChild("fileUploadQueue") fileUploadQueue: MatFileUploadQueue;

  public openFilePicker() {
    this.filePicker.nativeElement.click();
  }
  public getAttachment():MatFileUpload {
    return this.fileUploadQueue.fileUploads.first;
  }
}