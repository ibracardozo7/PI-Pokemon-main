import React from "react";
import style from "./Paginado.module.css"


export default function Paginado ({pokemonsPerPage,allPokemons,paginado}) {

let pageNumbers = []

for (let i = 0; i < Math.ceil(allPokemons / pokemonsPerPage); i++) {
    pageNumbers.push(i+1)
}

return(
    <nav>
        <div>
            {
             pageNumbers?.map(number => (
                 <button className={style.boton} onClick={() => {paginado(number)}} key={number}>
                    {number}
                </button>
             ))
            }
        </div>
    </nav>
)

}