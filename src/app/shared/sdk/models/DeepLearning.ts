/* tslint:disable */

declare var Object: any;
export interface DeepLearningInterface {
  "id"?: number;
}

export class DeepLearning implements DeepLearningInterface {
  "id": number;
  constructor(data?: DeepLearningInterface) {
    Object.assign(this, data);
  }
  /**
   * The name of the model represented by this $resource,
   * i.e. `DeepLearning`.
   */
  public static getModelName() {
    return "DeepLearning";
  }
  /**
  * @method factory
  * @author Jonathan Casarrubias
  * @license MIT
  * This method creates an instance of DeepLearning for dynamic purposes.
  **/
  public static factory(data: DeepLearningInterface): DeepLearning{
    return new DeepLearning(data);
  }
  /**
  * @method getModelDefinition
  * @author Julien Ledun
  * @license MIT
  * This method returns an object that represents some of the model
  * definitions.
  **/
  public static getModelDefinition() {
    return {
      name: 'DeepLearning',
      plural: 'DeepLearnings',
      path: 'DeepLearnings',
      idName: 'id',
      properties: {
        "id": {
          name: 'id',
          type: 'number'
        },
      },
      relations: {
      }
    }
  }
}
