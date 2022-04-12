const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      return await result.json()
    } catch (error) {
      console.error(error)
    }
  }

const pokeGrid = document.querySelector('.pokeGrid')


  async function loadPokemon(offset = 0, limit = 25) {
  const data = await getAPIData(`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}}`)
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
const pokeFront = document.createElement( 'figure' )
pokeFront.className = 'cardFace Front' 
const pokeImg = document.createElement( 'img' )
pokeImg.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${pokemon.id}.png`
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


return pokeBack
}

loadPokemon(800, 300)