"use strict";

var __decorate = this && this.__decorate || function(e, o, t, n) {
    var r, c = arguments.length, i = c < 3 ? o : null === n ? n = Object.getOwnPropertyDescriptor(o, t) : n;
    if ("object" == typeof Reflect && "function" == typeof Reflect.decorate) i = Reflect.decorate(e, o, t, n); else for (var l = e.length - 1; l >= 0; l--) (r = e[l]) && (i = (c < 3 ? r(i) : c > 3 ? r(o, t, i) : r(o, t)) || i);
    return c > 3 && i && Object.defineProperty(o, t, i), i;
};

Object.defineProperty(exports, "__esModule", {
    value: !0
});

var core_1 = require("@angular/core"), LoginComponent = function() {
    function e() {}
    return e.prototype.ngOnInit = function() {
        $("body").addClass("login");
    }, e;
}();

LoginComponent = __decorate([ core_1.Component({
    selector: "app-login",
    templateUrl: "./login.component.html",
    styleUrls: [ "../../assets/pages/css/login-2.min.css" ]
}) ], LoginComponent), exports.LoginComponent = LoginComponent;