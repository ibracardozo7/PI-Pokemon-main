import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getNamePokemons } from "../../actions";
import style from "./SearchBar.module.css"

export default function SearchBar () {

const dispatch = useDispatch()
const [name, setName] = useState("")

function handleInputChange (e) {
    e.preventDefault()
    setName(e.target.value)
    console.log(name)
}

function handleSubmit (e) {
    e.preventDefault()
    if (name.length === 0) {
        alert ("Pokemon no encontrado")
    }
    dispatch(getNamePokemons(name))
    document.getElementById('searchButton').value=''
}

return (
    <div className={style.search}>
        <input className={style.input} type="text" id="searchButton" placeholder="buscar..." onChange={(e) => {handleInputChange(e)}} />
        <button className={style.button} type="submit" onClick={(e) => {handleSubmit(e)}} >Buscar Pokemon</button>
    </div>
)


}
