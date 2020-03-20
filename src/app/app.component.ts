import { Component, ViewChild} from '@angular/core';

import { FileUploadInputFor, MatFileUpload, MatFileUploadQueue } from 'angular-material-fileupload';

import { DeepLearning } from './shared/sdk/models';
import { DeepLearningApi } from './shared/sdk/services';
import { LoopBackConfig } from './shared/sdk';
import { environment} from '../environments/environment';

const URL = environment.BASEURL + '/api/containers/temp/upload';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent{
  title = 'Deep Health UI';

  fileUploadInputFor: FileUploadInputFor;
  matMatFileUploadQueue: MatFileUploadQueue;
  subscriptiOnFileSelected: any;
  subscriptionOnFileSelected: any;
  showSpinner: boolean = false;

  image: File;
  imgURL: any;
  message: string;

  barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      xAxes: [{
          display: true,
          scaleLabel: {
              display: true,
              labelString: 'Pneumonia Level'
          }
      }],
      yAxes: [{
          display: true,
          ticks: {
              beginAtZero: true
          },
          scaleLabel: {
              display: true,
              labelString: 'Probability [%]'
          }
      }]
    }
  };

  barChartLabels = ['No Pneumonia', 'Bacterial Pneumonia', 'Viric Pneumonia'];
  barChartType = 'bar';
  barChartLegend = false;

  barChartData = [
    { data: [0, 0, 0] }
  ];
  httpUrl: string;

  @ViewChild(FileUploadInputFor)
  set appFileUploadInputFor(fileUploadInputFor: FileUploadInputFor) {
    this.fileUploadInputFor = fileUploadInputFor;

    this.subscriptiOnFileSelected = this.fileUploadInputFor.onFileSelected.subscribe(files => {
      this.preview(files);
    });
  };

  onUpload(result) {
      // show spinner
      this.showSpinner = true;

      if (result && result.event && result.event.status === 200 && result.event.type === 4) {
      // predict Retinopathy level
      this.deepLearningApi.predict(this.image.name).subscribe((result: any) => {
        // hide spinner
        this.showSpinner = false;

        // load predictor graph
        this.barChartData = [
          { data: [
            Math.round(result.prediction["normal"] * 100 * 100) / 100,
            Math.round(result.prediction["pneumonia bacteria"] * 100 * 100) / 100,
            Math.round(result.prediction["pneumonia virus"] * 100 * 100) / 100]
          }];

       // remove uoload bar
        this.matMatFileUploadQueue.removeAll();
      });
    }
  }

  @ViewChild(MatFileUploadQueue)
  set appMatFileUploadQueue(component: MatFileUploadQueue) {
    this.matMatFileUploadQueue = component;
  }

  preview(files) {
    if (files.length === 0) {
      return;
    }

    // tslint:disable-next-line:prefer-const
    let mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';

      return;
    }

    this.image = files[0];

    let reader = new FileReader();
    reader.readAsDataURL(files[0]);

    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
  }

  constructor(private deepLearningApi: DeepLearningApi) {
    LoopBackConfig.setBaseURL(environment.BASEURL);
    console.log(LoopBackConfig.getPath());

    this.httpUrl = URL;
  }
}
