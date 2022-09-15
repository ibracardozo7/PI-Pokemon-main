import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes, filterByType, filterByCreate, orderByName, orderByAttack} from "../../actions"
import Card from "../PokemonCard/PokemonCard"
import Paginado from "../Paginado/Paginado";
import SearchBar from "../SearchBar/SearchBar";
import style from "./Home.module.css"
import loading from "../../img/pokeball-800x600.gif"

export default function Home () {

const [home, setHome] = useState(null)
const dispatch= useDispatch()
const allPokemons = useSelector((state) => state.pokemons)
const allTypes = useSelector((state) => state.types)
// console.log(allTypes)

const [orden, setOrden] = useState("")
const [currentPage, setCurrentPage] = useState(1);
const pokemonsPerPage = 12;
const indexOfLastPokemon = currentPage * pokemonsPerPage;  // 12
const indexOfFirstPokemon = indexOfLastPokemon - pokemonsPerPage;
const currentPokemons = allPokemons.slice(indexOfFirstPokemon, indexOfLastPokemon)

const paginado = (pageNumber) => {
    setCurrentPage(pageNumber)
}

useEffect (() => {
    dispatch(getTypes())
    dispatch(getPokemons())
    .then((rpta) => {
        setHome(rpta.payload)
    })
},[])

function loadAgain(){
    window.location.reload()
}

function handleTypes (e) {
    dispatch(filterByType(e.target.value))
    setCurrentPage(1)
    // setOrden(`Ordenado ${e.target.value}`)
}

function handleCreate (e) {
    dispatch(filterByCreate(e.target.value))
    setCurrentPage(1)
    // setOrden(`Ordenado ${e.target.value}`)

}

function handleSort (e) {
    e.preventDefault()
    dispatch(orderByName(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

function handleAttack (e) {
    e.preventDefault()
    dispatch(orderByAttack(e.target.value))
    setCurrentPage(1);
    setOrden(`Ordenado ${e.target.value}`)
}

return(
<div >
    <div className={style.container}>
        <Link to="/pokemon" >
            <button className={style.botones} >Crear Pokemon</button>
        </Link>
        <button className={style.botones} onClick={e => loadAgain(e)}>
            Volver a cargar
        </button>
        <div>
            <select className={style.botoneSelect} onChange={(e) => {handleTypes(e)}}>
                <option value="All">Types...</option>
                {
                    allTypes?.map(e => (
                        <option value={e.name} key={e.name}>{e.name}</option>
                    ))
                }
            </select>
            <select className={style.botoneSelect} onChange={(e) => {handleSort(e)}}>
                <option value="asc"> A - Z </option>
                <option value="desc"> Z - A </option>
                
            </select>
            <select className={style.botoneSelect} onChange={(e) => {handleAttack(e)}}>
            <option value="asc">Attack Menor</option>
            <option value="desc">Attack Mayor</option>
            </select>
            <select className={style.botoneSelect} onChange={(e) => {handleCreate(e)}}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
        </div>
            <SearchBar />
    </div>

    {
        home ?
    <div className={style.containerMain}>
        <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
        <div className={style.allCards}>
        {
            currentPokemons?.length ?
            currentPokemons.map(e => {
                return(
                    <Card key={e.id} id={e.id} name={e.name} image={e.image} types={e.types} />
                    )
                }) :
                <div className={style.error} >
                    <div className={style.pokeNot}>Pokemon no encontrado</div>
                </div>
            }
        </div>
    </div> :
            
        <div>
            <img src={loading} alt="Error"/>
         </div>

    }  
         
 </div>
 )
}