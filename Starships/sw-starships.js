import { starships } from "../Data/starships.js"
import { removeChildren, getLastNumber } from "../utils/index.js"

const nav = document.querySelector('.nav')
const navList = document.querySelector('.navList')
const shipViewer =  document.querySelector('.shipViewer')

const modal = document.querySelector('.modal')
const closeButton = document.querySelector('.modal-close')
const shipMessage = document.querySelector('.box p')
const closeBack = document.querySelector('.modal-background')

closeButton.addEventListener('click', () => modal.classList.toggle ('is-active'))
closeBack.addEventListener('click', () => modal.classList.toggle ('is-active'))

function populateNav() {
starships.forEach((starship) => {
const listItem = document.createElement('li')

const anchor = document.createElement('a')
anchor.href = '#'
anchor.textContent = starship.name
anchor.addEventListener('click', () => populateShipView(starship))

listItem.appendChild(anchor)
navList.appendChild(listItem)
})

}

populateNav()

function populateShipView(shipData) {
removeChildren(shipViewer)

const shipImage = document.createElement('img')
let shipNum = getLastNumber(shipData.url)
shipImage.src = `https://starwars-visualguide.com/assets/img/starships/${shipNum}.jpg`
shipImage.addEventListener('error', () => {
 console.log("Image Error!")
 shipImage.hidden = true
shipMessage.textContent = `The ship known as ${shipData.name} is currently in space port for repairs.`
modal.classList.toggle ('is-active')
})


shipViewer.appendChild(shipImage)

}

