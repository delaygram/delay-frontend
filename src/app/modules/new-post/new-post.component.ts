import { environment } from 'src/environments/environment';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbModalConfig, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { first } from 'rxjs/operators';
import { PostService } from 'src/app/core/services';

@Component({
  selector: 'app-new-post',
  templateUrl: './new-post.component.html',
  styleUrls: ['./new-post.component.css'],
  providers: [NgbModalConfig, NgbModal]
})
export class NewPostComponent {

  newPostForm: FormGroup;
  loading = false;
  submitted = false;
  error = '';
  fileToUpload: File | undefined;
  generatedFilename: string | undefined;

  constructor(private _postService: PostService, private formBuilder: FormBuilder, config: NgbModalConfig, private modalService: NgbModal) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.newPostForm = this.formBuilder.group({
      file: ['', [Validators.required]],
      caption: ['', [Validators.required]],
    });
  }

  get f() { return this.newPostForm.controls; }

  open(content: any) {
    this.modalService.open(content, { centered: true });
  }

  handleFileInput(event: any) {
    this.fileToUpload = event.target.files.item(0);
    console.log(this.fileToUpload);
  }

  onSubmit() {

    this.submitted = true;

    if(this.newPostForm.invalid) {
      return;
    }

    this.loading = true;

    console.log(this.fileToUpload?.name + ' ' + this.fileToUpload?.size + ' ' + this.fileToUpload?.type);


    this._postService.newPost(this.fileToUpload, this.f.caption.value).pipe(first()).subscribe(
      response => {
        console.log(response);
        this.generatedFilename = response.generated_filename;
        console.log(`${environment.imageEndpoint}/${response.upload_url.split('/')[4]}`)
        this._postService.uploadPost(this.fileToUpload, response.upload_url).pipe(first()).subscribe(
          response => {
            console.log(response);
            this._postService.validatePost(this.generatedFilename).pipe(first()).subscribe(
              response => {
                console.log(`https://staging.delaygram.nl/images/${this.generatedFilename}`);
                this.loading = false;
              },
              error => {
                this.loading = false;
                console.log(error);
              }
            );
          },
          error => {
            this.loading = false;
            console.log(error);
          }
        );
      },
      error => {
        this.loading = false;
        console.log(error);
      }
    );
  }

}
