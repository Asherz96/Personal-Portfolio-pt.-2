import { senators } from '../Data/senators.js'
import { representatives } from '../data/representatives.js'
import { removeChildren } from '../utils/index.js'

const allMembersOfCongress = [...senators, ...representatives] // modern combining of array data... like a genius!

const header = document.querySelector("header")


const seniorityHeader = document.querySelector('.seniority')
const loyaltyList = document.querySelector('.loyaltyList')
const buttonsDiv = document.querySelector('.buttonsDiv')


const femaleSenators = simplifiedSenators().filter(senators => senators.gender === 'F') 
const maleSenators = simplifiedSenators().filter(senators => senators.gender === 'M')
const democrats = simplifiedSenators().filter(senators => senators.party === 'D') 
const republicans = simplifiedSenators().filter(senators => senators.party === 'R')

const femaleSenatorsButton = document.createElement('button')
femaleSenatorsButton.textContent = "Female Senators"
femaleSenatorsButton.addEventListener("click", () => populateSenatorsDiv(femaleSenators))

const maleSenatorsButton = document.createElement('button')
maleSenatorsButton.textContent = "Male Senators"
maleSenatorsButton.addEventListener("click", () => populateSenatorsDiv(maleSenators))

const democratsButton = document.createElement('button')
democratsButton.textContent = "Democrats"
democratsButton.addEventListener("click", () => populateSenatorsDiv(democrats))

const repubilcansButton = document.createElement('button')
repubilcansButton.textContent = "Republicans"
repubilcansButton.addEventListener("click", () => populateSenatorsDiv(republicans))


buttonsDiv.appendChild(femaleSenatorsButton)
buttonsDiv.appendChild(maleSenatorsButton)
buttonsDiv.appendChild(democratsButton)
buttonsDiv.appendChild(repubilcansButton)


const senatorsDiv = document.querySelector('.senatorsDiv')
// const representativesDiv = document.querySelector('.representativesDiv')

function simplifiedSenators() {
return senators.map(senator => {
    const middleName = senator.middle_name ? ` ${senator.middle_name} ` : ` `
    return {
        id: senator.id,
        name: `${senator.first_name}${middleName}${senator.last_name}`,
        gender: senator.gender,
        party: senator.party,
        imgURL: `https://www.govtrack.us/static/legislator-photos/${senator.govtrack_id}-200px.jpeg`,
        seniority: +senator.seniority,
        state: senator.state,
        missedVotesPct: senator.missed_votes_pct,
        loyaltyPct: senator.votes_with_party_pct,
        
    }
})
}

 /* function simplifiedRepresentatives() {
  return representatives.map(representative => {
        const middleName = representative.middle_name ? ` ${representative.middle_name} ` : ` `
        return {
            id: representative.id,
            name: `${representative.first_name}${middleName}${representative.last_name}`,
            gender: representative.gender,
            party: representative.party,
            imgURL: `https://www.govtrack.us/static/legislator-photos/${representative.govtrack_id}-200px.jpeg`,
            seniority: +representative.seniority,
            state: representative.state,
            missedVotesPct: representative.missed_votes_pct,
            loyaltyPct: representative.votes_with_party_pct,
            
        }
    })
    } */

function populateSenatorsDiv(senatorsArray) { 
    removeChildren(senatorsDiv)
senatorsArray.forEach((senator) => {
    const senFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')
    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    senFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorsDiv.appendChild(senFigure)
})
}

/* 
function populateRepresentativesDiv(representativesArray) { 
    removeChildren(senatorsDiv)
representativesArray.forEach((representative) => {
    const repFigure = document.createElement('figure')
    const figImg = document.createElement('img')
    const figCaption = document.createElement('figcaption')
    figImg.src = senator.imgURL
    figCaption.textContent = senator.name

    repFigure.appendChild(figImg)
    senFigure.appendChild(figCaption)
    senatorsDiv.appendChild(repFigure)
})
}*/

populateSenatorsDiv(simplifiedSenators())
// populateRepresentativesDiv(simplifiedRepresentatives())

const mostSeniorMember = simplifiedSenators().reduce((acc, senator) => acc.seniority > senator.seniority ? acc : senator)

const biggestMissedVotesPct = simplifiedSenators().reduce((acc, senator) => acc.missedVotesPct > senator.missedVotesPct ? acc : senator)

const biggestVactionerList = simplifiedSenators().filter(senator => senator.missedVotesPct === biggestMissedVotesPct.missedVotesPct).map(senator => senator.name).join(' and ')

seniorityHeader.textContent = `The most senior Senator is ${mostSeniorMember.name} and the biggest fans of vacations are ${biggestVactionerList}.`

simplifiedSenators().forEach(senator => {
    if(senator.loyaltyPct === 100) {
      let listItem = document.createElement('li')
      listItem.textContent = senator.name
      loyaltyList.appendChild(listItem)
    }
  })



