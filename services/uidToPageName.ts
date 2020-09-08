import Vue from 'vue'
import { Route } from 'vue-router/types'

export default function (uid: string) {

    const words = uid.split('-')
    const conversions: { [key: string]: string } = {
        and: '&'
    }
    words.forEach((word, index) => {
        // capitalize first letter
        words[index] = word.charAt(0).toUpperCase() + word.substr(1)
        // convert key words to symbols
        if (Object.keys(conversions).includes(word)) {
            words[index] = conversions[word]
        }
    })
    return words.join(' ')

}