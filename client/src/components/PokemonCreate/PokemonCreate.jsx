import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postPokemon, getTypes, getPokemons } from "../../actions";
import style from "./PokemonCreate.module.css"

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
    // e.preventDefault()
    setInput({
        ...input,
        [e.target.name]: e.target.value 
    })
    console.log(input)
}

function handleSelect (e) {
    if (e.target.value) {
        setInput({
            ...input,
            types: [...input.types, e.target.value]
        })
    }
    if (input.types.includes(e.target.value)) {
        return setInput({
            ...input
        })
    }
    if (input.types.length < 2) {
        return setInput({
            ...input,
            types: [...input.types, e.target.value]
        });
    }
    alert('Your Pokemon cannot have more than 2 types!')
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

function loadAgain(){
    window.location.reload()
}

return (
    <div className={style.container}>
        
        <h1 className={style.title}>Create Pokemon</h1>
        <div className={style.containerDiv}>
        <form className={style.pkmForm} onSubmit={(e) => {handleSubmit(e)}}>
            <div className={style.inputDiv}>
                <label className={style.label} >Name:</label>
                <input className={style.input} type="text" value={input.name} name="name" onChange={(e) => {handleChange(e)}} />
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Life:</label>
                <input className={style.input} type="number" value={input.life} min="1" name="life" onChange={(e) => {handleChange(e)}} />
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Attack:</label>
                <input className={style.input} type="number" value={input.attack} min="1" name="attack" onChange={(e) => {handleChange(e)}} />
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Defense:</label>
                <input className={style.input} type="number" value={input.defense} min="1" name="defense" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Speed:</label>
                <input className={style.input} type="number" value={input.speed} min="1" name="speed" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Height:</label>
                <input className={style.input} type="number" value={input.height} min="1" name="height" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Weight:</label>
                <input className={style.input} type="number" value={input.weight} min="1" name="weight" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Image:</label>
                <input className={style.input} type="text" value={input.image} name="image" onChange={(e) => {handleChange(e)}}/>
            </div>
            <div className={style.inputDiv}>
                <label className={style.label}>Select Types:</label>
                <select className={style.inputTypes} onChange={(e) => {handleSelect(e)}}>
                    {
                        types?.map((e) => 
                            <option className={style.optionType} key={e.name} value={e.types} >{e.name}</option>
                    )
                    }
                </select>
            </div>
            <div className={style.containerDiv}>
                <button className={style.button} type="submit" onClick={(e) => {loadAgain(e)}} >Crear Pokemon</button>
                <Link to="/home">
                    <button className={style.button}>Volver a Home</button>
                </Link>   
            </div>
        </form>

        <div className={style.theOthers}>
            <label className={style.labelSel}>Types:</label>
            {
            input.types.length ?
            input.types.map(e => {
                return (
                    <div className={style.selectedTypes} key={e}>
                        <h4 className={style.type}>{e}</h4>
                    </div>
                )
            }) :
            <div className={style.placeholder}>No hay tipos seleccionados</div>
            }
        </div>
        </div>
    </div>
)

}