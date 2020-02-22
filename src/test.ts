interface defaulting {
  [whatever: string]: {
    [whatever2: string]: string[];
  };
}

const bracket: defaulting = {};

function deco(target: any, protoname: any) {
  bracket[target.constructor.name] = { [protoname]: ["hello"] };
} //bracket {testing: {name:["hello"]}}

function deco2(target: any, protoname: any) {
  bracket[target.constructor.name] = { [protoname]: ["hello2"] };
}

class testing {
  @deco
  name: string;
  @deco2
  age: number;

  constructor(t: string, q: number) {
    this.name = t;
    this.age = q;
  }
}

const tested = new testing("Anderson", 25);
console.log(bracket);
