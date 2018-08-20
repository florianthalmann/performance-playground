import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import * as _ from 'lodash';
import { JsonGraph, uris } from 'dymo-core';
import { DymoPlayer } from 'dymo-player';
import { ViewConfig, ViewConfigDim } from 'music-visualization';

@Injectable()
export class DymoService {

  private player: DymoPlayer;

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
    this.player = new DymoPlayer(false, true, 1, 3, 0.05);
    return this.player.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/');
  }

  getViewConfig(): Observable<ViewConfig> {
    return this.player.getDymoManager().getAttributeInfo().map(fs => this.adjustViewConfig(fs));
  }

  getDymoGraph(): Observable<JsonGraph> {
    return this.player.getDymoManager().getJsonGraph(uris.DYMO, uris.HAS_PART, true);
  }

  loadDymo(dirPath: string): Promise<any> {
    return this.player.loadDymo(dirPath+'save.json');
  }

  getUIControls() {
    return this.player.getDymoManager().getUIControls();
  }

  getPlayingDymos(): Observable<string[]> {
    return this.player.getPlayingDymoUris()//.debounceTime(50);
  }

  startPlaying(): void {
    this.player.play();
  }

  startPlayingDymo(dymo: Object): void {
    this.player.playUri(dymo["@id"]);
  }

  stopPlaying(): void {
    this.player.stop();
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