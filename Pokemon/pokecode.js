
const getAPIData = async (url) => {
    try {
      const result = await fetch(url)
      const data = await result.json()
    } catch (error) {
      console.error(error)
    }
  }
  
  async function loadPokemon(offset, limit) {
  const data =  await getAPIData('https://pokeapi.co/api/v2/pokemon/snorlax')
  populatePokeGrid(data)
}

function populatePokeGrid(pokemonArray){
// loop through array and populate individual pokemon cards
populatePokeCard(pokemon)
}

function populatePokeCard(pokemon){


}