
// In JavaScript, call and apply are used to invoke a function immediately and explicitly set the value of this inside that function.
// 	•	call() — calls a function with a given this value and arguments passed individually.
// 	•	apply() — calls a function with a given this value and arguments passed as an array.
//    bind() is similar but returns a new function instead of calling it immediately.

function greet(greeting = "Hello", punctuation = "!") {
  console.log(`${greeting}, ${this.name} ${punctuation}`);
}
const myThisUser = { name: "Amol" };
const myThisUser1 = { name: "Rahul" };

greet.call(myThisUser, "Hello", "!"); // Hello, Amol !
greet.apply(myThisUser1, ["Hello", "!"]); // Hello, Rahul !

const boundGreet = greet.bind(myThisUser, "Hello");
boundGreet("!"); // Hello, Amol !



// Example demonstrating 'this' context with call, apply, and bind
var obj = {
  helloWorld: function () {
    console.log("Hello, World! " + this.name);
  },
  name: 'Amol'
}
var obj2 = {
  helloWorld: obj.helloWorld,
  name: 'Rahul'
}
obj.helloWorld(); // Hello, World! Amol
obj2.helloWorld(); // Hello, World! Rahul

var boundFunction = obj.helloWorld.bind({ name: 'Shubham' });
boundFunction(); // Hello, World! Shubham


//memoized function is useful to optimize performance by caching the results of expensive function calls and returning the cached result when the same inputs occur again.
function memoize(func) {
  const cache = {}; // A cache object to store results

  return function (...args) {
    // Create a unique key for the cache based on the function's arguments
    // For simplicity, we'll stringify the arguments.
    // For complex objects or functions as arguments, a more robust key generation might be needed.
    const key = JSON.stringify(args);
    console.log('>>>>key', key);

    if (cache[key]) {
      // If the result is in the cache, return it
      return cache[key];
    } else {
      // If not in cache, execute the original function
      const result = func.apply(this, args);
      // Store the result in the cache
      cache[key] = result;
      return result;
    }
  };
}

// Example usage:
function expensiveFunction(n) {
  console.log('Computing...'); // To demonstrate when the function actually runs
  // Simulate an expensive computation
  let sum = 0;
  for (let i = 0; i < n * 1000000; i++) {
    sum += i;
  }
  return sum;
}

const memoizedExpensiveFunction = memoize(expensiveFunction);

console.log(memoizedExpensiveFunction(5)); // First call: computes and caches
console.log(memoizedExpensiveFunction(5)); // Second call with same argument: returns cached result
console.log(memoizedExpensiveFunction(10)); // Third call with different argument: computes and caches
console.log(memoizedExpensiveFunction(10)); // Fourth call with same argument: returns cached result

 


//promise chaining demo
const cart = ['shoes', 'pants', 'kurta']

createOrder(cart)
  .then((id) => {
    console.log('>>>id', id)
    return proceedToPayment(id)
  })
  .then((info) => {
    console.log('>>info>', info)
    return showOdersummary(info)
  })
  .then((summary) => {
    console.log('>>summary>', summary)
    return updateWallet(summary)
  })
  .then((walletMSG) => {
    console.log('>>walletMSG>', walletMSG)
  })
  .catch((err) => {
    console.log('>>>err', err)
  })



function createOrder(cart) {
  const pr = new Promise((resolve, reject) => {

    if (cart.length > 0) {
      let orderId = 123
      resolve(orderId)
    } else {
      let err = new Error('Cart is not valid')
      reject(err)
    }
  })
  return pr
}

function proceedToPayment(id) {
  const pr = new Promise((resolve, reject) => {
    if (id !== null) {
      const info = {
        item: 2,
        totalCount: 2
      }
      resolve(info)
    } else {
      let err = new Error('Id is null')
      reject(err)
    }
  })
  return pr
}

function showOdersummary(info) {
  let pr = new Promise((resolve, reject) => {
    if (info.item === 2) {
      resolve("successful checked")

    } else {
      let err = new Error('order not found')
      reject(err)
    }
  })
  return pr
}

function updateWallet(msg) {
  let pr = new Promise((resolve, reject) => {
    if (msg === "successful checked") {
      resolve('wallet updated')
    } else {
      let err = new Error('wallet not update')
      reject(err)
    }
  })
  return pr
}


// ✅ Simple working LRU Cache in JavaScript
// “Implement a cache (like in Chrome or a browser) that stores key-value pairs and automatically removes the least recently used item when the cache is full.”

// That’s basically an LRU (Least Recently Used) cache.


// “I used a Map because it maintains insertion order in JavaScript.
// Every time I access a key, I remove and reinsert it at the end to mark it as recently used.
// When I exceed the limit, I remove the first inserted key, which is the least recently used one.”

class LRUCache {
  constructor(limit = 3) {
    this.limit = limit;
    this.cache = new Map(); // maintains insertion order
  }

  get(key) {
    if (!this.cache.has(key)) return -1;

    // Move the key to the end to mark it as recently used
    const value = this.cache.get(key);
    this.cache.delete(key);
    this.cache.set(key, value);

    return value;
  }

  put(key, value) {
    // If key already exists, remove it so we can re-insert (mark as recently used)
    if (this.cache.has(key)) {
      this.cache.delete(key);
    }

    // If cache is full, delete the least recently used (first item)
    if (this.cache.size >= this.limit) {
      const firstKey = this.cache.keys().next().value;
      this.cache.delete(firstKey);
    }

    // Insert the new key-value pair
    this.cache.set(key, value);
  }
}

// 🔹 Example Usage:
const cache = new LRUCache(3);
cache.put("a", 1);
cache.put("b", 2);
cache.put("c", 3);
console.log(cache.get("a")); // 1 (a is now most recently used)
cache.put("d", 4); // removes "b" (least recently used)
console.log([...cache.cache.entries()]); // [['c',3], ['a',1], ['d',4]]

const matrix = Array(9).fill(null)
console.log(matrix)


// interview question answer on Map/Set 
// Map is a collection of keyed data items, just like an Object. But the main difference is that Map allows keys of any type.
// In Map, the keys can be of any data type, including objects, functions, and primitive types like numbers and strings. In contrast, Object keys are typically strings or symbols.

// Set is a collection of unique values. It allows you to store any type of value, whether primitive or object references, and automatically handles duplicates by only storing unique values.

// In summary, use Map when you need key-value pairs with flexible key types, and use Set when you need a collection of unique values without duplicates.   
//Example:
const myMap = new Map();
myMap.set(1, 'one');
myMap.set('two', 2);
myMap.set(true, 'boolean true');

console.log(myMap.get(1)); // 'one'
console.log(myMap.get('two')); // 2
console.log(myMap.get(true)); // 'boolean true'

const mySet = new Set();
mySet.add(1);
mySet.add(2);
mySet.add(2); // Duplicate, will be ignored
mySet.add('three');

console.log(mySet.has(2)); // true
console.log(mySet.size); // 3 // Size is 3 because duplicate '2' was ignored    


//Iterators and Generators are special constructs in JavaScript that allow you to define custom iteration behavior for objects.

// An iterator is an object that defines a sequence and potentially a return value upon its termination. It implements the Iterator protocol by having a next() method that returns an object with two properties: value (the next value in the sequence) and done (a boolean indicating whether the iteration is complete).

// A generator is a special type of function that can be paused and resumed, allowing you to define an iterative algorithm by writing a single function whose execution is not continuous. Generators are defined using the function* syntax and use the yield keyword to produce values.

// Example of a simple generator function:
function* simpleGenerator() {
  yield 1;
  yield 2;
  yield 3;
}

const gen = simpleGenerator();

console.log(gen.next().value); // 1
console.log(gen.next().value); // 2
console.log(gen.next().value); // 3
console.log(gen.next().done);  // true