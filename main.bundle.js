webpackJsonp([1,4],{

/***/ 1749:
/***/ (function(module, exports, __webpack_require__) {

var map = {
	"./N3Lexer": 436,
	"./N3Lexer.js": 436,
	"./N3Parser": 437,
	"./N3Parser.js": 437,
	"./N3Store": 706,
	"./N3Store.js": 706,
	"./N3StreamParser": 707,
	"./N3StreamParser.js": 707,
	"./N3StreamWriter": 708,
	"./N3StreamWriter.js": 708,
	"./N3Util": 438,
	"./N3Util.js": 438,
	"./N3Writer": 439,
	"./N3Writer.js": 439
};
function webpackContext(req) {
	return __webpack_require__(webpackContextResolve(req));
};
function webpackContextResolve(req) {
	var id = map[req];
	if(!(id + 1)) // check for number
		throw new Error("Cannot find module '" + req + "'.");
	return id;
};
webpackContext.keys = function webpackContextKeys() {
	return Object.keys(map);
};
webpackContext.resolve = webpackContextResolve;
module.exports = webpackContext;
webpackContext.id = 1749;


/***/ }),

/***/ 1752:
/***/ (function(module, exports) {

module.exports = "<h1>\n  Performance Deformations\n</h1>\n<button (click)=\"play()\">←</button>\nBach, Well-Tempered Clavier, Prelude and Fugue in C-sharp major, BWV 848, Lou\n<button (click)=\"play()\">Play</button>\n<button (click)=\"stop()\">Stop</button>\n<div *ngFor=\"let u of uiControls\">\n  <label class=\"left\" for=\"hey\">{{u.name}} {{u.uiValue.toFixed(2)}}</label>\n  <span class=\"left2\"><input name=\"hey\" type=\"range\" class=\"fullwidth\" min=\"0\" max=\"{{u.max}}\" step=\".01\" [(ngModel)]=\"u.uiValue\" (input)=\"u.update()\"></span>\n</div>\n<ul>\n<li *ngFor=\"let i of visualsCount\">\n  <visualization *ngIf=\"dymoGraph\" [data]=\"dymoGraph\" [viewConfig]=\"viewConfig\" [playingUris]=\"playingDymos\"></visualization>\n</li>\n</ul>"

/***/ }),

/***/ 2076:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2077:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2078:
/***/ (function(module, exports) {

/* (ignored) */

/***/ }),

/***/ 2079:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(829);


/***/ }),

/***/ 541:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__ = __webpack_require__(716);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__ = __webpack_require__(715);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_debounceTime__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_dymo_core__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_dymo_core__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dymo_player__ = __webpack_require__(1313);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_dymo_player___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_dymo_player__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return DymoService; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var DymoService = /** @class */ (function () {
    function DymoService() {
        this.viewConfigTemplate = {
            xAxis: this.createConfig("x-axis"),
            yAxis: this.createConfig("y-axis"),
            size: this.createConfig("size"),
            width: this.createConfig("width"),
            height: this.createConfig("height"),
            color: this.createConfig("color")
        };
    }
    DymoService.prototype.createConfig = function (name) {
        return { name: name, param: { name: "random", uri: null, min: 0, max: 1 }, log: false };
    };
    DymoService.prototype.init = function () {
        this.player = new __WEBPACK_IMPORTED_MODULE_5_dymo_player__["DymoPlayer"](false, true, 1, 3, 0.05);
        return this.player.init('https://raw.githubusercontent.com/dynamic-music/dymo-core/master/ontologies/');
    };
    DymoService.prototype.getViewConfig = function () {
        var _this = this;
        return this.player.getDymoManager().getAttributeInfo().map(function (fs) { return _this.adjustViewConfig(fs); });
    };
    DymoService.prototype.getDymoGraph = function () {
        return this.player.getDymoManager().getJsonGraph(__WEBPACK_IMPORTED_MODULE_4_dymo_core__["uris"].DYMO, __WEBPACK_IMPORTED_MODULE_4_dymo_core__["uris"].HAS_PART, true);
    };
    DymoService.prototype.loadDymo = function (dirPath) {
        return this.player.loadDymo(dirPath + 'save.json');
    };
    DymoService.prototype.getUIControls = function () {
        return this.player.getDymoManager().getUIControls();
    };
    DymoService.prototype.getPlayingDymos = function () {
        return this.player.getPlayingDymoUris(); //.debounceTime(50);
    };
    DymoService.prototype.startPlaying = function () {
        this.player.play();
    };
    DymoService.prototype.startPlayingDymo = function (dymo) {
        this.player.playUri(dymo["@id"]);
    };
    DymoService.prototype.stopPlaying = function () {
        this.player.stop();
    };
    DymoService.prototype.adjustViewConfig = function (features) {
        console.log(JSON.stringify(features));
        var newConfig = __WEBPACK_IMPORTED_MODULE_3_lodash__["clone"](this.viewConfigTemplate);
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
    };
    DymoService.prototype.setParam = function (viewParam, featureName, features) {
        features = features.filter(function (f) { return f.name === featureName; });
        if (features.length > 0) {
            viewParam.param = features[0];
        }
    };
    DymoService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["d" /* Injectable */])(),
        __metadata("design:paramtypes", [])
    ], DymoService);
    return DymoService;
}());

//# sourceMappingURL=dymo.service.js.map

/***/ }),

/***/ 828:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 828;


/***/ }),

/***/ 829:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(917);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__app_app_module__ = __webpack_require__(938);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(940);




if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_2__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=main.js.map

/***/ }),

/***/ 937:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_lodash___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_lodash__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__dymo_service__ = __webpack_require__(541);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};



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
};
var AppComponent = /** @class */ (function () {
    function AppComponent(dymoService) {
        this.dymoService = dymoService;
        this.performanceDir = 'performances/' + PERFS["bach"];
        this.visualsCount = [1];
    }
    AppComponent.prototype.ngOnInit = function () {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.dymoService.init()];
                    case 1:
                        _a.sent();
                        this.dymoService.getDymoGraph().subscribe(function (updatedGraph) { console.log(updatedGraph); _this.dymoGraph = updatedGraph; });
                        this.dymoService.getViewConfig().subscribe(function (updatedConfig) { return _this.viewConfig = updatedConfig; });
                        this.dymoService.getPlayingDymos().subscribe(function (updatedDymos) { return _this.playingDymos = updatedDymos; });
                        return [4 /*yield*/, this.dymoService.loadDymo(this.performanceDir)];
                    case 2:
                        _a.sent();
                        //console.log("LOADING DONE!")
                        this.uiControls = __WEBPACK_IMPORTED_MODULE_1_lodash__["values"](this.dymoService.getUIControls());
                        //set max values for sliders...
                        this.uiControls.forEach(function (c, i) { return c.max = i == _this.uiControls.length - 1 ? 2 : 3; });
                        return [2 /*return*/];
                }
            });
        });
    };
    /*addDymo(filename: string): Promise<string> {
      let audioPath = this.featureService.getAudiofilePath(filename);
      let featurePaths = this.featureService.getFeatureFilenames(filename);
      return Promise.all([audioPath, featurePaths, this.dymoService.isReady()])
        .then(paths => this.dymoService.addDymo(paths[0], paths[1]))
    }*/
    AppComponent.prototype.play = function () {
        this.dymoService.startPlaying();
    };
    AppComponent.prototype.stop = function () {
        this.dymoService.stopPlaying();
    };
    var _a;
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(1752),
            providers: [__WEBPACK_IMPORTED_MODULE_2__dymo_service__["a" /* DymoService */]]
        }),
        __metadata("design:paramtypes", [typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__dymo_service__["a" /* DymoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2__dymo_service__["a" /* DymoService */]) === "function" && _a || Object])
    ], AppComponent);
    return AppComponent;
}());

//# sourceMappingURL=app.component.js.map

/***/ }),

/***/ 938:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(346);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(907);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(913);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(937);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__visualization_component__ = __webpack_require__(939);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};






var AppModule = /** @class */ (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                __WEBPACK_IMPORTED_MODULE_5__visualization_component__["a" /* VisualizationComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */]
            ],
            providers: [],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        })
    ], AppModule);
    return AppModule;
}());

//# sourceMappingURL=app.module.js.map

/***/ }),

/***/ 939:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__dymo_service__ = __webpack_require__(541);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_music_visualization__ = __webpack_require__(1747);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_music_visualization___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_music_visualization__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_dymo_core__ = __webpack_require__(97);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_dymo_core___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_dymo_core__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisualizationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var VisualizationComponent = /** @class */ (function () {
    function VisualizationComponent(dymoService) {
        this.dymoService = dymoService;
    }
    VisualizationComponent.prototype.ngOnInit = function () {
        this.init();
    };
    VisualizationComponent.prototype.init = function () {
        if (!this.visualization) {
            this.visualization = new __WEBPACK_IMPORTED_MODULE_2_music_visualization__["PianoRoll"](this.visualsContainer.nativeElement, this.onClick.bind(this));
        }
    };
    VisualizationComponent.prototype.ngOnChanges = function (changes) {
        this.init();
        if (changes['data']) {
            this.visualization.updateData(this.data);
        }
        if (changes['viewConfig']) {
            this.visualization.updateViewConfig(changes['viewConfig'].currentValue);
        }
        if (changes['playingUris']) {
            this.visualization.updatePlaying(changes['playingUris'].previousValue, changes['playingUris'].currentValue);
        }
    };
    VisualizationComponent.prototype.onClick = function (dymo) {
        this.dymoService.startPlayingDymo(dymo);
    };
    VisualizationComponent.prototype.onResize = function (event) {
        this.visualization.updateSize();
    };
    var _a, _b, _c, _d, _e;
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["U" /* ViewChild */])('visuals'),
        __metadata("design:type", typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_0__angular_core__["C" /* ElementRef */]) === "function" && _a || Object)
    ], VisualizationComponent.prototype, "visualsContainer", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_3_dymo_core__["JsonGraph"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_3_dymo_core__["JsonGraph"]) === "function" && _b || Object)
    ], VisualizationComponent.prototype, "data", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2_music_visualization__["ViewConfig"] !== "undefined" && __WEBPACK_IMPORTED_MODULE_2_music_visualization__["ViewConfig"]) === "function" && _c || Object)
    ], VisualizationComponent.prototype, "viewConfig", void 0);
    __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["w" /* Input */])(),
        __metadata("design:type", typeof (_d = typeof Array !== "undefined" && Array) === "function" && _d || Object)
    ], VisualizationComponent.prototype, "playingUris", void 0);
    VisualizationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["V" /* Component */])({
            selector: 'visualization',
            template: '<div class="d3-visuals" #visuals (window:resize)="onResize($event)"></div>',
            providers: []
        }),
        __metadata("design:paramtypes", [typeof (_e = typeof __WEBPACK_IMPORTED_MODULE_1__dymo_service__["a" /* DymoService */] !== "undefined" && __WEBPACK_IMPORTED_MODULE_1__dymo_service__["a" /* DymoService */]) === "function" && _e || Object])
    ], VisualizationComponent);
    return VisualizationComponent;
}());

//# sourceMappingURL=visualization.component.js.map

/***/ }),

/***/ 940:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=environment.js.map

/***/ })

},[2079]);
//# sourceMappingURL=main.bundle.js.map