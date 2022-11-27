import React from 'react';
import './employers-list-item.css';



const EmployersListItem = (props) =>  {
    const {name, salary, onDelete, onToggleProp, onSalaryChange, increase, like} = props;

    let classNames = "list-group-item d-flex justify-content-between";

    if (like) {
        classNames += ' like'
    }

    if (increase) {
       classNames += ' increase'
    };

    const handleSalaryChange = (e) => {
        onSalaryChange(e.target.value.replace('$',''))      
    }



    return (
        <li className={classNames}>
            <span className="list-group-item-label"
            onClick={onToggleProp} data-toggle="like" minLength="3">{name}</span>
            <input type="text"
            value={salary + '$'}
            className="list-group-item-input"
            onChange={handleSalaryChange}/>
            <div className="d-flex justify-content-center align-items-center">
                <button type="button"
                        className="btn-cookie btn-sm"
                        onClick={onToggleProp} data-toggle="increase">
                        <i className="fas fa-cookie"></i>
                </button>

                <button type="button"
                className="btn-trash btn-sm"
                onClick={onDelete}>
                    <i className="fas fa-trash"></i>
                </button>
                <i className="fas fa-star"></i>
            </div>
        </li>
    );
    
}

export default EmployersListItem;