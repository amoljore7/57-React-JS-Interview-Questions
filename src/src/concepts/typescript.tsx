
// 🧠 TypeScript for React Developers — Complete Notes

import { JSX } from "react";

// 1️⃣ What is TypeScript and Why Use It?

// 📘 What is TypeScript?
// 	•	TypeScript is a superset of JavaScript — it adds static typing to JavaScript.
// 	•	Files use the .ts (or .tsx for React) extension.
// 	•	It compiles back to JavaScript, so browsers can run it.

// 💡 Why TypeScript?

// Without TypeScript (JS)         With TypeScript (TS)
// Errors only appear at runtime   Errors appear while coding (compile time)
// No type checking                Strict type checking
// Harder to refactor safely       Easier, safer refactoring
// Unclear code intent             Self-documented, explicit code

// ✅ Benefits
// 	•	Early error detection
// 	•	Improved IDE auto-completion
// 	•	Cleaner and more readable code
// 	•	Easier team collaboration
// 	•	Essential for large-scale React apps

// ⸻

// 2️⃣ Environment Setup

// 🧰 Install TypeScript globally
// npm install -g typescript

// 🏗️ Initialize a TypeScript project
// npx tsc --init
//This creates a tsconfig.json file — where you configure compiler options.

// ⚛️ Create a React app with TypeScript
//npx create-react-app my-app --template typescript

// This automatically sets up:
// 	•	.tsx file support
// 	•	TypeScript dependencies
// 	•	Type definitions for React (@types/react)

//3️⃣ Variable Declarations
//In TS, you must (or should) define variable types.

// let username: string = "Amol";
// let age: number = 25;
// let isActive: boolean = true;
// let hobbies: string[] = ["coding", "reading"];
// let data: any = "anything"; // avoid 'any' — disables type checking

// 4️⃣ Variable Types

// Type                Example                              Description
// string              "Hello"                              Text values
// number              42, 3.14                             Numeric values
// boolean             true, false                          True/false values
//any                  "anything"                           Disables type checking (avoid using often)
//unknown              value: unknown                       Like any, but safer — must be checked before use
// null / undefined     null, undefined                     Empty or missing values
//array                 string[], number[]                  Typed arrays
//tuple                 [string, number]                    Fixed number of elements with types
//enum                  enum Role { User, Admin }           Set of named constants
//object                { name: string; age: number }       Custom structure




// 5️⃣ Functions

//Functions can have typed parameters and return types.
function add(a: number, b: number): number {
  return a + b;
}

// Arrow function
const multiply = (x: number, y: number): number => x * y;

// Optional and default parameters
function greet(name: string, greeting: string = "Hello"): string {
  return `${greeting}, ${name}`;
}

// ⸻
// ⚠️ If a function doesn’t return anything, use void:

function logMessage(msg: string): void {
  console.log(msg);
}

// 6️⃣ Interface

// Interfaces define the shape (structure) of an object.
interface User {
  name: string;
  age: number;
  isAdmin?: boolean; // optional property
}

const user1: User = {
  name: "Amol",
  age: 27,
};

//Interfaces can also describe function types and React props.
interface ButtonProps {
  label: string;
  onClick: () => void;
}

function Button({ label, onClick }: ButtonProps) {
  return <button onClick={onClick}>{label}</button>;
}

// 7️⃣ Class and Access Modifiers

// TypeScript supports OOP (Object-Oriented Programming).
class Person {
  private name: string; // accessible only inside this class
  public age: number;   // accessible anywhere
  protected city: string; // accessible in this and derived classes

  constructor(name: string, age: number, city: string) {
    this.name = name;
    this.age = age;
    this.city = city;
  }

  public greet(): void {
    console.log(`Hello, my name is ${this.name}`);
  }
}

class Employee extends Person {
  constructor(name: string, age: number, city: string, public role: string) {
    super(name, age, city);
  }
}

const emp = new Employee("Amol", 27, "Pune", "Developer");
emp.greet(); // ✅ works //console logs: Hello, my name is Amol
console.log(emp.age);  // ✅ works
console.log(emp.role); // ✅ works
// console.log(emp.city); ❌ Error: 'city' is protected
// console.log(emp.name); ❌ Error: 'name' is private

// 8️⃣ Type Aliases

// Type aliases are like interfaces but can also describe unions and primitives.
type ID = string | number;
type Status = "active" | "inactive";

function printId(id: ID): void {
  console.log("ID:", id);
}

//9️⃣ Union and Intersection Types
// Union: variable can be of multiple types
let value: string | number;
value = "Hello";
value = 42;

// Intersection: combine multiple types
interface Person {
  name: string;
}
interface Contact {
  email: string;
}
type Employee = Person & Contact;

// 🔟 Generics

// Used to create reusable components or functions that work with different types.
// <T> → defines a "type variable" (a placeholder for a type)
// (value: T) → parameter of type T
// : T → function returns the same type T
// It helps maintain type safety while keeping code flexible and reusable.

function identity<T>(value: T): T {
  return value;
}

// TS automatically infers type, or you can specify it manually:
identity<string>("Amol"); // T = string
identity<number>(123);    // T = number

// Example in React:
interface ListProps<T> {
  items: T[];
  render: (item: T) => JSX.Element;
}

function List<T>({ items, render }: ListProps<T>) {
  return <>{items.map(render)}</>;
}

// 🧠 Explanation:
// 1️⃣ <T> → Generic type parameter — allows the component to work with any data type.
// 2️⃣ items: T[] → 'items' is an array of type T (could be string[], number[], object[], etc.).
// 3️⃣ render: (item: T) => JSX.Element → Function that defines how each item should be displayed.
// 4️⃣ When using this component, you pass the specific type for T:

// Example Usage:
<List<string>
  items={['React', 'TypeScript', 'Redux']}
  render={(item) => <p key={item}>{item}</p>}
/>

// ✅ Here, T = string
// If items were objects, like users, T could be { name: string; age: number }.
// This makes the component reusable and type-safe for any data type.

//1️⃣1️⃣ TypeScript with React Components

// 👇 Interface defines what props the component expects
interface GreetingProps {
  name: string;   // required prop
  age?: number;   // optional prop (the '?' means optional)
}

// ✅ React.FC<GreetingProps> tells TypeScript that this is a React Functional Component
//    which accepts props of type 'GreetingProps'.
//    React.FC automatically provides typing for children and return type (JSX.Element).
// ✅ In short:
// 	•	React.FC<GreetingProps> → provides types for props automatically.
// 	•	{ name, age } → destructured props already typed, no need to redeclare.
// 	•	TypeScript does full type checking behind the scenes — if you pass wrong props, it’ll show an error at compile time.
const Greeting: React.FC<GreetingProps> = ({ name, age }) => {
  return (
    <p>
      Hello {name}! {age && `You are ${age} years old.`}
    </p>
  );
};

// 💡 Explanation:
// - Using React.FC<GreetingProps> ensures props are type-checked.
// - If you pass a wrong type (e.g., number instead of string for name), TypeScript warns you.
// - '?' in age makes it optional, so you can use <Greeting name="Amol" /> without error.
// - The return type is automatically JSX.Element, so no need to specify it manually.

//useState with TypeScript
const [count, setCount] = useState<number>(0);
const [user, setUser] = useState<User | null>(null);

//useRef with TypeScript
const inputRef = useRef<HTMLInputElement>(null);

//🧠 Advanced TypeScript Topics for Senior React Devs

//Built-in helpers that make type transformations easy.
interface User {
  id: number;
  name: string;
  email?: string;
}

// Makes all fields optional
type PartialUser = Partial<User>;

// Picks only specific keys
type UserPreview = Pick<User, "id" | "name">;

// Removes specific keys
type UserWithoutEmail = Omit<User, "email">;

// Makes fields readonly
type ReadonlyUser = Readonly<User>;
//✅ Used a lot in React forms, Redux states, and API response shaping.

//2️⃣ Type Guards & Narrowing
//Helps TS understand the type of a variable during runtime.
function printValue(value: string | number) {
  if (typeof value === "string") {
    console.log(value.toUpperCase());
  } else {
    console.log(value.toFixed(2));
  }
}
//✅ Prevents runtime errors when working with mixed data types.

// 3️⃣ Discriminated Unions

// A clean pattern for handling multiple data “variants”.
type Shape =
  | { kind: "circle"; radius: number }
  | { kind: "square"; side: number };

function getArea(shape: Shape): number {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "square":
      return shape.side ** 2;
  }
}
//✅ Common in reducers, component states, or API response variations.

//4️⃣ Generics with Constraints

//Reusable, type-safe components with limited flexibility.
function getProperty<T extends object, K extends keyof T>(obj: T, key: K) {
  return obj[key];
}

const person = { name: "Amol", age: 27 };
const result = getProperty(person, "name"); // ✅ Works
// getProperty(person, "city"); ❌ Error
//✅ Used heavily in reusable hooks & utilities.

//5️⃣ Custom Hooks with Generics

//Real-world React + TypeScript use case.
function useFetch<T>(url: string): [T | null, boolean] {
  const [data, setData] = React.useState<T | null>(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading];
}

// Usage
interface Post { id: number; title: string; }
const [posts, loading] = useFetch<Post[]>('/api/posts');
//✅ Super useful for interviews — shows TS + React mastery.

//6️⃣ Conditional Types
//Write types that depend on other types (used in libraries like React, Redux Toolkit).

type IsString<T> = T extends string ? "Yes" : "No";
type Result1 = IsString<string>; // "Yes"
type Result2 = IsString<number>; // "No"

//7️⃣ Mapped Types

//Transform object types dynamically.
type Optional<T> = {
  [K in keyof T]?: T[K];
};

interface Profile {
  name: string;
  age: number;
}

type PartialProfile = Optional<Profile>;

//✅ This is how TypeScript internally defines Partial, Pick, etc.

// 8️⃣ Strict Mode & Compiler Options

// Must-know for real projects.

// tsconfig.json best practices:
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "noUnusedLocals": true,
    "esModuleInterop": true
  }
}
// ✅ Enables the strongest level of type safety.

// 9️⃣ Declaration Merging

// Extend or modify existing interfaces (like third-party libraries).
interface Window {
  myAppVersion?: string;
}

window.myAppVersion = "1.0.0";

// 🔟 Module Augmentation

// Add types to external modules.
// custom.d.ts
declare module "express" {
  export interface Request {
    user?: { id: string; role: string };
  }
}
// ✅ Common in full-stack apps (React + Node/Express).


// 🧩 Type vs Interface — The Core Difference

// Both type and interface are used in TypeScript to describe the shape of data — objects, functions, etc.
// But they differ slightly in capabilities and use cases.

// 🧠 Why That Suggestion Makes Sense

// “Use type when building React apps, and interface when building libraries.”

// Let’s unpack that 👇

// 🔹 1. In React apps (use type)
// 	•	You often use utility types (Partial, Pick, Omit), unions, and intersections.
// 	•	You rarely need to merge declarations across multiple files.
// 	•	You care more about conciseness and flexibility.

// ✅ Example — React Component Props

type ButtonProps = {
  label: string;
  size?: "sm" | "md" | "lg";
  onClick?: () => void;
};

// ✅ Example — Union type for state
type Status = "idle" | "loading" | "success" | "error";
// ➡️ type is more expressive for this kind of use.

// 🔹 2. In Libraries (use interface)
// 	•	Libraries often need to be extensible — other developers may want to augment or extend your types.
// 	•	Interfaces can be merged and extended easily — making them perfect for SDKs, frameworks, and UI libraries.

// ✅ Example — Extending an existing interface

interface ButtonProps {
  label: string;
}

interface ButtonProps {
  color?: string; // merged automatically
}
// ✅ Example — Extending interfaces
interface BaseProps {
  id: string;
}

interface AdvancedProps extends BaseProps {
  theme: string;
}
// ➡️ interface makes it easy for library consumers to extend types safely.

// ✅ Quick Rule of Thumb

// 🔸 Use type for React apps — concise, flexible, expressive.
// 🔸 Use interface for libraries — extensible, mergeable, safer for public APIs.


// Step 1. Input Component (InputField.tsx)
import React from "react";

interface InputFieldProps {
  value: string;
  onChange: (value: string) => void;
}

export const InputField: React.FC<InputFieldProps> = ({ value, onChange }) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  return (
    <input
      type="text"
      value={value}
      onChange={handleChange}
      placeholder="Enter text"
      className="border p-2 rounded"
    />
  );
};
// 🧠 Explanation
// 	•	onChange is typed as (value: string) => void.
// 	•	Inside, we call onChange(e.target.value) to send the new value back to the parent.

// ⸻

// ✅ Step 2. Button Component (Button.tsx)
import React from "react";

interface ButtonProps {
  label: string;
  onClick: () => void;
}

export const Button: React.FC<ButtonProps> = ({ label, onClick }) => {
  return (
    <button
      onClick={onClick}
      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
    >
      {label}
    </button>
  );
};
// 🧠 Explanation
// 	•	onClick is typed as a simple function returning void.
// 	•	We call it when the button is clicked.
import React, { useState } from "react";
import { InputField } from "./InputField";
import { Button } from "./Button";

export const Parent: React.FC = () => {
  const [text, setText] = useState<string>("");

  const handleInputChange = (value: string) => {
    setText(value);
  };

  const handleButtonClick = () => {
    alert(`You entered: ${text}`);
  };

  return (
    <div className="flex flex-col gap-3 items-start">
      <InputField value={text} onChange={handleInputChange} />
      <Button label="Show Value" onClick={handleButtonClick} />
    </div>
  );
};

// Scenario: You’re using a hook like useState where the initial value is null,
// but later you’ll store an object in that state.

// 🧩 Example Scenario

// Say you want to manage a User object in state,
// but it’s initially null (maybe before fetching user data from an API).

// ⸻

// ✅ Step 1. Define a Type or Interface
interface User {
  id: number;
  name: string;
  email: string;
}
// ✅ Step 2. useState with a Union Type

// Since the state will be null initially,
// but later an object of type User, you combine both types:
const [user, setUser] = useState<User | null>(null);
// ✅ Step 3. Update the State Later

// When you fetch data or create a user:
setUser({
  id: 1,
  name: "Amol",
  email: "amol@example.com",
});
// Now TypeScript knows:
// 	•	Initially user is null.
// 	•	After update, user is of type User.

// ⚙️ 2️⃣ useEffect — Works Seamlessly

// TypeScript automatically infers the types from your state or dependencies,
// so you don’t need to specify any extra types here.

// Example:
useEffect(() => {
  if (user) {
    console.log("User loaded:", user.name);
  }
}, [user]);
// ✅ Works perfectly — TypeScript already knows user can be User | null,
// so it forces you to check if (user) before using its properties.

// 🧠 3️⃣ useRef — Use Union Types for Null Initials

// Refs often start as null, so you use the same pattern:

const inputRef = useRef<HTMLInputElement | null>(null);

useEffect(() => {
  inputRef.current?.focus(); // ✅ Safe — ?. handles null
}, []);
// ✅ TS knows inputRef.current might be null, so you must use ?. or an if check.

// 🧱 4️⃣ useContext — Use Generic Type + Default null

// When creating a context that might start empty, do this:
interface AuthContextType {
  user: User | null;
  setUser: React.Dispatch<React.SetStateAction<User | null>>;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

const useAuth = () => {
  const context = React.useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
// ✅ This ensures full type safety even if the context is null initially.

// 🔁 5️⃣ Custom Hooks — Generic + Union Safe Pattern

// Example custom hook:
function useFetch<T>(url: string): [T | null, boolean] {
  const [data, setData] = useState<T | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(url)
      .then(res => res.json())
      .then(json => setData(json))
      .finally(() => setLoading(false));
  }, [url]);

  return [data, loading];
}
// ✅ Generic hook that works for any type (T),
// and uses T | null safely for initial empty state.
