import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { detailPokemon } from "../../actions";
import {Link} from "react-router-dom"
import style from "./PokemonDetail.module.css"
import loading from "../../img/pokeball-800x600.gif"

export default function PokemonDetail (props) {

const [detail, setDetail] = useState(null)

const dispatch = useDispatch()

useEffect(() => {
    dispatch(detailPokemon(props.match.params.id))
    .then((data) => {
        setDetail(data.payload)
        console.log("-----------------------",data.payload)
    })
},[])

return (
    <div >
        <div className={style.containerNav}>
            <Link to="/home" >
                <button className={style.boton}>Volver</button>
            </Link>
        </div>
        {
            detail ?
            <div className={style.containerMain} >
            <div className={style.mainComponent}>
                {/* <img className={style.imageBackOne} src={detail.image} /> */}
                <div className={style.container}>
                    <h2 className={style.nameDetail} >{detail.name}</h2>
                    <img className={style.image} src={detail.image} alt="Error" />
                    <div className={style.stat} >
                        <div className={style.label} >Types:</div>
                        <div className={style.losTipos}>
                            {detail.types?.map(e => {
                                return(
                                    <h4 className={style.labelTypes} key={e}>{e}</h4>
                                )
                            })}
                        </div>
                    </div>
                    <div className={style.stat} >
                        <label className={style.label} >Life: </label>
                        <div className={style.statValue} >{detail.life}</div>
                    </div>
                    <div className={style.stat} >
                        <label className={style.label} >Attack: </label>
                        <div className={style.statValue} >{detail.attack}</div>
                    </div>
                    <div className={style.stat} >
                        <label className={style.label} >Defense: </label>
                        <div className={style.statValue} >{detail.defense}</div>
                    </div>
                    <div className={style.stat} >
                        <label className={style.label} >Speed: </label>
                        <div className={style.statValue} >{detail.speed}</div>
                    </div>
                    <div className={style.stat} >
                        <label className={style.label} >Height: </label>
                        <div className={style.statValue} >{detail.height}</div>
                    </div>
                    <div className={style.stat}>
                        <label className={style.label} >Weight: </label>
                        <div className={style.statValue} >{detail.weight}</div>
                    </div>
                    
                </div>
            </div>
            </div>  
            
            :
            
            <div >
                <img src={loading} alt="Error" />
            </div>             
        }
    </div>
)

}