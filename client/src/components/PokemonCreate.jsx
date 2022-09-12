import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemons } from "../actions";
// import style from "./PokemonCreate.module.css"

export default function PokemonCreate () {

const dispatch = useDispatch()
const types = useSelector((state) => state.types)
// console.log(types)

const [input, setInput] = useState({
    name: null,
    life: null,
    attack: null,
    defense: null,
    speed: null,
    height: null,
    weight: null,
    image: null,
    types: []
})

useEffect(() => {
    dispatch(getTypes())
    dispatch(getPokemons())
},[])

function handleChange (e) {
    e.preventDefault()
    setInput({
        ...input,
        [e.target.name]: e.target.value
    }
    )
    // console.log(input)
}

function handleCheck (e) {
    if (e.target.checked){
        setInput({
            ...input,
            types: e.target.value
        })
    }
}

function handleSubmit (e) {
    e.preventDefault()
    console.log(input)
    dispatch(postPokemon(input))
    alert("Pokemon Creado")
    setInput({
        name: null,
        life: null,
        attack: null,
        defense: null,
        speed: null,
        height: null,
        weight: null,
        image: null,
        types: []
    })
}

return (
    <div>
        <Link to="/home">
            <button>Volver a Home</button>
        </Link>
        <h1>Create Pokemon</h1>
        <form>
            <div>
                <label>Name:</label>
                <input type="text" value={input.name} name="name" onChange={(e) => {handleChange(e)}} />
            </div>
            <div>
                <label>Life:</label>
                <input type="number" value={input.life} min="1" name="life" onChange={(e) => {handleChange(e)}} />
            </div>
            <div>
                <label>Attack:</label>
                <input type="number" value={input.attack} min="1" name="attack" onChange={(e) => {handleChange(e)}} />
            </div>
            <div>
                <label>Defense:</label>
                <input type="number" value={input.defense} min="1" name="defense" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
                <label>Speed:</label>
                <input type="number" value={input.speed} min="1" name="speed" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
                <label>Height:</label>
                <input type="number" value={input.height} min="1" name="height" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
                <label>Weight:</label>
                <input type="number" value={input.weight} min="1" name="weight" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
                <label>Image:</label>
                <input type="text" value={input.image} name="image" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div>
                <label>Types:</label>
                
                    {
                    types?.map((e) => ( 
                        <div key={e.id} >
                            {e.name}
                            <input type="checkbox" value={input.types} name={e.name} onChange={(e)=>{handleCheck(e)}}></input>
                            </div>
                    ))
                    }
                
            </div>
            <button type="submit" onClick={(e) => {handleSubmit(e)}} >Crear Pokemon</button>
            
        </form>
    </div>
)


}