import {films} from '../Data/films.js'
import { getLastNumber } from '../utils/index.js'

console.log(films[0].url)

/* function getLastNumber(url){
    const secondToLastLetterOfUrl = url[url.length - 2]
    return secondToLastLetterOfUrl // return the second to last number from the url property of a film object
} */

// first get a reference to the main element with the id "filmList" and store it in a variable
let filmList = document.querySelector('#filmList')

// for (initialize variable; condition check; increment Variable)
for (let i = 0; i < films.length; i++) {
// second use the document.createElement method/function to create a new img element

let figure = document.createElement('figure')
let figImage = document.createElement('img') 
let figCaption = document.createElement('figcaption')

// third, set the source property of the new img element to a valid URL or path.

let filmNum = getLastNumber(films[i].url)
figImage.src = `https://starwars-visualguide.com/assets/img/films/${filmNum}.jpg`
figCaption.textContent = films[i].title

// fourth, add the newly created img as a child to the main element
figure.appendChild(figImage)
figure.appendChild(figCaption)

filmList.appendChild(figure)

}

