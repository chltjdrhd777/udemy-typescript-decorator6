"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const bracket = {};
function deco(target, protoname) {
    bracket[target.constructor.name] = { [protoname]: ["hello"] };
}
function deco2(target, protoname) {
    bracket[target.constructor.name] = { [protoname]: ["hello2"] };
}
class testing {
    constructor(t, q) {
        this.name = t;
        this.age = q;
    }
}
__decorate([
    deco
], testing.prototype, "name", void 0);
__decorate([
    deco2
], testing.prototype, "age", void 0);
const tested = new testing("Anderson", 25);
console.log(bracket);
//# sourceMappingURL=test.js.map