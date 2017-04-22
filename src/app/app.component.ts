import { Component, OnInit } from '@angular/core';
import { DymoService } from './dymo.service';
import { ViewConfig } from './mv/types';
import { JsonGraph } from 'dymo-core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  providers: [ DymoService ]
})
export class AppComponent implements OnInit {

  private title = 'Performance Playground';
  private performanceDir = 'performances/example/'//'performances/chopin-op28-01/';
  private dymoGraph: JsonGraph;
  private viewConfig: ViewConfig;
  private playingDymos: string[];
  private visualsCount = [1];

  constructor(private dymoService: DymoService) { }

  ngOnInit(): void {
    this.dymoService.getDymoGraph().subscribe(updatedGraph => this.dymoGraph = updatedGraph);
    this.dymoService.getViewConfig().subscribe(updatedConfig => this.viewConfig = updatedConfig);
    this.dymoService.getPlayingDymos().subscribe(updatedDymos => this.playingDymos = updatedDymos);
    this.dymoService.isReady()
      .then(() => this.dymoService.loadDymo(this.performanceDir));
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
