import '../../public/css/index.css';
import {createStore} from 'redux';
import $ from 'jquery';

const counter = (state = 0, action) => {
    switch(action.type){
        case "INCREMENT":
            if(state==10) return state;
            return state+1;
        case "DECREMENT":
            if(state==0) return state;
            return state-1;
        case "RESET":
            return 0;
        default:
            return state;
    }
}

let store = createStore(counter);
$('.value').html(store.getState());

$('.increment').click(() => {
    store.dispatch({
        "type":"INCREMENT"
    })
})

$('.decrement').click(() => {
    store.dispatch({
        "type":"DECREMENT"
    })
})

$('.reset').click(() => {
    store.dispatch({
        "type":"RESET"
    })
})

store.subscribe(() => {
    $('.value').html(store.getState())
})