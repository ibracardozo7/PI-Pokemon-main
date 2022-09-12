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
    dispatch(getNamePokemons(name));
    setName("");
}

return (
    <div className={style.search}>
        <input className={style.input} type="text" placeholder="buscar..." onChange={(e) => {handleInputChange(e)}} />
        <button className={style.button} type="submit" onClick={(e) => {handleSubmit(e)}} >Buscar Pokemon</button>
    </div>
)


}
