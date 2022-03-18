import { people } from "../Data/people.js"

const header = document.querySelector("header")
const main = document.querySelector("main")

const allCharactersButton = document.createElement("button")
allCharactersButton.textContent = "All Characters"
allCharactersButton.addEventListener("click", function () {
  populateDOM(people)
})

// const result = words.filter(word => word.length > 6);
const maleCharacters = people.filter(person => person.gender === 'male')


const maleCharactersButton = document.createElement('button')
maleCharactersButton.textContent = "Male Characters"
maleCharactersButton.addEventListener("click", () => populateDOM(people))

header.appendChild(allCharactersButton)
header.appendChild(maleCharactersButton)

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

function getLastNumber(url){
    const secondToLastLetterOfUrl = url[url.length - 2]
    return secondToLastLetterOfUrl // return the second to last number from the url property of a film object
}

export function removeChildren(container) {
let element = document.getElementById('top')
while (element.firstChild) {
element.removeChild(element.firstChild)
}
}