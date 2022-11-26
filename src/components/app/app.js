import React from 'react';

import AppInfo from '../app-info/app-info';
import SearchPanel from '../search-panel/search-panel';
import AppFilter from '../app-filter/app-filter';
import EmployersList from '../employers-list/employers-list';
import EmployersAddForm from '../employers-add-form/employers-add-form';

import './app.css';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [
                {name: 'John C.', salary: 800, increase: true, like: false, id: 1},
                {name: 'Alex M.', salary: 3000, increase: false, like: true, id: 2},
                {name: 'Carl W.', salary: 15000, increase: false, like: false, id: 3},
            ],
            term: '',
            filter: 'all'
        }
        this.maxId = 4;
    }

    deleteItem = (id) => {
        this.setState(({data}) => {
            return {
                data: data.filter(item => item.id !== id)
            }
        })
    }

    addItem = (name, salary) => {
        const newItem = {
            name,
            salary,
            increase: false,
            like: false,
            id: this.maxId++
        }
        this.setState(({data}) => {
            if (newItem.salary.length >= 3 && newItem.name.length >= 3) {
                const newArr = [...data, newItem];
                return {
                data: newArr
                }
            } else return alert('Введите больше символов');
        })
    }

    onToggleProp = (id, prop) => {
        this.setState(({data}) => ({
            data: data.map(item => {
                if (item.id === id){
                    return {...item, [prop]: !item[prop]}
                }
                return item;
            })
        }))
    }

    searchEmp = (items, term) => {
        if (term.length === 0) {
            return items;
        }

        return items.filter(item => {
            return item.name.indexOf(term) > -1
        })
    }

    onUpdateSearch = (term) => {
        this.setState({term});
    }

    onToggleFilter = (items, filter) => {
        switch(filter) {
            case 'rise':
                return items.filter(items => items.increase);
            case 'high':
                return items.filter(items => items.salary > 1000);
            default:
                return items
            }
    }

    onFilterSelect = (filter) => {
        this.setState({filter});
    }


    render() {
        const {data, term, filter} = this.state;
        const employers = this.state.data.length;
        const increased = this.state.data.filter(item => item.increase).length;
        const visibleData = this.onToggleFilter(this.searchEmp(data, term), filter);
    
    return (
        <div className="app">
            <AppInfo employers={employers} increased={increased}/>

            <div className="search-panel">
                <SearchPanel onUpdateSearch={this.onUpdateSearch}/>
                <AppFilter 
                filter = {filter}
                onFilterSelect={this.onFilterSelect}/>
            </div>
            <EmployersList 
            data={visibleData}
            onDelete = {this.deleteItem}
            onToggleProp = {this.onToggleProp}
            />
            <EmployersAddForm
            data={this.state.data}
            onAdd = {this.addItem}/>
        </div>
    );
    }
}
export default App;