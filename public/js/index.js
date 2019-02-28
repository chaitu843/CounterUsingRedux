import '../../public/css/index.css';
import { createStore } from 'redux';
import $ from 'jquery';
import uniqid from 'uniqid';

let currentState = [
    {
        id: uniqid(),
        value: 0
    }
]

let min = 1,
    max = 3;

const counter = (state = currentState, action) => {
    switch (action.type) {
        case "INCREMENT":
            return state.map(counter => {
                if (counter.id != action.id) return counter;
                else if (counter.value == "10") return counter;
                return {
                    ...counter,
                    "value": counter.value + 1
                }
            })
        case "DECREMENT":
            return state.map(counter => {
                if (counter.id != action.id) return counter;
                else if (counter.value == "0") return counter;
                return {
                    ...counter,
                    "value": counter.value - 1
                }
            })
        case "RESET":
            return state.map(counter => {
                if (counter.id != action.id) return counter;
                return {
                    ...counter,
                    "value": 0
                }
            })
        case "ADD_COUNTER":
            let length = state.length;
            if(length===max) return state;
            return [
                ...state,
                {
                    id: uniqid(),
                    value: 0
                }
            ]
        case "DELETE_COUNTER":
            length = state.length;
            if(length===1) return state;
            return state.filter((counter)=>counter.id!=action.id);
        default:
            return state;
    }
}

let store = createStore(counter);

$('.counters').on('click','.increment', (e) => {
    store.dispatch({
        "type": "INCREMENT",
        "id": e.target.parentElement.parentElement.id
    })
})

$('.counters').on('click','.decrement', (e) => {
    store.dispatch({
        "type": "DECREMENT",
        "id": e.target.parentElement.parentElement.id
    })
})

$('.counters').on('click','.reset', (e) => {
    store.dispatch({
        "type": "RESET",
        "id" : e.target.parentElement.parentElement.id
    })
})

$('.counters').on('click','.delete', (e) => {
    store.dispatch({
        "type": "DELETE_COUNTER",
        "id" : e.target.parentElement.parentElement.id
    })
})

$('.add').on('click',() => {
    store.dispatch({
        "type": "ADD_COUNTER",
    })
})

store.subscribe(() => {
    let html=``;
    store.getState().forEach(counter => {
        html += `<div class="counter" id="${counter.id}">
        <span class="value">${counter.value}</span>
        <div class="buttonContainer">
            <button class="increment">&plus;</button>
            <button class="decrement">&minus;</button>
            <button class="reset">RESET</button>
            <button class="delete">&#9986;</button>
        </div>
    </div>`;
    });
    $('.counters').html(html);
})

$('.counters').append(`<div class="counter" id="${currentState[0].id}">
<span class="value">${currentState[0].value}</span>
<div class="buttonContainer">
    <button class="increment">&plus;</button>
    <button class="decrement">&minus;</button>
    <button class="reset">RESET</button>
    <button class="delete">&#9986;</button>
</div>
</div>`);

// In MutlipleCounter Branch