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


// ===============================
// 6. SCOPE CHAIN
// ===============================

// JavaScript looks for variables inside → outside
// It never searches downward

let globalVar = "I am Global";

function outer() {
    let outerVar = "I am Outer";

    function inner() {
        let innerVar = "I am Inner";

        console.log(innerVar);   // ✅ Inner
        console.log(outerVar);   // ✅ Outer
        console.log(globalVar);  // ✅ Global
    }

    inner();
}

outer();

//note
//(
   🔎 What Does “JavaScript Looks Inside → Outside” Mean?

When you try to use a variable inside a function, JavaScript searches for it in this order:

1️⃣ Current function scope
2️⃣ Parent function scope
3️⃣ Global scope
4️⃣ If not found → ❌ ReferenceError

This searching process is called the Scope Chain.

    🚨 What Does “It Never Searches Downward” Mean?

If you try this:

function outer() {
    function inner() {
        let secret = "Hidden";
    }

    console.log(secret); // ❌ Error
}

outer();


Why error?

Because:

outer() cannot access variables inside inner()

Parent cannot access child scope

Scope only flows:

Child → Parent → Global


Never:

Parent → Child ❌
//)


// ===============================
// 7. LEXICAL SCOPE
// ===============================

// Scope is decided by where function is written,
// not where it is called.

function parent() {
    let name = "Aryan";

    function child() {
        console.log(name);
    }

    return child;
}

const fn = parent();
fn(); // Aryan

//(
   When we call fn():

JS checks inside child() for name ❌

Goes to its lexical parent (parent() scope) ✅

Finds name = "Aryan"

So it prints:
//)


// ===============================
// 8. THIS KEYWORD
// ===============================

// 🔹 Global Scope
console.log(this); 
// In browser -> window
// In Node -> {}

//(
   Because in Node, each file is wrapped inside a module.
So at the top level:
this === module.exports
And module.exports starts as:
{}
That’s why you see {}.
//)


// 🔹 Regular Function
function showThis() {
    console.log(this);
}

showThis();
// In non-strict mode -> global object
// In strict mode -> undefined


// 🔹 Inside Object Method
const user = {
    name: "Aryan",
    greet: function () {
        console.log(this.name);
    }
};

user.greet(); // Aryan


// 🔹 Arrow Function (no own this)
const user2 = {
    name: "Aryan",
    greet: () => {
        console.log(this.name);
    }
};

user2.greet(); // undefined


// ===============================
// 9. CALL, APPLY, BIND
// ===============================

function greet(city) {
    console.log(this.name + " from " + city);
}

const person = { name: "Aryan" };

// call -> arguments separately
greet.call(person, "Delhi");

// apply -> arguments as array
greet.apply(person, ["Mumbai"]);

// bind -> returns new function
const boundFunc = greet.bind(person, "Bangalore");
boundFunc();


// ===============================
// 10. THIS INSIDE setTimeout (Interview Trap)
// ===============================

const obj = {
    name: "Aryan",
    greet: function () {
        setTimeout(function () {
            console.log(this.name); 
            // ❌ undefined (this refers to global object)
        }, 1000);
    }
};

obj.greet();


// ✅ Solution using arrow function
const obj2 = {
    name: "Aryan",
    greet: function () {
        setTimeout(() => {
            console.log(this.name); 
            // ✅ Aryan (arrow inherits this)
        }, 1000);
    }
};

obj2.greet();


// ===============================
// 11. PROTOTYPES
// ===============================

// Every JavaScript object has a hidden property called [[Prototype]]
// We can access it using __proto__

const obj = {
    name: "Aryan"
};

console.log(obj.__proto__); 
// Points to Object.prototype


// ===============================
// 12. FUNCTION PROTOTYPE
// ===============================

// Every function in JavaScript has a "prototype" property

function Person(name) {
    this.name = name;
}

console.log(Person.prototype);
// { constructor: Person }


// Adding methods to prototype
Person.prototype.greet = function () {
    console.log("Hello " + this.name);
};

const p1 = new Person("Aryan");
p1.greet(); // Hello Aryan


// ===============================
// 13. PROTOTYPAL INHERITANCE
// ===============================

// Objects can inherit properties from other objects

const animal = {
    eats: true
};

const dog = {
    barks: true
};

// Setting prototype manually
dog.__proto__ = animal;

console.log(dog.barks); // true (own property)
console.log(dog.eats);  // true (inherited)


// ===============================
// 14. HOW PROTOTYPE CHAIN WORKS
// ===============================

// When accessing a property:
// 1. JS looks in the object
// 2. If not found → looks in its prototype
// 3. Continues up until null

const user = {
    name: "Aryan"
};

console.log(user.toString());
// toString is not in user
// It exists in Object.prototype


// ===============================
// 15. CLASS SYNTAX (Syntactic Sugar)
// ===============================

class User {
    constructor(name) {
        this.name = name;
    }

    greet() {
        console.log("Hi " + this.name);
    }
}

const u1 = new User("Aryan");
u1.greet(); // Hi Aryan

// Behind the scenes:
// Class also uses prototype internally

// ===============================
// 16. SYNCHRONOUS VS ASYNCHRONOUS
// ===============================

// JavaScript is single-threaded
// It executes one line at a time (synchronous)

console.log("Start");

console.log("Middle");

console.log("End");

// Output:
// Start
// Middle
// End


// ===============================
// 17. ASYNCHRONOUS EXAMPLE
// ===============================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");

// Output:
// Start
// End
// Timeout


// ===============================
// 18. WHY DOES setTimeout RUN LAST?
// ===============================

// JavaScript has:
// 1. Call Stack
// 2. Web APIs (Browser)
// 3. Callback Queue
// 4. Event Loop

// setTimeout is handled by Web APIs,
// not directly by the Call Stack


// ===============================
// 19. CALL STACK
// ===============================

function first() {
    console.log("First");
}

function second() {
    first();
    console.log("Second");
}

second();

// Call Stack executes functions
// in Last In First Out (LIFO)


// ===============================
// 20. EVENT LOOP FLOW
// ===============================

// 1. Code enters Call Stack
// 2. setTimeout goes to Web API
// 3. After timer finishes → goes to Callback Queue
// 4. Event Loop checks:
//    If Call Stack is empty → move callback to stack

When you run:

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

console.log("End");


Even though timeout is 0ms:

1️⃣ Start goes to Call Stack → prints
2️⃣ setTimeout moves to Web API
3️⃣ End prints
4️⃣ Call Stack becomes empty
5️⃣ Event Loop moves callback from queue to stack
6️⃣ Timeout prints


// ===============================
// 21. PROMISE BASICS
// ===============================

// A Promise represents a future value

const promise = new Promise((resolve, reject) => {
    let success = true;

    if (success) {
        resolve("Operation Successful");
    } else {
        reject("Operation Failed");
    }
});

promise
    .then((result) => {
        console.log(result);
    })
    .catch((error) => {
        console.log(error);
    });


// ===============================
// 22. PROMISE STATES
// ===============================

// 1. Pending
// 2. Fulfilled (resolve)
// 3. Rejected (reject)


// ===============================
// 23. PROMISE VS setTimeout (IMPORTANT)
// ===============================

console.log("Start");

setTimeout(() => {
    console.log("Timeout");
}, 0);

Promise.resolve().then(() => {
    console.log("Promise");
});

console.log("End");

// Output:
// Start
// End
// Promise
// Timeout

Call Stack:
Start → End

Microtask Queue:
Promise

Macrotask Queue:
Timeout


// ===============================
// 24. WHY PROMISE RUNS BEFORE setTimeout?
// ===============================

// Because Promises use Microtask Queue
// setTimeout uses Callback Queue

// Event Loop priority:
// 1. Call Stack
// 2. Microtask Queue (Promises)
// 3. Callback Queue (setTimeout)


// ===============================
// 25. ASYNC / AWAIT BASICS
// ===============================

// async makes a function always return a Promise

async function example1() {
    return "Hello";
}

console.log(example1());
// Output: Promise { "Hello" }



// ===============================
// 26. AWAIT KEYWORD
// ===============================

// await pauses execution inside async function
// until the Promise resolves

function getData() {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve("Data received");
        }, 1000);
    });
}

async function example2() {
    const result = await getData();
    console.log(result);
}

example2();
// Output after 1 sec: Data received



// ===============================
// 27. AWAIT DOES NOT BLOCK JS
// ===============================

console.log("Start");

async function example3() {
    console.log("Inside");
    await Promise.resolve();
    console.log("After Await");
}

example3();

console.log("End");

// Output:
// Start
// Inside
// End
// After Await



// ===============================
// 28. ERROR HANDLING WITH TRY/CATCH
// ===============================

function getError() {
    return new Promise((resolve, reject) => {
        reject("Something went wrong");
    });
}

async function example4() {
    try {
        const data = await getError();
        console.log(data);
    } catch (error) {
        console.log("Caught:", error);
    }
}

example4();
// Output: Caught: Something went wrong

🧠 Golden Rule
await converts:
Rejected Promise → Thrown Error
Without await, it remains:
Rejected Promise (no throwing)



// ===============================
// 29. SEQUENTIAL VS PARALLEL AWAIT
// ===============================

function task1() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 1 Done"), 1000);
    });
}

function task2() {
    return new Promise(resolve => {
        setTimeout(() => resolve("Task 2 Done"), 1000);
    });
}

// ❌ Sequential (takes 2 seconds)
async function sequential() {
    const a = await task1();
    const b = await task2();
    console.log(a, b);
}

// ✅ Parallel (takes 1 second)
async function parallel() {
    const p1 = task1();
    const p2 = task2();

    const a = await p1;
    const b = await p2;

    console.log(a, b);
}



// ===============================
// 30. ASYNC FUNCTION RETURN VALUE
// ===============================

async function example5() {
    return 10;
}

example5().then(value => {
    console.log(value);
});

// Output: 10

💡 Trick To Read It Comfortably
When you see:
.then(value => {
    console.log(value);
});
Mentally rewrite it as:

.then(function(value) {
    console.log(value);
});
Everything becomes clearer.

// 
  example5()        // returns Promise
    .then(        // when resolved
        value =>  // take resolved value
        {
            console.log(value);  // do this
        }
    );
//

    
// ===============================
// 31. THROW INSIDE ASYNC
// ===============================

async function example6() {
    throw new Error("Failed");
}

example6().catch(error => {
    console.log(error.message);
});

// Output: Failed

🧠 Compare With Normal Function

Normal function:
function test() {
    throw new Error("Failed");
}
test(); // ❌ crashes immediately

Async function:
async function test() {
    throw new Error("Failed");
}
test(); // returns rejected Promise
Big difference.

    
// ===============================
// 32. Promise.all()
// ===============================

// Runs multiple promises in parallel
// Resolves when ALL promises resolve
// Rejects immediately if ANY promise rejects

const p1 = Promise.resolve("A");
const p2 = Promise.resolve("B");
const p3 = Promise.resolve("C");

Promise.all([p1, p2, p3])
    .then(results => {
        console.log(results);
    })
    .catch(error => {
        console.log(error);
    });

// Output: ["A", "B", "C"]



// If one fails:
const p4 = Promise.reject("Error!");

Promise.all([p1, p4, p3])
    .then(results => console.log(results))
    .catch(error => console.log(error));

// Output: Error!



// ===============================
// 33. Promise.race()
// ===============================

// Resolves or rejects with the FIRST settled promise

const fast = new Promise(resolve =>
    setTimeout(() => resolve("Fast"), 500)
);

const slow = new Promise(resolve =>
    setTimeout(() => resolve("Slow"), 1000)
);

Promise.race([fast, slow])
    .then(result => console.log(result));

// Output: Fast



// ===============================
// 34. Promise.allSettled()
// ===============================

// Waits for ALL promises to settle (resolve or reject)
// Never rejects

const p5 = Promise.resolve("Success");
const p6 = Promise.reject("Failure");

Promise.allSettled([p5, p6])
    .then(results => {
        console.log(results);
    });

// Output:
// [
//   { status: "fulfilled", value: "Success" },
//   { status: "rejected", reason: "Failure" }
// ]



// ===============================
// 35. Promise.any()
// ===============================

// Resolves with the FIRST fulfilled promise
// Rejects only if ALL promises reject

const p7 = Promise.reject("Error 1");
const p8 = Promise.resolve("Winner");
const p9 = Promise.reject("Error 2");

Promise.any([p7, p8, p9])
    .then(result => console.log(result))
    .catch(error => console.log(error));

// Output: Winner

🔥 Real-World Usage
Promise.all → multiple API calls in parallel
Promise.race → timeout logic
Promise.allSettled → show partial results
Promise.any → fallback servers / fastest working API


// ===============================
// 36. DEBOUNCE
// ===============================

// Debounce ensures a function runs only AFTER
// a certain delay has passed since the last call.

function debounce(fn, delay) {
    let timer;

    return function (...args) {
        clearTimeout(timer);

        timer = setTimeout(() => {
            fn.apply(this, args);
        }, delay);
    };
}

// Example:

function search(query) {
    console.log("Searching for:", query);
}

const debouncedSearch = debounce(search, 1000);

debouncedSearch("A");
debouncedSearch("Ar");
debouncedSearch("Ary");
debouncedSearch("Aryan");

// Only the LAST call runs after 1 second

Step 1: Call debouncedSearch("A")
debouncedSearch("A");
The returned function executes.
clearTimeout(timer) → timer is undefined, so nothing happens.
timer = setTimeout(...) → schedules a call to search("A") after 1000ms.
State:
timer → active timeout for 1000ms.
Step 2: Call debouncedSearch("Ar") (before 1s)
debouncedSearch("Ar");
Function executes.
clearTimeout(timer) → previous timer for search("A") is cancelled.
timer = setTimeout(...) → new timeout for search("Ar") after 1000ms.
State:
search("A") → never runs
timer → new active timeout for 1000ms
Step 3: Call debouncedSearch("Ary") (again before 1s)
debouncedSearch("Ary");
Function executes.
clearTimeout(timer) → previous timer for search("Ar") is cancelled.
timer = setTimeout(...) → new timeout for search("Ary") after 1000ms.
State:
search("A") → never
search("Ar") → never
timer → active timeout for 1000ms
Step 4: Call debouncedSearch("Aryan")
debouncedSearch("Aryan");
Function executes.
clearTimeout(timer) → previous timer for search("Ary") is cancelled.
timer = setTimeout(...) → new timeout for search("Aryan") after 1000ms.
State:
Only search("Aryan") is now scheduled.
Step 5: Wait for 1 second
No more calls are made.
The last timer expires.
search("Aryan") executes:
Searching for: Aryan


// ===============================
// 37. THROTTLE
// ===============================

// Throttle ensures a function runs AT MOST
// once every specified interval, no matter how many times it's called.

function throttle(fn, interval) {
    let lastTime = 0;

    return function (...args) {
        const now = Date.now();

        if (now - lastTime >= interval) {
            fn.apply(this, args);
            lastTime = now;
        }
    };
}

// Example:

function logScroll(event) {
    console.log("Scroll event at:", Date.now());
}

const throttledScroll = throttle(logScroll, 1000);

// If you attach to scroll event:
window.addEventListener("scroll", throttledScroll);


// ===============================
// 38. CURRYING
// ===============================

// Currying is transforming a function
// that takes multiple arguments into a sequence
// of functions that each take a single argument.

// Example: Normal function
function add(a, b, c) {
    return a + b + c;
}

console.log(add(2, 3, 4)); // 9


// Curried version
function curriedAdd(a) {
    return function (b) {
        return function (c) {
            return a + b + c;
        };
    };
}

console.log(curriedAdd(2)(3)(4)); // 9

// ===============================
// 39. SHALLOW VS DEEP COPY
// ===============================

// 🔹 Shallow Copy
// Copies only the first level of an object.
// Nested objects are still references.

const original = {
    name: "Aryan",
    skills: {
        js: true,
        react: true
    }
};

// Using Object.assign
const shallow1 = Object.assign({}, original);

// Using spread operator
const shallow2 = { ...original };

shallow1.skills.js = false;
console.log(original.skills.js); // false ✅ affected
console.log(shallow2.skills.js); // false ✅ affected

// Conclusion: Nested objects still share the same reference


// 🔹 Deep Copy
// Creates a completely independent clone of the object.

const deepCopy = JSON.parse(JSON.stringify(original));
deepCopy.skills.react = false;

console.log(original.skills.react); // true ✅ original unaffected
console.log(deepCopy.skills.react); // false ✅ cloned object changed

