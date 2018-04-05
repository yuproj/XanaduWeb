
import { Component, OnInit } from '@angular/core';
import * as Tesseract from 'tesseract.js'
import { DataService } from 'app/data.service';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.css']
})
export class InputComponent implements OnInit {

  analysisStarted = false;
  stepOneComplete = false;
  stepTwoComplete = false;
  stepThreeComplete = false;

  display = 'none';

  done = false;

  imageChangedEvent: any = '';
  croppedImage: any = '';

  tesseractProgressName = '...';
  tesseractProgress = 'Upload an Image';

  modal = document.getElementById('myModal');
  btn = document.getElementById('myBtn');
  span = document.getElementsByClassName('close')[0];

  showStyle = false;

  constructor(private data: DataService) { }

  ngOnInit() {}

  doneMethod() {
    console.log("hit it");
    this.done = true;
  }

  fileChangeEvent(event: any): void {
    this.imageChangedEvent = event;
    console.log("something changed!");
    console.log("CROPPING");
    console.log("This.done: " + this.done);
    // if (this.done) {
    //   console.log("Starting function")
    //   Tesseract.recognize(event.target.files[0])
    //     .progress(function (p) {
    //       if (p.progress == null) {
    //         // continue
    //       } else {
    //         this.analysisStarted = true;
    //         this.tesseractProgressName = p.status;
    //         this.tesseractProgress = p.progress.toString();
    //         if (this.tesseractProgressName === 'initializing api') {
    //           this.stepOneComplete = true;
    //         }
    //         if (this.tesseractProgressName === 'recognizing text' && this.stepTwoComplete === false) {
    //           this.stepTwoComplete = true;
    //         }
    //         if (this.tesseractProgressName === 'recognizing text' &&
    //           this.stepTwoComplete === true &&
    //           this.tesseractProgress === '1') {
    //           this.stepThreeComplete = true;
    //         }
    //       }
    //     }.bind(this))
    //     .then(function(result) {
    //       console.log(result.text);
    //       this.newMessage(result.text);
    //     }.bind(this))
    //     .catch(err => {
    //       console.log('Something went wrong recognizing the text');
    //     })
    // }
  }
  imageCropped(image: string) {
    this.croppedImage = image;
    console.log(typeof(this.croppedImage));
    console.log("CROPPING");
    console.log("This.done: " + this.done);
      if (this.done) {
        console.log("Starting function")
        Tesseract.recognize(this.croppedImage)
          .progress(function (p) {
            if (p.progress == null) {
              console.log("WHAT DA HELL")
              // continue
            } else {
              this.analysisStarted = true;
              this.tesseractProgressName = p.status;
              this.tesseractProgress = p.progress.toString();
              if (this.tesseractProgressName === 'initializing api') {
                this.stepOneComplete = true;
              }
              if (this.tesseractProgressName === 'recognizing text' && this.stepTwoComplete === false) {
                this.stepTwoComplete = true;
              }
              if (this.tesseractProgressName === 'recognizing text' &&
                this.stepTwoComplete === true &&
                this.tesseractProgress === '1') {
                this.stepThreeComplete = true;
              }
            }
          }.bind(this))
          .then(function(result) {
            console.log(result.text);
            this.newMessage(result.text);
          }.bind(this))
          .catch(err => {
            console.log('Something went wrong recognizing the text');
          })
      }
  }
  // imageCropped(event: any, image: string) {
  //   this.croppedImage = image;
  //   this.imageChangedEvent = event;
  //   console.log("something changed!");
  //   console.log("CROPPING");
  //   console.log("This.done: " + this.done);
  //   if (this.done) {
  //     console.log("Starting function")
  //     Tesseract.recognize(event.target.files[0])
  //       .progress(function (p) {
  //         if (p.progress == null) {
  //           // continue
  //         } else {
  //           this.analysisStarted = true;
  //           this.tesseractProgressName = p.status;
  //           this.tesseractProgress = p.progress.toString();
  //           if (this.tesseractProgressName === 'initializing api') {
  //             this.stepOneComplete = true;
  //           }
  //           if (this.tesseractProgressName === 'recognizing text' && this.stepTwoComplete === false) {
  //             this.stepTwoComplete = true;
  //           }
  //           if (this.tesseractProgressName === 'recognizing text' &&
  //             this.stepTwoComplete === true &&
  //             this.tesseractProgress === '1') {
  //             this.stepThreeComplete = true;
  //           }
  //         }
  //       }.bind(this))
  //       .then(function(result) {
  //         console.log(result.text);
  //         this.newMessage(result.text);
  //       }.bind(this))
  //       .catch(err => {
  //         console.log('Something went wrong recognizing the text');
  //       })
  //   }
  // }
  imageLoaded() {
    // show cropper
  }
  loadImageFailed() {
    // show message
  }

  newMessage(input: string) {
    this.data.changeMessage(input);
  }

  getPhoto() {
    document.getElementById('my_file').click();
  }

  // // MODAL START
  //
  // modalButtonClick() {
  //   this.modal.style.display = 'block';
  //   console.log("Yo");
  // }
  //
  // spanButtonClick() {
  //   this.modal.style.display = 'none';
  // }
  //
  // getStyle() {
  //   if (this.showStyle) {
  //     return true;
  //   } else {
  //     return false;
  //   }
  // }
  //
  // // MODAL END

  openModal(){


    this.display='block';
    console.log("Hello Open");


  }

  onCloseHandled(){


    this.display='none';
    console.log("Hello Close");


  }



  getPath(event) {
    Tesseract.recognize(event.target.files[0])
      .progress(function (p) {
        if (p.progress == null) {
          // continue
        } else {
          this.analysisStarted = true;
          this.tesseractProgressName = p.status;
          this.tesseractProgress = p.progress.toString();
          if (this.tesseractProgressName === 'initializing api') {
            this.stepOneComplete = true;
          }
          if (this.tesseractProgressName === 'recognizing text' && this.stepTwoComplete === false) {
            this.stepTwoComplete = true;
          }
          if (this.tesseractProgressName === 'recognizing text' &&
            this.stepTwoComplete === true &&
            this.tesseractProgress === '1') {
            this.stepThreeComplete = true;
          }
        }
      }.bind(this))
      .then(function(result) {
        console.log(result.text);
        this.newMessage(result.text);
      }.bind(this))
      .catch(err => {
        console.log('Something went wrong recognizing the text');
      })
  }

}
