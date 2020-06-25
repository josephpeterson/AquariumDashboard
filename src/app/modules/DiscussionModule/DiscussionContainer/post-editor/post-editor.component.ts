import { Component, OnInit, ViewChild, Input } from '@angular/core';
import * as BalloonEditor from '@ckeditor/ckeditor5-build-balloon';
import { Post } from 'src/app/models/Post';

@Component({
  selector: 'post-editor',
  templateUrl: './post-editor.component.html',
  styleUrls: ['./post-editor.component.scss']
})
export class PostEditorComponent {

  @Input("post") public post: Post;

  Editor = BalloonEditor;
  editorConfig = {
    placeholder: 'Type the content here!',
  };


  constructor() {

  }

  ngOnInit() { }

  onSubmit() { }

}
