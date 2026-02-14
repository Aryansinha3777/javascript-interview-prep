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

