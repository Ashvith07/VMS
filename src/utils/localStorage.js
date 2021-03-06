export function saveTolocalStorage(state) {
    try {
        const serializedState = JSON.stringify(state)
        sessionStorage.setItem('state',serializedState)
    } catch (err) {
        console.log(err);
        
    }
}

export function loadFromLocalStorage() {
    try {
        const serializedState = sessionStorage.getItem('state')
        if (serializedState === null ) return undefined
        return JSON.parse(serializedState)
    } catch (error) {
        console.log(error);
        return undefined
    }
}