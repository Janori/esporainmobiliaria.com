"use strict";

var __decorate = this && this.__decorate || function(e, t, o, r) {
    var n, p = arguments.length, c = p < 3 ? t : null === r ? r = Object.getOwnPropertyDescriptor(t, o) : r;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) c = Reflect.decorate(e, t, o, r); else for (var l = e.length - 1; l >= 0; l--) (n = e[l]) && (c = (p < 3 ? n(c) : p > 3 ? n(t, o, c) : n(t, o)) || c);
    return p > 3 && c && Object.defineProperty(t, o, c), c;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var core_1 = require("@angular/core"), AppComponent = function() {
    function e() {
        this.title = "app works!";
    }
    return e;
}();

AppComponent = __decorate([ core_1.Component({
    selector: "app-root",
    template: "<router-outlet></router-outlet>"
}) ], AppComponent), exports.AppComponent = AppComponent;