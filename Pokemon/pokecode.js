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
      ;(this.id = 9001),
      (this.name = name),
      (this.height = height),
      (this.weight = weight),
      (this.abilities = abilities),
      (this.types = types)
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
    makeAbilitiesArray(pokeAbilities), 
    makeTypesArray(pokeTypes),
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

  const loadedPokemon = []

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
console.log(pokeType,pokeType2)
pokeFront.style.setProperty('background', getPokeTypeColor(pokeType))
//pokeBack.style.setProperty('background', getPokeTypeColor(pokeType))

if(pokeType2) {
    pokeFront.style.setProperty('background', `linear-gradient(${getPokeTypeColor(pokeType)}, ${getPokeTypeColor(pokeType2)})`)
  } 

const pokeImg = document.createElement('img')
if (pokemon.id === 9001) {
  pokeImg.src = ''
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
 // pokeBack.style.setProperty('background', getPokeTypeColor(pokeType))

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
      color = '#A50104'
      break
    case 'water':
      color = '#0075A2'
      break
    case 'bug':
      color = '#A1C349'
      break
    case 'normal':
      color = '#CCC9A1'
      break
    case 'flying':
      color = '#00FFFF'
      break
    case 'poison':
      color = '#CD9FCC'
      break
    case 'electric':
      color = '#F4E04D'
      break
    case 'psychic':
      color = '#FFB7C3'
      break
    case 'ground':
      color = '#F0A868'
      break
    default:
      color = '#DED6D1'
  }
  return color
}

function filterPokemonByType(type) {
return loadedPokemon.filter((pokemon) => pokemon.types[0].type.name === type)
}

await loadPokemon(0, 150)
