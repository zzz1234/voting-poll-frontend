// Create a component called ChoicesForm which will be used to render the choices form. Add a "Add Choice" button which when clicked will open a input field where user can enter a choice.
// Path: voting-machine-frontend/src/components/ChoicesForm/ChoicesForm.js

// Create a component called ChoicesForm which will be used to render the choices form. Add a "Add Choice" button which when clicked will open a input field where user can enter a choice.

import React, { useState } from 'react';

import { addChoice } from '../../services/addChoiceService.js';

import Choice from '../choice/choice.js';
import './ChoicesForm.css';

export default function ChoicesForm({game_code, nextPageOnSubmit}) {

    const [choice_num, setChoice_num] = useState(1);
    const [choices_list, setChoices_list] = useState([]);

    const handleChoiceChange = (e) => {
        const { name, value } = e.target;
        setChoices_list((prevChoices_list) => ({
            ...prevChoices_list,
            [name]: value,
            }));
        console.log(choices_list)
    }

    const render_choices = () => {
        let choices = [];
        for (let i=0; i<choice_num; i++) {
            choices.push(<div key={i}><Choice name={i} id={i} onChange={handleChoiceChange}/></div>);
        }
        return choices;
    }

    const addMoreChoice = (e) => {
        e.preventDefault();
        setChoice_num(choice_num+1);
    }

    const handleChoiceFormSubmit = (e) => {
        e.preventDefault()
        const api_body = {
            'choices': Object.values(choices_list),
            'game_id': game_code,
        }
        addChoice(api_body)
        .then(data => {
            console.log('Success:', data);
            nextPageOnSubmit('poll_form');
            alert("Choices added successfully!");
        })
        .catch((error) => {
            console.error('Error:', error);
        });
    }
    
    return (
        // Write HTML to create a button which when clicked will open a input field where user can enter a choice.
        <div className="choices-form">
            <h1 className="choices-form-title">Add your Choices here.</h1>
            <form className='choices-form' onSubmit={handleChoiceFormSubmit}>
            {render_choices()}
            <input className="submit-button" type="submit" value="+ Add More" onClick={addMoreChoice} />
            <input className="submit-button" type="submit" value="Submit" />
            </form>
        </div>
    );
    }