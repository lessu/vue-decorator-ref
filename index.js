"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var vue_class_component_1 = require("vue-class-component");
var decamelize_1 = __importDefault(require("decamelize"));
// export interface RefExtendsOptions{
//     /**
//      * refName => member
//      */
//     $$__refs : {[key:string] : string}
// }
/**
 * decorator of an inject
 * @param key key
 * @return PropertyDecorator
 */
function Ref(refName) {
    return vue_class_component_1.createDecorator(function (componentOptions, k) {
        if (typeof componentOptions.$$__refs === 'undefined') {
            componentOptions.$$__refs = {};
        }
        if (!refName) {
            refName = k;
        }
        componentOptions.$$__refs[refName] = k;
    });
}
exports.Ref = Ref;
function inject(vue) {
    var refs = vue.$options.$$__refs;
    if (refs) {
        var keys = Object.keys(refs);
        for (var _i = 0, keys_1 = keys; _i < keys_1.length; _i++) {
            var key = keys_1[_i];
            var componenet = vue.$refs[key];
            if (componenet == null) {
                componenet = vue.$refs[decamelize_1.default(key, '-')];
            }
            if (componenet) {
                vue[refs[key]] = componenet;
            }
            else {
                // console.warn("@Ref not found ref componet '"+key+"'");
            }
        }
    }
}
exports.Plugin = {
    install: function (Vue, options) {
        Vue.mixin({
            mounted: function () {
                inject(this);
            },
            updated: function () {
                inject(this);
            }
        });
    }
};
