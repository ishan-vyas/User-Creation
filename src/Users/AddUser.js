import React, { useState, useRef } from 'react';
import Card from '../UI/Card';
import styles from "./AddUser.module.css";
import Button from "../UI/Button";
import ErrorModal from '../UI/ErrorModal';
import Wrapper from '../Helpers/Wrapper';

// If you just want to read a value Ref is better than using State, as it is much less code.

function AddUser(props){

    const nameInputRef = useRef();
    const ageInputRef = useRef();

    const [error, setError] = useState();

    const onSubmitHandler = (event) => {
        // Essentially doesn't make the page reload
        // which is important as React doesn't reload the page.
        event.preventDefault();

        const enteredName = nameInputRef.current.value;
        const enteredAge = ageInputRef.current.value;

        if (enteredName.trim().length === 0 || enteredAge.trim().length === 0){
            setError({
                title: "Invalid Input!",
                message: "Please enter a valid name and age (non-empty values)"
            });
            return;
        }
        if (+enteredAge < 1){
            setError({
                title: "Invalid Age!",
                message: "Please enter a valid age (> 0)"
            });
            return;
        }

        props.onAddUser(enteredName, enteredAge);

        // This isn't ideal
        nameInputRef.current.value = '';
        ageInputRef.current.value = '';

    };

    const errorHandler = () => {
        setError(null);
    };

    return (
        <Wrapper>
            {error && <ErrorModal title={error.title} message={error.message} onConfirm={errorHandler}></ErrorModal>}
            <Card className = {styles.input}>
                <form onSubmit={onSubmitHandler}>
                    <label htmlFor="username">Username</label>
                    <input id="username" type="text" ref={nameInputRef}></input>
                    <label htmlFor="age">Age (Years)</label>
                    <input id = "age" type="number" ref={ageInputRef}></input>
                    <Button type="submit">Add User</Button>
                </form>
            </Card>
        </Wrapper>
    );
};

export default AddUser