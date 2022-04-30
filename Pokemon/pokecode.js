import {removeChildren} from '../Utils/index.js'


const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }


  class Pokemon {
    constructor(name, height, weight, abilities, types, moves, hp) {
      (this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types),
      (this.moves = moves),
      (this.hp = hp)
    }
  }

  const loadedPokemon = []

const pokeHeader = document.querySelector('header')
const pokeGrid = document.querySelector('.pokeGrid')
const pokeButtons = document.querySelector('.pokeButtons')

const loadButton = document.createElement('button')
loadButton.textContent = 'Load Pokemon'
pokeButtons.appendChild(loadButton)
loadButton.addEventListener('click', async () => {
  removeChildren(pokeGrid)
if( loadedPokemon.length === 0) {
  await loadPokemon(0, 150)
} else {
  loadedPokemon.forEach((item) => populatePokeCard(item))
}
})

const newButton = document.createElement('button')
newButton.textContent = 'New Pokemon'
pokeButtons.appendChild(newButton)
newButton.addEventListener('click', () => {
  const pokeName = prompt('What is the name of your nem Pokemon?', 'Asherz')
  const pokeHeight = prompt('What is the height of your Pokemon?', '2ft')
  const pokeWeight = prompt('How much does your Pokemon weigh?', 300)
  const pokeAbilities = prompt("What are your Pokemon's abilities? (use a comma separated list)")
const pokeTypes = prompt('What type(s) is your Pokemon? (up to 2 types separated by a space)')
const pokeMoves = prompt('What moves can your Pokemon do? (up to 3 moves separated by a - (dash))')
const pokeHP = prompt("What is your pokemon's HP?")

  const newPokemon = new Pokemon (
    pokeName, 
    pokeHeight, 
    pokeWeight, 
    makeAbilitiesArray(pokeAbilities), 
    makeTypesArray(pokeTypes),
    makeMovessArray(pokeMoves),
    pokeHP,
    )
  populatePokeCard(newPokemon)
})

function makeAbilitiesArray(commaString) { 
// example of comma string 'run-away, lazor beam'
return commaString.split(',').map((abilityName) => {
  return { ability: { name: abilityName } }
})
}

function makeTypesArray(spacedString) { 
// example of spaced string 'fairy flying'
  return spacedString.split(' ').map((typeName) => {
    return { type: { name: typeName } }
  })
  }

  function makeMovessArray(dashString) { 
    // example of dash string 'fairy-flying'
      return dashString.split('-').map((moveName) => {
        return { move: { name: moveName } }
      })
      }
    

  async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`,
  )
  for (const nameAndURL of data.results) {
    const singlePokemon = await getAPIData(nameAndURL.url)
    const simplifiedPokemon = {
      id: singlePokemon.id,
      height: singlePokemon.height,
      weight: singlePokemon.weight,
      name: singlePokemon.name,
      abilities: singlePokemon.abilities,
      types: singlePokemon.types,
      moves: singlePokemon.moves.slice(0, 3),
      hp:  singlePokemon.stats[0].base_stat
    
    }
    loadedPokemon.push(simplifiedPokemon)
    populatePokeCard(simplifiedPokemon)
  }
}

function populatePokeCard(pokemon) {
const pokeScene = document.createElement('div')
pokeScene.className = 'scene'
const pokeCard = document.createElement('div')
pokeCard.className = 'card'
pokeCard.addEventListener('click', () => 
pokeCard.classList.toggle('is-flipped'),
)
// populate the front of the card
pokeCard.appendChild(populateCardFront(pokemon))
pokeCard.appendChild(populateCardBack(pokemon))
pokeScene.appendChild(pokeCard)
pokeGrid.appendChild(pokeScene)
}

function populateCardFront(pokemon) {
const pokeFront = document.createElement('figure')
pokeFront.className = 'cardFace Front' 

const pokeType = pokemon.types[0].type.name
const pokeType2 = pokemon.types[1]?.type.name
// console.log(pokeType,pokeType2)
pokeFront.style.setProperty('background', getPokeTypeColor(pokeType))
// pokeBack.style.setProperty('background', getPokeTypeColor(pokeType))

if(pokeType2) {
    pokeFront.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(pokeType2)})`)
  } 

const pokeImg = document.createElement('img')
if (pokemon.id === 9001) {
pokeImg.src = `https://pngimg.com/uploads/pokeball/pokeball_PNG30.png`
}  else {
pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
}
const pokeCaption = document.createElement('figcaption')
pokeCaption.textContent = pokemon.name


pokeFront.appendChild(pokeImg)
pokeFront.appendChild(pokeCaption)
return pokeFront
}

function populateCardBack(pokemon) {
  
const pokeBack = document.createElement('div')
pokeBack.className = 'cardFace Back'

const labelHeight = document.createElement('h3')
labelHeight.textContent = 'Height: ' + pokemon.height
  pokeBack.appendChild(labelHeight)

const labelWeight = document.createElement('h3')
labelWeight.textContent = 'Weight: ' + pokemon.weight
  pokeBack.appendChild(labelWeight)

  const pokeHP = document.createElement('h3')
  pokeHP.textContent = `HP: ${pokemon.hp}`
  pokeBack.appendChild(pokeHP)

const abilitieslabel = document.createElement('h4')
abilitieslabel.textContent = 'Abilities'
pokeBack.appendChild(abilitieslabel)

const abilityList = document.createElement('ul')
pokemon.abilities.forEach((abilityItem) => {
  const listItem = document.createElement('li')
  listItem.textContent = abilityItem.ability.name
  abilityList.appendChild(listItem)
})
pokeBack.appendChild(abilityList)

const labelTypes = document.createElement('h4')
  labelTypes.textContent = 'Types'
  pokeBack.appendChild(labelTypes)

  const typesList = document.createElement('ul')
  pokemon.types.forEach((typesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = typesItem.type.name
    typesList.appendChild(listItem)
  })
  pokeBack.appendChild(typesList)

  const labelMoves = document.createElement('h4')
  labelMoves.textContent = 'Moves'
  pokeBack.appendChild(labelMoves)

  const movesList = document.createElement('ul')
  pokemon.moves.forEach((movesItem) => {
    const listItem = document.createElement('li')
    listItem.textContent = movesItem.move.name
    movesList.appendChild(listItem)
  })
  pokeBack.appendChild(movesList)



return pokeBack
}

function getPokeTypeColor(pokeType) {
  // if(pokeType === 'grass') return '#00FF00'
  let color
  switch (pokeType) {
    case 'grass': 
    color = '#28965A'
    break
    case 'fire':
      color = '#E57C04'
      break
    case 'water':
      color = '#0075A2'
      break
    case 'bug':
      color = '#A1C349'
      break
    case 'normal':
      color = '#C0BDA5'
      break
    case 'flying':
      color = '#5BC3EB'
      break
    case 'poison':
      color = '#AA78A6'
      break
    case 'electric':
      color = '#F4E04D'
      break
    case 'psychic':
      color = '#F4BFDB'
      break
    case 'ground':
      color = '#F0A868'
      break
      case 'fighting': 
      color = '#A22C29'
      break
      case 'rock':
        color = '#696D7D'
        break
      case 'ghost':
        color = '#FAF3DD'
        break
      case 'steel':
        color = '#2D2D2A'
        break
      case 'ice':
        color = '#BBE6E4'
        break
      case 'dragon':
        color = '#631D76'
        break
      case 'dark':
        color = '#2E2532'
        break
      case 'fairy':
        color = '#E55381'
        break
    default:
      color = '#DED6D1'
  }
  return color
}

function filterPokemonByType(type) {
return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}

const typeSelect = document.querySelector('.typeSelect')
typeSelect.addEventListener('change', (event) => {
  const usersTypeChoice = event.target.value.toLowerCase()
const pokemonByType = filterPokemonByType(usersTypeChoice)
removeChildren(pokeGrid)
pokemonByType.forEach((singlePokemon) => populatePokeCard(singlePokemon))

})


function calculateHp() {
  const mostHP = loadedPokemon().reduce((acc, pokemon) => acc.hp > pokemon.hp ? acc : pokemon, {})

const messageArea = document.querySelector('.messageArea')
messageArea.textContent = `${mostHP.name[0].toUpperCase()}${mostHP.name.substring(1)} has the most HP at ${mostHP.hp}`
 }
