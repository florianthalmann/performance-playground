import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'lodash';
import { JsonGraph, uris } from 'dymo-core';
import { DymoPlayerManager } from 'dymo-player';
import { ViewConfig, ViewConfigDim } from 'music-visualization';

@Injectable()
export class DymoService {

  private manager: DymoPlayerManager;

  private viewConfigTemplate: ViewConfig = {
    xAxis: this.createConfig("x-axis"),
    yAxis: this.createConfig("y-axis"),
    size: this.createConfig("size"),
    width: this.createConfig("width"),
    height: this.createConfig("height"),
    color: this.createConfig("color")
  };
  private createConfig(name): ViewConfigDim {
    return {name:name, param:{name:"random", uri:null, min:0, max:1}, log:false};
  }

  constructor() {}

  init(): Promise<any> {
    this.manager = new DymoPlayerManager(false, 0.2, 1.2, 0.1);
    return this.manager.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/');
  }

  getViewConfig(): Observable<ViewConfig> {
    return this.manager.getDymoManager().getAttributeInfo().map(fs => this.adjustViewConfig(fs));
  }

  getDymoGraph(): Observable<JsonGraph> {
    return this.manager.getDymoManager().getJsonGraph(uris.DYMO, uris.HAS_PART, true);
  }

  loadDymo(dirPath: string): Promise<any> {
    return this.manager.getDymoManager().loadIntoStore(dirPath+'save.json');
  }

  getUIControls() {
    return this.manager.getDymoManager().getUIControls();
  }

  getPlayingDymos(): Observable<string[]> {
    return this.manager.getPlayingDymoUris()//.debounceTime(50);
  }

  startPlaying(): void {
    this.manager.startPlaying();
  }

  startPlayingDymo(dymo: Object): void {
    this.manager.startPlayingUri(dymo["@id"]);
  }

  stopPlaying(): void {
    this.manager.stopPlaying();
  }

  private adjustViewConfig(features): ViewConfig {
    console.log(JSON.stringify(features))
    let newConfig = _.clone(this.viewConfigTemplate);
    this.setParam(newConfig.xAxis, "scoreOnset", features);
    this.setParam(newConfig.yAxis, "scorePitch", features);
    //this.setParam(newConfig.yAxis, "level", features);
    this.setParam(newConfig.width, "scoreDuration", features);
    //this.setParam(newConfig.height, "duration", features);
    //this.setParam(newConfig.size, "duration", features);
    this.setParam(newConfig.color, "velocity", features);
    /*this.setParam(newConfig.yAxis, "scoreOnset", features);
    this.setParam(newConfig.width, "duration", features);
    this.setParam(newConfig.height, "scoreDuration", features);*/
    return newConfig;
  }

  private setParam(viewParam, featureName, features) {
    features = features.filter(f => f.name === featureName);
    if (features.length > 0) {
      viewParam.param = features[0];
    }
  }

}