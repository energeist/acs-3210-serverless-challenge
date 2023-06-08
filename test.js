const typesList = [
    "normal",
    "fire",
    "water",
    "grass",
    "electric",
    "ice",
    "fighting",
    "poison",
    "ground",
    "flying",
    "psychic",
    "bug",
    "rock",
    "ghost",
    "dark",
    "dragon",
    "steel",
    "fairy"
  ]

console.log(typesList.includes("fire"))
console.log(!typesList.includes("fire"))
console.log(!typesList.includes("not fire"))
const pokemonType = "doggy"
if (!typesList.includes(pokemonType)) {
  console.log(`"pokemonType" was ${pokemonType} but must be one of: ${typesList}`)
} else {
  console.log(pokemonType)  
}