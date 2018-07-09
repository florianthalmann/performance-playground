import { Component, OnInit } from '@angular/core';
import * as _ from 'lodash';
import { DymoService } from './dymo.service';
import { ViewConfig } from 'music-visualization';
import { JsonGraph } from 'dymo-core';

var PERFS = {
  "schub": "Schubert - Op142No3/Kim06XP_zerooffset2/",
  "bach": "data_out_pruned/Lou01XP_zerooffset/",
  "bach2": "data_out_pruned/Mizumoto03XP_zerooffset/",
  "bach3": "data_out_pruned/Lee01XP_zerooffset/",
  "bachlong": "data_out_pruned/LouLong/",
  "double": "data_out_pruned/",
  "chopin": "Chopin - Op23/Kim04XP_zerooffset/",
  "chopin2": "Chopin - Op10No4/Kurz03XP_zerooffset/",
  "beet": "Beethoven - Op53-1/Shychko02XP_zerooffset/"
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ DymoService ]
})
export class AppComponent implements OnInit {

  private title = 'Performance Playground';
  private performanceDir = 'performances/'+PERFS["bach"];
  private dymoGraph: JsonGraph;
  private viewConfig: ViewConfig;
  private playingDymos: string[];
  private uiControls;
  private visualsCount = [1];

  constructor(private dymoService: DymoService) { }

  async ngOnInit() {
    await this.dymoService.init();
    this.dymoService.getDymoGraph().subscribe(updatedGraph => {console.log(updatedGraph);this.dymoGraph = updatedGraph});
    this.dymoService.getViewConfig().subscribe(updatedConfig => {console.log(updatedConfig);this.viewConfig = updatedConfig});
    this.dymoService.getPlayingDymos().subscribe(updatedDymos => {console.log(updatedDymos);this.playingDymos = updatedDymos});
    await this.dymoService.loadDymo(this.performanceDir);
    this.uiControls = _.values(this.dymoService.getUIControls());
  }

  /*addDymo(filename: string): Promise<string> {
    let audioPath = this.featureService.getAudiofilePath(filename);
    let featurePaths = this.featureService.getFeatureFilenames(filename);
    return Promise.all([audioPath, featurePaths, this.dymoService.isReady()])
      .then(paths => this.dymoService.addDymo(paths[0], paths[1]))
  }*/

  play(): void {
    this.dymoService.startPlaying();
  }

  stop(): void {
    this.dymoService.stopPlaying();
  }

}
