//Validation with decorator
//What if I have got data from user and I guess this data would be passed to a specific course but not sure it.
//Therefore, I want to validate this.

interface Validation {
  [property: string]: {
    // {property : {}}
    [validatable: string]: string[]; // {property : {validatable : ['string',....]}}
  };
}

const registerValid: Validation = {};

//now set the decorator
function Required(target: any, propertyName: string) {
  //property decorator have two arguements. First, prototype of class object. Second, property's name. In the prototype, there is "name" property which refer to the name of target class.
  registerValid[target.constructor.name] = {
    [propertyName]: ["required"]
  };
} // The structure is,
//registerValid {courses : {title:["required"]}}

function PositiveNumber(target: any, propertyName: string) {
  registerValid[target.constructor.name] = {
    [propertyName]: ["positive"]
  };
} //registerValid {courses : {price:["positive"]}}

function validate(obj: any) {
  const objValidatorConfig = registerValid[obj.constructor.name]; // which means if whatever object put in the parameter, const objValidatorConfig would indicate the target property's value
  if (!objValidatorConfig) {
    // if there is no value in registerValid[obj.constructor.name],
    return true;
  } // if there is a value,
  for (const keys in objValidatorConfig) {
    // about [propertyName] in {[propertyName] : ['something','something2'.....]}
    for (const conditions of objValidatorConfig[keys]) {
      // return the whole elements inside ['something','something2',....] separately. so the result is ('something' , 'something2', .....)
      switch (conditions) {
        case "required":
          return !!obj[keys]; // !! means that if the thing following is not undefined or "", it is always "true".
        case "positive":
          return obj[keys] > 0;
      }
    }
  }
  return true; //default condition
}

class Courses {
  @Required
  title: string;
  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }
}

const courseForm = document.querySelector("form")!; // I made <form> in HTML and called this.
courseForm.addEventListener("submit", event => {
  event.preventDefault(); //Prevent webpage from going to default page if it receives unwanted data.
  const titleEl = document.getElementById("t") as HTMLInputElement; //typecasting to make sure that it is not HTMLElement but more particular thing inside HTMLElement.
  const priceEl = document.getElementById("p") as HTMLInputElement;

  const title = String(titleEl.value); // value which the user would write in title input box
  const price = Number(priceEl.value); // value which the user would write in price input box

  const createdCourse = new Courses(title, price); // new object by using class "courses" and in the parameter of courses's constructor, title and price.

  // the result would be "createdCourse {title : "something", price: numbers}

  // Then, screening function "validate" would start
  if (!validate(createdCourse)) {
    alert("please put the valid value again");
  } else {
    console.log(createdCourse);
  }
});

//The problem is, if the user don't put any value and just click "Save it" the result is
//{title : "" price: 0} empty string, 0 number.
// to resolve this, I put the doable property decorator above.
