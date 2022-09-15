const initialState = {
    pokemons: [],
    allPokemons: [],
    types: [],
    detail: {}
}

function rootReducer (state = initialState, action) {
    switch (action.type) {

        case "GET_POKEMONS":
            return {
                ...state,
                pokemons: action.payload,
                allPokemons: action.payload
            }

        case "GET_NAME_POKEMONS":
            return {
                ...state,
                pokemons: action.payload
            }

        case "POST_POKEMON":
            return {
                ...state
            }

        case "GET_TYPES":
            return {
                ...state,
                types: action.payload
            }

        case "GET_DETAILS":
            return {
                ...state,
                detail: action.payload
            }

        case "FILTER_BY_TYPES":
            const allTypes = state.allPokemons;
            // console.log("-----------asd",allTypes)
            const filterFinal = action.payload === "All" ? allTypes : allTypes.filter(e => e.types.includes(action.payload))
            return {
                ...state,
                pokemons: filterFinal
            }

        case "FILTER_BY_CREATE":
            const allCreate = state.allPokemons;
            const filterCreate = action.payload === "created" ? allCreate.filter(e => e.created) : allCreate.filter(e => !e.created)
            return {
                ...state,
                pokemons: action.payload === "All" ? state.allPokemons : filterCreate
            }

        case "ORDER_BY_NAME":
                const orderAll = action.payload === "asc" ? 
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return 1;
                    }
                    if (b.name > a.name) {
                        return -1;
                    }
                    return 0
                }) :
                state.pokemons.sort(function (a, b) {
                    if (a.name > b.name) {
                        return -1;
                    }
                    if (b.name > a.name) {
                        return 1;
                    }
                    return 0
                })
                return {
                    ...state,
                    pokemons: orderAll
                }
                
        case "ORDER_BY_ATTACK":
        const orderAttack = action.payload === "asc" ? 
        state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
                return 1;
            }
            if (b.attack > a.attack) {
                return -1;
            }
            return 0
        }) :
        state.pokemons.sort(function (a, b) {
            if (a.attack > b.attack) {
                return -1;
            }
            if (b.attack > a.attack) {
                return 1;
            }
            return 0
        })
        return {
            ...state,
            pokemons: orderAttack
        }

        


        default:
            return state
    }
}

export default rootReducer;