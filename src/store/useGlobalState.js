import {useState} from 'react'
import { data as dataArray } from '../data/dummyData'


export const useGlobalState = () => {
    const [state, setState] = useState({value: false , list: [], choice: dataArray[1], pos: 0})

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