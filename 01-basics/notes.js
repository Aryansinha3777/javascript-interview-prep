// ===============================
// 1. VAR vs LET vs CONST
// ===============================

// var -> function scoped
// let & const -> block scoped

function exampleScope() {
    if (true) {
        var a = 10;
        let b = 20;
        const c = 30;
    }

    console.log(a); // ✅ 10 (var is function scoped)
    // console.log(b); ❌ Error (block scoped)
    // console.log(c); ❌ Error (block scoped)
}

exampleScope();


// ===============================
// 2. HOISTING
// ===============================

// var is hoisted (initialized with undefined)
console.log(x); // undefined
var x = 5;

// let & const are hoisted but not initialized (Temporal Dead Zone)
// console.log(y); // ❌ ReferenceError
let y = 10;


//(
bcoz js treat like this
  var x;          // hoisted
  console.log(x); // undefined
  x = 10;         // initialization happens here

//)//

// ===============================
// 3. FUNCTION HOISTING
// ===============================

greet(); // ✅ Works

function greet() {
    console.log("Hello from hoisted function");
}


// ===============================
// 4. EXECUTION CONTEXT (Conceptual Note)
// ===============================

// Every JS program creates:
// 1. Global Execution Context
// 2. Function Execution Context
// 3. Call Stack

function first() {
    console.log("First");
    second();
}

function second() {
    console.log("Second");
}

first();


// ===============================
// 5. CLOSURE
// ===============================

function outer() {
    let counter = 0;

    function inner() {
        counter++;
        console.log(counter);
    }

    return inner;
}

const increment = outer();

increment(); // 1
increment(); // 2
increment(); // 3

// Note: 
(
    for this 
    const inc1 = outer();
    const inc2 = outer();

inc1(); //1
inc1(); //2
inc2(); //1
 bcoz here - const inc1 = outer(); inc1 now has its own closure with its own counter , similary inc2 has its own counter.
)

//imp

// return inner;   // returns function
// return inner(); // executes function
//Note
//INTERVIEW Q
1️⃣ Why does var print undefined but let throws error?

Because during the creation phase:

var is hoisted and initialized with undefined.

let is hoisted but NOT initialized.

2️⃣ What is Temporal Dead Zone (TDZ)?

Temporal Dead Zone is the time between:

When a let or const variable is hoisted

And when it is initialized

During this period, accessing the variable throws a ReferenceError.

It exists to prevent accidental usage before declaration.

3️⃣ Difference between function declaration and function expression hoisting?
Function Declaration
greet();

function greet() {
    console.log("Hi");
}


✔ Fully hoisted
✔ Can be called before definition

Because the entire function is stored in memory during creation phase.

Function Expression
sayHi();

var sayHi = function() {
    console.log("Hi");
};


❌ Only the variable is hoisted
❌ The function is assigned during execution phase

So internally:

var sayHi = undefined;
sayHi(); // TypeError

4️⃣ Why does counter not reset in closure?

Because the inner function forms a closure.

When outer() returns inner, JavaScript keeps the lexical environment of outer alive in memory.

So counter is preserved in that closure and does not get destroyed after outer() finishes.

5️⃣ Why do inc1 and inc2 not share the same counter?

Because each call to outer():

Creates a new execution context

Creates a new counter

Creates a new closure
