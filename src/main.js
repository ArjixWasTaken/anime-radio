"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
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
Object.defineProperty(exports, "__esModule", { value: true });
require("./style.css");
var visualizer = document.querySelector('#visualizer');
var visualizerCtx = visualizer.getContext('2d');
var intensity = 0;
// Draw visualizer bars
var drawVisualizer = function (analyser) {
    if (!visualizerCtx)
        return;
    var bufferLength = analyser.frequencyBinCount;
    var dataArray = new Uint8Array(bufferLength);
    analyser.getByteFrequencyData(dataArray);
    visualizerCtx.clearRect(0, 0, visualizer.width, visualizer.height);
    var barWidth = Math.round((visualizer.width / bufferLength) * 2);
    var barHeight;
    var x = 0;
    for (var i = 0; i < dataArray.length; i++) {
        barHeight = Math.max(Math.round(dataArray[i] * intensity), 2);
        visualizerCtx.fillStyle = 'white';
        visualizerCtx.shadowColor = 'black';
        visualizerCtx.shadowBlur = 3;
        visualizerCtx.shadowOffsetX = 4;
        visualizerCtx.shadowOffsetY = 4;
        visualizerCtx.fillRect(x, Math.round(visualizer.height - barHeight), barWidth, barHeight);
        x += barWidth + 6;
    }
    requestAnimationFrame(function () { return drawVisualizer(analyser); });
};
var intro = document.querySelector('#intro');
var introCtx = intro.getContext('2d');
var completion = 0;
var opacity = 1;
var decreasing = true;
var introFinished = false;
var drawIntro = function () { return __awaiter(void 0, void 0, void 0, function () {
    var i;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                if (!introCtx || introFinished)
                    return [2 /*return*/];
                if (!(completion >= 1)) return [3 /*break*/, 5];
                introCtx.clearRect(0, 0, visualizer.width, visualizer.height);
                drawVisualizer(analyser);
                i = 0;
                _a.label = 1;
            case 1:
                if (!(i < 50)) return [3 /*break*/, 4];
                return [4 /*yield*/, new Promise(function (resolve) { return setTimeout(resolve, 25); })];
            case 2:
                _a.sent();
                intensity = i / 50;
                _a.label = 3;
            case 3:
                i++;
                return [3 /*break*/, 1];
            case 4: return [2 /*return*/];
            case 5:
                introCtx.clearRect(0, 0, visualizer.width, visualizer.height);
                if (completion > 0.5) {
                    introCtx.fillStyle = "rgba(255, 255, 255, " + opacity + ")";
                    introCtx.fillRect(0, visualizer.height - 2, visualizer.width, 2);
                    if (decreasing) {
                        opacity -= 0.25;
                    }
                    else {
                        opacity += 0.25;
                    }
                    if (opacity <= 0) {
                        decreasing = false;
                    }
                    else if (opacity >= 1) {
                        decreasing = true;
                    }
                    completion += 0.02;
                    requestAnimationFrame(function () { return drawIntro(); });
                    return [2 /*return*/];
                }
                introCtx.fillStyle = 'white';
                // Draw left-aligned line
                introCtx.fillRect(0, visualizer.height - 2, visualizer.width * completion, 2);
                // Draw right-aligned line
                introCtx.fillRect(visualizer.width - visualizer.width * completion, visualizer.height - 2, visualizer.width * completion, 2);
                requestAnimationFrame(function () { return drawIntro(); });
                completion += 0.015;
                return [2 /*return*/];
        }
    });
}); };
var audio = document.querySelector('#track');
var audioCtx = new AudioContext();
var source = audioCtx.createMediaElementSource(audio);
var analyser = audioCtx.createAnalyser();
// Set the frequency range
analyser.fftSize = 256;
source.connect(analyser);
source.connect(audioCtx.destination);
var albumArt = document.querySelector('#album-art');
var trackArtist = document.querySelector('#track-artist');
var trackTitle = document.querySelector('#track-title');
audio.addEventListener('play', function () {
    drawIntro();
    albumArt.style.animation = '0.5s ease-in-out 0.25s revealSideways forwards';
    trackArtist.style.animation = '2s ease-in-out 0.5s fadeIn forwards';
    trackTitle.style.animation = '2s ease-in-out 0.75s fadeIn forwards';
});
audio.volume = 0.25;
var updateVisualizerSize = function () {
    visualizer.width = visualizer.clientWidth;
    visualizer.height = visualizer.clientHeight;
    intro.width = visualizer.width;
    intro.height = visualizer.height;
};
document.addEventListener('resize', function () {
    updateVisualizerSize();
});
updateVisualizerSize();
