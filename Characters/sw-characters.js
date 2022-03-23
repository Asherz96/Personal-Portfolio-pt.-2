import { people } from '../Data/people.js'
import { getLastNumber, removeChildren } from '../utils/index.js'

const header = document.querySelector("header")
const main = document.querySelector("main")

const allCharactersButton = document.createElement("button")
allCharactersButton.textContent = "All Characters"
allCharactersButton.addEventListener("click", function () {
  populateDOM(people)
})

// const result = words.filter(word => word.length > 6);
const maleCharacters = people.filter(person => person.gender === 'male') // elegant filter!


/* const otherCharacters = people.filter(person => {
  if( 
person.gender === 'n/a' ||
person.gender === 'none' ||
person.gender === 'hermaphrodite' 
  ){
    return person
  }
}) */

const otherCharacters = people.filter((person) => person.gender !== "male" && person.gender !== "female")

/* const maleCharacters = people.filter((person) => {
  console.log(person.name)
  return person.gender === 'male'
}) */


const maleCharactersButton = document.createElement('button')
maleCharactersButton.textContent = "Male Characters"
maleCharactersButton.addEventListener("click", () => populateDOM(maleCharacters))

const otherCharactersButton = document.createElement('button')
otherCharactersButton.textContent = "Other Characters"
otherCharactersButton.addEventListener("click", () => populateDOM(otherCharacters))

header.appendChild(allCharactersButton)
header.appendChild(maleCharactersButton)
header.appendChild(otherCharactersButton)

function populateDOM(characters) {
  removeChildren(main)
  characters.forEach((person) => {
    const personFig = document.createElement("figure")
    const personImg = document.createElement("img")
    let charNum = getLastNumber(person.url)
    personImg.src = `https://starwars-visualguide.com/assets/img/characters/${charNum}.jpg`
    const personCap = document.createElement("figcaption")
    personCap.textContent = person.name

    personFig.appendChild(personImg)
    personFig.appendChild(personCap)
    main.appendChild(personFig)
  })
}

/* function getLastNumber(url){
    const secondToLastLetterOfUrl = url[url.length - 2]
    return secondToLastLetterOfUrl // return the second to last number from the url property of a film object
}

export function removeChildren(container) {
let element = document.getElementById('top')
while (element.firstChild) {
element.removeChild(element.firstChild)
}
} */

populateDOM(people)