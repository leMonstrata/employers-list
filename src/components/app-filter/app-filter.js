import React from 'react';

import './app-filter.css';

const buttonsData = [
    {name: 'all', label: 'Все сотрудники'},
    {name: 'rise', label: 'На повышение'},
    {name: 'high', label: 'З/П больше 1000$'}
];

const AppFilter = (props) => {

        const buttons = buttonsData.map(({name, label}) => {
        const active = props.filter === name;
        const clazz = active ? 'btn-light' : 'btn-outline-light';

        return (
            <button type="button"
                className={`btn ${clazz}`}
                key={name}
                onClick={() => props.onFilterSelect(name)}>
                    {label}
                </button>
        );
    })
        return (
            <div className="btn-group">
                {buttons}
            </div>
        );
}

export default AppFilter;