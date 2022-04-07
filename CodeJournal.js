
// square braces = array
// curly braces = object
// "",'' = string


// Variables - containers that store values. 

var name; // a declared variable, but not initialized (no value) and in the global scope (not good practice).

let foo; // a declared variable that can be changed.

const bar = "Bar"; // a declared variable that cannot be changed. Short for "constant".

// "=" is the assignment operator, read it as "is assigned the value of...".

const ANSWER = 42; 

// Strings - collection of characters.

let string1 = "Hello World"; 

string1 = "Hello Utah!"; // let allows change to value of the variable.

let string3 = new string("Hellow New World!"); 

// Numbers

let myNum = 28238787432979; 

let floatNum = 75.25;

"1" == 1; // == indicates checking for equality. True, because of type coercion and loose equality checking. 

"1" === 1; // === is used for strict equality checking. False, because this is strict equality checking. 

// Boolean

let myBool = false;

// check into truthy and falsy values.

// Array

let myArray = [];  // this is an empty array.

// 0 indexed: 0 (index of the first item in an array), 1, 2, 3, 4,...
let myArray2 = [42, "Bob", false, "42", true]; 

let lastItem = myArray2[myArray2. length - 1];

// Objects

let minObject = {}; // this is the most minimal javascript object you can have

let myCar = { // JS objects are comprised of key:value pairs
make: 'Jeep',
model: 'Cherokee',
year: '1998',
vin: '2374372987597343588734579'
  }

let newVar = myCar.make; // used dot notation (.) to access an object's property value

myCar.numDoors = 6; // can also use dot notation to add a property to an object


const anotherObject = {
  wordz: ['foo', 'bar', 'baz'],
  car: {
    make: 'Mclaren',
    model: '720S'
  },
  awesomeness: true
}

// Functions

function myFunction() {
  return "My greeting to you from this very fine, simple function!"  
}

function sumTwoThings(thing1, thing2) {
    return thing1 + thing2;
}

// Filter method example, Filter returns an array of all elements that 'pass the tests'

const pilots = [
  {
    id: 2,
    name: "Wedge Antilles",
    faction: "Rebels"
  },
  {
    id: 8,
    name: "Ciena Ree",
    faction: "Empire"
  },
  {
    id: 40,
    name: "Iden Versio",
    faction: "Empire"
  },
  {
    id: 66,
    name: "Thane Kyrell",
    faction: "Rebels"
  }
]

const rebels = pilots.filter(pilot => pilot.faction === "Rebels")

const empire = pilots.filter((pilot) => {
return pilot.faction === "Empire"
})

// Array helper method 'map' example

let filmURLs = [
  "https://swapi.co/api/films/",
  "https://swapi.co/api/films/5/",
  "https://swapi.co/api/films/4/this one is longer... even longer",
  "https://swapi.co/api/films/6/",
  "https: ",
  "https://swapi.co/api/films/1/"
]

const filmLengths = filmURLs.map(filmURL => filmURL.length)

const filmPlusMore = filmURLs.map((filmURL) => {
let filmObj = {
  url: filmURL,
  createDate: Date.now()
}
return filmObj
})

const pilotNames = pilot.map(pilot => pilot.name)

// Ternary (tres leches) operator syntax: condition ? exprIfTrue : exprIfFalse

//Reduce example

| | | | | | // First time through     0     {}   0 +   14
const totalYears = swpilots.reduce((acc, pilot) => acc + pilot.years, 0) // the 'accumulation' value of 14 becomea the value of acc

const mostExpPilot = swpilots.reduce((oldest, pilot) => oldest.years > pilot.years ? oldest : pilot)
