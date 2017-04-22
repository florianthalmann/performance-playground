import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'lodash';
import { JsonGraph, DymoManager, uris } from 'dymo-core';
import { ViewConfig, ViewConfigDim } from './mv/types';

@Injectable()
export class DymoService {

  private manager = new DymoManager(new AudioContext(), null, null, null);
  private isManagerReady = this.manager.init();

  private viewConfigTemplate: ViewConfig = {
    xAxis: this.createConfig("x-axis"),
    yAxis: this.createConfig("y-axis"),
    size: this.createConfig("size"),
    color: this.createConfig("color")
  };
  private createConfig(name): ViewConfigDim {
    return {name:name, param:{name:"random", uri:null, min:0, max:1}, log:false};
  }

  constructor() {}

  isReady(): Promise<any> {
    return this.isManagerReady;
  }

  getViewConfig(): Observable<ViewConfig> {
    return this.manager.getFeatures().map(fs => this.adjustViewConfig(fs));
  }

  getDymoGraph(): Observable<JsonGraph> {
    return this.manager.getJsonGraph(uris.DYMO, uris.HAS_PART, true);
  }

  loadDymo(dirPath: string): Promise<any> {
    return this.manager.loadDymoAndRendering(dirPath+'dymo.json', dirPath+'rendering.json');
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
    let newConfig = _.clone(this.viewConfigTemplate);
    this.setParam(newConfig.xAxis, "index", features);
    this.setParam(newConfig.yAxis, "level", features);
    this.setParam(newConfig.size, "chromagram", features);
    return newConfig;
  }

  private setParam(viewParam, featureName, features) {
    features = features.filter(f => f.name === featureName);
    if (features.length > 0) {
      viewParam.param = features[0];
    }
  }

}