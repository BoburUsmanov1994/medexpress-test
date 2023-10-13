import {find,get} from "lodash"
export const getDefaultValue = (options, id) => {
    return find(options, (option) => get(option, 'value') == id)
}