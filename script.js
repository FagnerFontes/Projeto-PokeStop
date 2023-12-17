const urlAPI = ' https://pokeapi.co/api/v2/pokemon'
const pokemonElement = document.querySelector('.pokemon')

const randonId = () => Math.floor(Math.random() * 905)

const getAbilities = (abilities) => abilities.map(item => item.ability.name)
const createAbilities = (abilities) => abilities.reduce((acc, item) => acc += `<li>${item}</li>`, '')
const createPokemon = ({image, name, abilities}) => {
    pokemonElement.innerHTML = `
        <div class="pokemon__wrapperImage">
        <img 
        src="${image}" 
        class = "pokemon_image"
        alt=" pokemon${name}">
</div>
<div class="pokemon__info">
    <h2 class="pokemon__name">${name}</h2>
    <ul class="pokemon__abilities">
        ${createAbilities(abilities)}
    </ul>
</div>
        `
}
const getPokemon = () =>
    fetch(`${urlAPI}/${randonId()}`)
        .then(response => response.json())
        .then(({name, abilities, ...pokemon}) => {
            const pokemonImage = pokemon.sprites.other.dream_world.front_default
            const pokemonSelected = {
                name: name,
                image: pokemonImage ? pokemonImage : './assets/025.png' ,
                abilities: getAbilities(abilities)
            }

            createPokemon(pokemonSelected);
            console.log(createAbilities(pokemonSelected.abilities));
        })


getPokemon();
