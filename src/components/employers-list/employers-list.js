import React from 'react';
import './employers-list.css';
import EmployersListItem from '../employers-list-item/employers-list-item';

const EmployersList = ({data, onDelete, onToggleProp, onChangeSalaryItem}) => {

    const elements = data.map(item => {
        const {id, ...itemProps} = item;
        return (
            <EmployersListItem 
            key={id} 
            {...itemProps}
            onDelete={()=> onDelete(id)}
            onToggleProp={(e) => onToggleProp(id, e.currentTarget.getAttribute('data-toggle'))}
            onSalaryChange={(value) => onChangeSalaryItem(value, id)}/>
        )
    })

    return(
        <ul className="app-list list-group">
            {elements}
        </ul>
    );
}

export default EmployersList;