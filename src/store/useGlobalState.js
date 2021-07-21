import {useState} from 'react'


export const useGlobalState = () => {
    const [state, setState] = useState({value: false , list: [], choice: {} })

    const actions = (action) => {
        const {type, payload} = action;
        switch (type) {
            case 'setState' :
                return setState(payload)
            default :
                return state
        }
    }
    return {state, actions}
}