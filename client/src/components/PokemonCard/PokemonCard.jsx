import React from "react";
import { Link } from "react-router-dom";
import style from "./PokemonCard.module.css"

export default function Card({id, name, image, types}){
    return (
        <div className={style.container}>
            <h1 className={style.nameCard}>{name}</h1>
            <Link to={`/pokemon/${id}`}>
            <img className={style.imagen} src={image} alt="Error" />
            </Link>
            <div className={style.types}>
                {
                types.map(e => {
                    return (
                        <h4 key={e} className={style.type}>{e}</h4>
                    )
                })
                }
            </div>
        </div>
    )
}