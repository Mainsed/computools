import './App.css';
import React, {useState} from "react";

function App() {

    const [quiz] = useState([
        {name: 'Pick some food', answs: ['caesar salad', 'nuggets', 'burger', 'chicken sandwich']},
        {name: 'Pick a healthy choice', answs: ['fruit', 'salad', 'parfait', 'pasta salad']},
        {name: 'Pick a movie snack', answs: ['M&M’s', 'caramel popcorn', 'traditional popcorn', 'ice cream']},
        {name: 'Pick a fast-food spot', answs: ['Dunkin’ Donuts', 'Wendy’s', 'Burger King', 'McDonald’s']},
        {name: 'Pick some more food', answs: ['pasta', 'chicken', 'sandwich', 'pizza']},
    ])

    const endResults = [
        'Stern - You’re a very serious person!',
        'Funny - You have a wicked sense of humour!',
        'Outgoing - You’re a perfect mix of funny, chill, and intelligence!',
        'Shy - You’re shy and reserved!']
    const [result, setResult] = useState({
        1: '',
        2: '',
        3: '',
        4: '',
        5: '',
        endResult: 0
    })

    const [error, setError] = useState({message: ''})

    const handleChange = (event) => {
        setResult({...result, [event.target.name]: event.target.alt})
    }

    const clearAnswears = () => {
        setResult({1: '', 2: '', 3: '', 4: '', 5: '', endResult: 0})
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        if (result['1'] !== '' && result['2'] !== '' && result['3'] !== '' && result['4'] !== '' && result['5'] !== '') {
            let endResult = (parseInt(result['1']) + parseInt(result['2']) + parseInt(result['3']) + parseInt(result['4']) + parseInt(result['5'])) / 5;
            endResult = Math.round(endResult);
            endResult = endResults[endResult - 1];
            setResult({...result, endResult})
            setError({message: ''})
        } else setError({message: 'Answear all questions'})
    }

    return (
        <div className={"content"}>
            <h2 align={"center"}>Tell Us Your Favorite Foods And We’ll Guess What Type Of Personality You Have</h2>
            <form onSubmit={handleSubmit}>
                {quiz.map((question, qId) => {
                    return <div className={'questionBlock'}>
                        <h3>{question.name}</h3>
                        <ul role='radiogroup'>
                            {question.answs.map((answear, id) => {
                                return <li>
                                    <input type="radio" id={`input-${qId}-${id}`} name={qId + 1} alt={id + 1}
                                           onChange={handleChange} value={result[qId + 1]} className={'inputRadio'}/>
                                    <label className={parseInt(result[qId + 1]) === id + 1 ? 'picked' : ''}
                                           htmlFor={`input-${qId}-${id}`}>{answear}</label>
                                </li>
                            })}
                        </ul>
                    </div>
                })}
                <div className={'submitButtonBlock'}>
                    <button type={'submit'} className={'submitButton'}>See result</button>
                </div>
                {result.endResult !== 0 ? <div className={'submitButtonBlock'}>
                    <button onClick={clearAnswears} className={'submitButton'}>Try again</button>
                </div> : ''}
                {result.endResult !== 0 ? <div className={'submitButtonBlock'}>
                    <h3>{result.endResult}</h3>
                </div> : ''}
                <div className={'submitButtonBlock'}>
                    <p className={'error'}>{error.message}</p>
                </div>
            </form>
        </div>
    );
}

export default App;
