import React, { useState } from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

const onToggleFilter = (items, filter) => {
    switch(filter) {
        case 'rise':
            return items.filter(items => items.increase);
        case 'high':
            return items.filter(items => items.salary > 1000);
        default:
            return items
        }
}

const searchEmp = (items, term) => {
    if (term.length === 0) {
        return items;
    }

    return items.filter(item => {
        return item.name.indexOf(term) > -1
    })
}

let maxId = 4;

const App = () => {
    const [state, setState] = useState({
        data: [
            {name: 'John C.', salary: 800, increase: true, like: false, id: 1},
            {name: 'Alex M.', salary: 3000, increase: false, like: true, id: 2},
            {name: 'Carl W.', salary: 15000, increase: false, like: false, id: 3},
        ],
        term: '',
        filter: 'all'
    })


    const {data, term, filter} = state;
    const employers = state.data.length;
    const increased = state.data.filter(item => item.increase).length;
    const visibleData = onToggleFilter(searchEmp(data, term), filter);

    const deleteItem = (id) => {
        setState(({data}) => {
            return {
                ...state, data: data.filter(item => item.id !== id)
            }
        })
    }

    const addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: maxId++
        }
        if (newItem.salary.length >= 3 && newItem.name.length >= 3) {
        setState({
                ...state,    
                data: [...state.data, newItem]
            })
        } else return alert('Введите больше символов');
    }

    const onToggleProp = (id, prop) => {
        setState(({data}) => ({
            ...state,
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }


    const onUpdateSearch = (term) => {
        setState({...state, term});
    }

    const onFilterSelect = (filter) => {
        setState({...state, filter});
    }

    const onChangeSalaryItem = (salary, id) => {
        const currenDataItem = state.data.find((e) => e.id === id)
        currenDataItem.salary = salary
        setState({
            ...state,
            data: [...data]
        })
    }

    return (
        <div className="app">
            <AppInfo employers={employers} increased={increased}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={onUpdateSearch}/>
                <AppFilter 
                filter = {filter}
                onFilterSelect={onFilterSelect}/>
            </div>
            <EmployersList 
            data={visibleData}
            onDelete = {deleteItem}
            onToggleProp = {onToggleProp}
            onChangeSalaryItem = {onChangeSalaryItem}
            />
            <EmployersAddForm
            data={state.data}
            onAdd = {addItem}/>
        </div>
    );
}

export default App;