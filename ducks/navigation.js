const ADD = 'app/navigation/ADD'

export const addNavigate = (name = '', navigate) => ({
    type: ADD,
    name,
    navigate
})

const navigation = (state = {}, action) => {
    const { type, name, navigate } = action
    switch (type) {
        case ADD:
            return {
                ...state,
                [name]: navigate
            }
        default: 
            return state
    }
}

export const getNavigate = (state, name) => state[name]? state[name] : () => {}

export default navigation