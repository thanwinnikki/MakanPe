import {useState} from 'react'
import { data as dataArray } from '../data/dummyData'


export const useGlobalState = () => {
    const [state, setState] = useState({value: false , list: [], choice: dataArray[0], right:false })

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