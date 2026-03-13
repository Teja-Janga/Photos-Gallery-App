export const initialState = JSON.parse(localStorage.getItem('favs')) || [];

export const favouritesReducer = (state, action) => {
    switch (action.type) {
        case 'TOGGLE':
            const isFav = state.includes(action.id);
            const newState = isFav
                ? state.filter((id) => id !== action.id)
                : [...state, action.id];
            localStorage.setItem('favs', JSON.stringify(newState));
            return newState;
        
        default:
            return state;
    }
};