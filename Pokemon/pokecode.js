const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

  class Pokemon {
    constructor(name, height, weight, abilities, types) {
      this.id = 9001,
      this.name = name,
      this.height = height,
      this.weight = weight,
      this.abilities = abilities,
      this.types = types
    }
  }


const pokeHeader = document.querySelector('header')
const pokeGrid = document.querySelector('.pokeGrid')
const newButton = document.createElement('button')
newButton.textContent = 'New Pokemon'
pokeHeader.appendChild(newButton)
newButton.addEventListener('click', () => {
  const pokeName = prompt('What is the name of your nem Pokemon?', 'Asherz')
  const pokeHeight = prompt('What is the height of your Pokemon?', '2ft')
  const pokeWeight = prompt('How much does your Pokemon weigh?', 300)
  const pokeAbilities = prompt("What are your Pokemon's abilities? (use a comma separated list)")
const pokeTypes = prompt('What type(s) is your Pokemon? (up to 2 types separated by a space)')

  const newPokemon = new Pokemon(
    pokeName, 
    pokeHeight, 
    pokeWeight, 
    makeAbilityArray(pokeAbilities), 
    makeTypeArray(pokeTypes))

  populatePokeCard(newPokemon)
})


function makeAbilityArray(commaString) { // example of comma string 'run-away, lazor beam'
return commaString.split(',').map((abilityName) => {
  return { ability: { name: abilityName } }
})
}

function makeTypeArray(spacedString) { // example of spaced string 'fairy flying'
  return spacedString.split(' ').map((typeName) => {
    return { type: { name: typeName } }
  })
  }

  async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`)
  for (const nameAndURL of data.results) {
    const singlePokemon = await getAPIData(nameAndURL.url)
    populatePokeCard(singlePokemon)
  }
}

function populatePokeCard(pokemon) {
const pokeScene = document.createElement( 'div' )
pokeScene.className = 'scene'
const pokeCard = document.createElement( 'div' )
pokeCard.className = 'card'
pokeCard.addEventListener('click', () => pokeCard.classList.toggle('is-flipped'))
// populate the front of the card
pokeCard.appendChild(populateCardFront(pokemon))
pokeCard.appendChild(populateCardBack(pokemon))
pokeScene.appendChild(pokeCard)
pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
  pokemon
const pokeFront = document.createElement( 'figure' )
pokeFront.className = 'cardFace Front' 
const pokeImg = document.createElement( 'img' )
if (pokemon.id === 9001) {
  pokeImg.src = '/ImagesP/pball.png'
} else {
pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
}
const pokeCaption = document.createElement( 'figcaption' )
pokeCaption.textContent = pokemon.name

pokeFront.appendChild(pokeImg)
pokeFront.appendChild(pokeCaption)
return pokeFront
}

function populateCardBack(pokemon){
const pokeBack = document.createElement('div')
pokeBack.className = 'cardFace Back'
const label = document.createElement('h4')
label.textContent = 'Abilities'
pokeBack.appendChild(label)

const abilityList = document.createElement('ul')
pokemon.abilities.forEach((abilityItem) => {
  const listItem = document.createElement('li')
  listItem.textContent = abilityItem.ability.name
  abilityList.appendChild(listItem)
})
pokeBack.appendChild(abilityList)

return pokeBack
}

loadPokemon(0, 200)