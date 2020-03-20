/* tslint:disable */
import { Injectable } from '@angular/core';
import { Container } from '../../models/Container';
import { DeepLearning } from '../../models/DeepLearning';

export interface Models { [name: string]: any }

@Injectable()
export class SDKModels {

  private models: Models = {
    Container: Container,
    DeepLearning: DeepLearning,
    
  };

  public get(modelName: string): any {
    return this.models[modelName];
  }

  public getAll(): Models {
    return this.models;
  }

  public getModelNames(): string[] {
    return Object.keys(this.models);
  }
}
