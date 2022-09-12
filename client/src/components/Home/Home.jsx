import React, { useState, useEffect } from "react";
import { useDispatch , useSelector} from "react-redux";
import { Link } from "react-router-dom";
import { getPokemons, getTypes, filterByType, filterByCreate, orderByName, orderByAttack} from "../../actions"
import Card from "../Card"
import Paginado from "../Paginado";
import SearchBar from "../SearchBar/SearchBar";
import PokemonCreate from "../PokemonCreate";
// import Nav from "../Nav"
import style from "./Home.module.css"
import loading from "../../img/pokeball-800x600.gif"

export default function Home () {

const [home, setHome] = useState(null)
const dispatch= useDispatch()
const allPokemons = useSelector((state) => state.pokemons)
const allTypes = useSelector((state) => state.types)
console.log(allTypes)

const [orden, setOrden] = useState("")
const [currentPage, setCurrentPage] = useState(1);
const [pokemonsPerPage, setPokemonsPerPage] = useState(12);
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

function handleClick (e) {
    e.preventDefault();
    dispatch(getPokemons());
    console.log("-----------",getPokemons())
}

function handleTypes (e) {
    dispatch(filterByType(e.target.value))
}

function handleCreate (e) {
    dispatch(filterByCreate(e.target.value))

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
<div>
    <div className={style.container}>
        {/* <Nav /> */}
        <Link to="/pokemon" >Crear Pokemons</Link>
        <h1>Pokemons</h1>
        <button onClick={e => handleClick(e)}>
            Volver a cargar todos los pokemons
        </button>
        <div>
            <select onChange={(e) => {handleTypes(e)}}>
                <option value="All">Todos</option>
                {
                    allTypes?.map(e => (
                        <option value={e.name} key={e.name}>{e.name}</option>
                    ))
                }
            </select>
            <select onChange={(e) => {handleSort(e)}}>
                <option value="asc">Ascendente</option>
                <option value="desc">Descendiente</option>
                
            </select>
            <select onChange={(e) => {handleAttack(e)}}>
            <option value="asc">Attack Menor</option>
            <option value="desc">Attack Mayor</option>
            </select>
            <select onChange={(e) => {handleCreate(e)}}>
                <option value="All">Todos</option>
                <option value="created">Creados</option>
                <option value="api">Existentes</option>
            </select>
        </div>
            <SearchBar />
    </div>

    {
        home ?
    <div>
        <div>
        <Paginado pokemonsPerPage={pokemonsPerPage} allPokemons={allPokemons.length} paginado={paginado} />
        {
            currentPokemons?.length ?
            currentPokemons.map(e => {
                return(
                    <Card key={e.id} id={e.id} name={e.name} image={e.image} types={e.types} />
                    )
                }) :
                <div>Pokemons no encontrado</div>
            }
        </div>
    </div> :
            
        <div>
            <img src={loading} />
         </div>

    }  
         
 </div>
 )
}