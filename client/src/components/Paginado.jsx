import React from "react";


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
                 <button className="number" onClick={() => {paginado(number)}} key={number}>
                    {number}
                </button>
             ))
            }
        </div>
    </nav>
)

}