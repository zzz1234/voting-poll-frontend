// Create a component called ChoicesForm which will be used to render the choices form. Add a "Add Choice" button which when clicked will open a input field where user can enter a choice.

import React, { useState } from 'react';

import { addChoice } from '../../services/choiceService.js';

import Choice from '../choice/choice.js';
import './ChoicesForm.css';

export default function ChoicesForm({game_code, nextPageOnSubmit}) {

    const [choice_num, setChoice_num] = useState(1);
    const [choices_list, setChoices_list] = useState({0: ''});

    const handleChoiceChange = (e) => {
        const { name, value } = e.target;
        setChoices_list((prevChoices_list) => ({
            ...prevChoices_list,
            [name]: value,
            }));
        console.log(choices_list)
    }

    const handleRemove = (e, key) => {
        e.preventDefault();
        let newChoicesList = { ...choices_list }; // Create a copy of the choices_list
        delete newChoicesList[key]; // Delete the property from the copied object
        setChoices_list(newChoicesList); // Update the state with the new object
    }


    const render_choices = () => {
        return Object.keys(choices_list).map((key, index) => {
            return (
              <div key={key}>
                <Choice name={key} id={key} onChange={handleChoiceChange} onRemove={handleRemove}/>
              </div>
            );
          });
    }

    const addMoreChoice = (e) => {
        e.preventDefault();
        setChoice_num(choice_num+1);
        setChoices_list((prevChoices_list) => ({
            ...prevChoices_list,
            [choice_num + 1]: '',
        }));
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