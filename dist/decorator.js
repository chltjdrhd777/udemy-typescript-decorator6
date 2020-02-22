"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
const registerValid = {};
function Required(target, propertyName) {
    registerValid[target.constructor.name] = {
        [propertyName]: ["required"]
    };
}
function PositiveNumber(target, propertyName) {
    registerValid[target.constructor.name] = {
        [propertyName]: ["positive"]
    };
}
function validate(obj) {
    const objValidatorConfig = registerValid[obj.constructor.name];
    if (!objValidatorConfig) {
        return true;
    }
    for (const keys in objValidatorConfig) {
        for (const conditions of objValidatorConfig[keys]) {
            switch (conditions) {
                case "required":
                    return !!obj[keys];
                case "positive":
                    return obj[keys] > 0;
            }
        }
    }
    return true;
}
class Courses {
    constructor(t, p) {
        this.title = t;
        this.price = p;
    }
}
__decorate([
    Required
], Courses.prototype, "title", void 0);
__decorate([
    PositiveNumber
], Courses.prototype, "price", void 0);
const courseForm = document.querySelector("form");
courseForm.addEventListener("submit", event => {
    event.preventDefault();
    const titleEl = document.getElementById("t");
    const priceEl = document.getElementById("p");
    const title = String(titleEl.value);
    const price = Number(priceEl.value);
    const createdCourse = new Courses(title, price);
    if (!validate(createdCourse)) {
        alert("please put the valid value again");
    }
    else {
        console.log(createdCourse);
    }
});
//# sourceMappingURL=decorator.js.map