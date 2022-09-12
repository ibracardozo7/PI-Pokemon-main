import React from "react";
import { Link } from "react-router-dom";

export default function Card({id, name, image, types}){
    return (
        <div>
            <h3>{name}</h3>
            <Link to={`/pokemon/${id}`}>
            <img src={image} />
            </Link>
            <h5>{types}</h5>
        </div>
    )
}