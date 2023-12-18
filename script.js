//URL para API para obter dados do Pokémon
const urlAPI = ' https://pokeapi.co/api/v2/pokemon'

// Elemento HTML onde o conteúdo do Pokémon será exibio
const pokemonElement = document.querySelector('.pokemon')

// Função para gerar um ID aleatório entre 1 a 905 (número total de pokémons na API)
const randonId = () => Math.floor(Math.random() * 905)

//Função para extrair nomes das habilidades de um pokemon. 
const getAbilities = (abilities) => abilities.map(item => item.ability.name)

//função para criar uma lista de habilidade em formato de marcadores HTML
const createAbilities = (abilities) => abilities.reduce((acc, item) => acc += `<li>${item}</li>`, '')

//Função para criar o conteúdo HTML de um Pokémon com base nos dados fornecidos 
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

//Função para obter dados de um Pokémon de API
const getPokemon = () =>
    fetch(`${urlAPI}/${randonId()}`)
        .then(response => response.json())
        .then(({name, abilities, ...pokemon}) => {

            //Obtenção da URL da imagem do Pokémon
            const pokemonImage = pokemon.sprites.other.dream_world.front_default

            //Criação de um objeto com os dados selecionados Pokémon
            const pokemonSelected = {
                name: name,
                image: pokemonImage ? pokemonImage : './assets/025.png' ,
                abilities: getAbilities(abilities)
            }

            //Chamada da função para criar e exibir o Pokémon na página
            createPokemon(pokemonSelected);

            console.log(createAbilities(pokemonSelected.abilities));
        })

//Chamada inicial para obter um Pokémon quando a página carrega. 
getPokemon();
