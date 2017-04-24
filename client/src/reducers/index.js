export default (state = { term: 'hello' }, action) => {
    console.log('reducer')
    switch (action.type) {
        case 'search':
            return {
                ...state,
                term: action.payload
            }
        default: 
            return state
    }
}
