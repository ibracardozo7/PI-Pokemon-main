import axios from "axios";

export function getPokemons() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons")
        return dispatch({
            type: "GET_POKEMONS",
            payload: json.data
        })
    }
}

export function getNamePokemons (name) {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons?name=" + name)
        return dispatch({
            type: "GET_NAME_POKEMONS",
            payload: json.data
        })
    }
}

export function getTypes() {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/types")
        return dispatch({
            type: "GET_TYPES",
            payload: json.data
        })
    }
}

export function postPokemon (payload) {
    return async function (dispatch) {
        let json = await axios.post("http://localhost:3001/pokemons", payload)
        console.log(json)
        return json
    }
}

export function detailPokemon (id) {
    return async function (dispatch) {
        let json = await axios.get("http://localhost:3001/pokemons/" + id)
        // console.log(json)
        return dispatch({
            type: "GET_DETAILS",
            payload: json.data[0]
        })
    }
}

export function filterByType (payload) {
    return {
        type: "FILTER_BY_TYPES",
        payload
    }
}

export function filterByCreate (payload) {
    return {
        type: "FILTER_BY_CREATE",
        payload
    }
}

export function orderByName (payload) {
    return {
        type: "ORDER_BY_NAME",
        payload
    }
}

export function orderByAttack (payload) {
    return {
        type: "ORDER_BY_ATTACK",
        payload
    }
}