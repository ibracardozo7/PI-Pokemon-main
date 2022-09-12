const { Router } = require('express');
const axios = require("axios");
const {Pokemons, Types} = require("../db")
// const { type } = require('pg');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
const pokemonsApiInfo = async () => {
    const pokeApi = await axios.get("https://pokeapi.co/api/v2/pokemon?limit=40")
    const pokedetail = pokeApi.data.results.map(e => axios.get(e.url))
    let pokeApiFinal = await Promise.all(pokedetail).then((url) => {
        let pokemon = url.map(e => e.data)
        let pokeApiMap = pokemon.map(e => {
            return {
                id: e.id,
                name: e.name,
                life: e.stats[0].base_stat,
                attack: e.stats[1].base_stat,
                defense: e.stats[2].base_stat,
                speed: e.stats[5].base_stat,
                height: e.height,
                weight: e.weight,
                image: e.sprites.other.dream_world.front_default,
                types: e.types.map(e => e.type.name)
            }
        })
        return pokeApiMap
    })
    return pokeApiFinal
}

const pokemonsDbInfo = async () => {
    const pokeBd = await Pokemons.findAll({
        include: {
            model: Types,
            attributes: ["name"],
            through: {
                attributes: [],
            }
        }
    })
    const pokeBdFinal = pokeBd.map(e => {
        return {
            id: e.id,
            name: e.name,
            life: e.life,
            attack: e.attack,
            defense: e.defense,
            speed: e.speed,
            height: e.height,
            weight: e.weight,
            image: e.image,
            types: e.types.map(e => e.name),
            created : e.created
        }
    })
    return pokeBdFinal;
}

const allPokemons = async () => {
    const apiInfo = await pokemonsApiInfo();
    const dbInfo = await pokemonsDbInfo();
    const infoTotal = apiInfo.concat(dbInfo);
    return infoTotal;
} 

router.get("/pokemons",async (req, res) => {
    let {name} = req.query
    let pokemonsTotal = await allPokemons()
    if (name) {
        let pokemonsName = await pokemonsTotal.filter(e => e.name.toLowerCase() === name.toLowerCase())

        pokemonsName.length ? res.status(200).send(pokemonsName) :
        res.status(404).send("Pokemon no econtrado")
    } else {
        res.status(200).send(pokemonsTotal)
    }
})


router.get("/pokemons/:id",async (req, res) => {

    let {id} = req.params
    const pokemonsId = await allPokemons()
    if (id) {
        let pokeId = await pokemonsId.filter(e => e.id == id)
        pokeId.length ? 
        res.send(pokeId) :
        res.status(404).send("Pokemon no encontrado")
    }
})

router.get("/types",async (req, res) => {
    let typeApi = await axios.get("https://pokeapi.co/api/v2/type")
    let typeDetail = typeApi.data.results.map(e => {
        return {
            name: e.name
        }
    })
    console.log(typeDetail)
    typeDetail.forEach(e => {
        Types.findOrCreate({
            where: {
                name: e.name
            }
        })
    });

    const allType = await Types.findAll();
    res.send(allType);

})

router.post("/pokemons",async (req, res) => {
    console.log(req.body)
    let {
        name, 
        life, 
        attack, 
        defense, 
        speed, 
        height, 
        weight, 
        image, 
        types 
    } = req.body

    const pokemonNew = await Pokemons.create({
            name,
            life, 
            attack, 
            defense, 
            speed, 
            height, 
            weight, 
            image
    
    })
    // console.log(Pokemon.findAll())
    // console.log(pokemonNew)
    // console.log(Type.findAll())

    let typeDb = await Types.findAll({
            where: {
                name: types
            }
        })

        // console.log("---> ",typeDb)
    await pokemonNew.addTypes(typeDb);

    res.send("Pokemon creado correctamente...")
})


module.exports = router;

