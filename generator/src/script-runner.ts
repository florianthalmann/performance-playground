import 'isomorphic-fetch';
import * as fs from 'fs';
import * as express from 'express';
import { PerformanceDymos } from './performance-dymos';

let PORT = '4111';
let SERVER_PATH = 'http://localhost:' + PORT + '/';

var app = express();
app.use(express["static"](__dirname));
var server = app.listen(PORT);
console.log('server started at '+SERVER_PATH);

var PERFS = {
  "schub": "Schubert - Op142No3/Kim06XP_zerooffset2/",
  "bach": "data_out_pruned/Lou01XP_zerooffset/",
  "bach2": "data_out_pruned/Mizumoto03XP_zerooffset/",
  "bach3": "data_out_pruned/Lee01XP_zerooffset/",
  "bach4": "data_out_pruned/Zhou01XP_zerooffset/",
  "bachlong": "data_out_pruned/LouLong/",
  "double": "data_out_pruned/",
  "chopin": "Chopin - Op23/Kim04XP_zerooffset/",
  "chopin2": "Chopin - Op10No4/Kurz03XP_zerooffset/",
  "beet": "Beethoven - Op53-1/Shychko02XP_zerooffset/"
}

var PARENT_PATH = 'performances/data_out_pruned/'
var AUDIO_PATH = 'performances/'+PERFS["bach"];//'performances/Lou01XP_zerooffset/'//'audio/Chopin_Op028-11_003_20100611-SMD-cut/';
var AUDIO_PATH2 = 'performances/'+PERFS["bach2"];;
//var CONTEXT1 = 'http://tiny.cc/dymo-context';
//var CONTEXT2 = 'http://localhost:4200/node_modules/dymo-core/ontologies/dymo-context.json';

//createAndSaveDoublePerformanceDymo([AUDIO_PATH, AUDIO_PATH2], PARENT_PATH+'dymo.json', PARENT_PATH+'rendering.json')
createAndSavePerformanceDymo(AUDIO_PATH, AUDIO_PATH+'dymo.json', AUDIO_PATH+'rendering.json')
  .then(() => console.log('done'))
  .then(() => server.close())
  .catch(e => console.log(e));

function createAndSaveDoublePerformanceDymo(audioPaths: string[], dymoOutPath: string, renderingOutPath: string): Promise<any> {
  return Promise.all(audioPaths.map(p => getFilesInDir(p, ['wav'])))
    .then(files => files.map((fs,i) => fs.map(f => i == 0 ? 'Lou01XP_zerooffset/'+f : 'Mizumoto03XP_zerooffset/'+f)))
    .then(files => new PerformanceDymos().createDoublePerformanceDymo(files))
    //.then(jsonlds => jsonlds.map(j => j.replace(CONTEXT1, CONTEXT2)))
    .then(jsonlds => { writeFile(jsonlds[0], dymoOutPath); writeFile(jsonlds[1], renderingOutPath); })
    .catch(e => console.log(e));
}

function createAndSavePerformanceDymo(audioPath: string, dymoOutPath: string, renderingOutPath: string): Promise<any> {
  return getFilesInDir(audioPath, ['wav'])
    //.then(files => files.map(f => 'audio/'+f))
    .then(files => new PerformanceDymos().createFullPerformanceDymo(files))
    //.then(jsonlds => jsonlds.map(j => j.replace(CONTEXT1, CONTEXT2)))
    .then(jsonlds => { writeFile(jsonlds[0], dymoOutPath); writeFile(jsonlds[1], renderingOutPath); } )
    .catch(e => console.log(e));
}

function getFilesInDir(dirPath: string, fileTypes: string[]): Promise<string[]> {
  return new Promise(resolve => {
    fs.readdir(dirPath, (err, files) => {
      if (err) {
        console.log(err);
      } else if (files) {
        var files = files.filter(f =>
          //check if right extension
          fileTypes.indexOf(f.split('.').slice(-1)[0]) >= 0
        );
      }
      resolve(files);
    });
  });
}

function writeFile(content: string, path: string): Promise<any> {
  return new Promise((resolve, reject) => {
    fs.writeFile(path, content, function (err) {
      if (err) return reject(err);
      resolve('file saved at ' + path);
    });
  });
}