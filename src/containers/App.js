import React, { Component } from 'react';
import {editSearchField} from '../actions';
import {connect} from 'react-redux';
import CardList from '../components/CardList';
import Scroll from '../components/Scroll';
import SearchBox from '../components/SearchBox';
import './app.css';


const mapStateToProps =(state)=>{
    return {
        searchField: state.searchField
    }
}

const MatchDispatchToProps = (dispatch)=> {
    return { 
        onSearchChange: (event)=> dispatch(editSearchField(event.target.value))
    }
}


class App extends Component{
    constructor(props){
        super(props);
        this.state = {
                error: null,
                isLoaded: false,
                robots: []
            };
    }

    componentDidMount(){

        fetch('https://jsonplaceholder.typicode.com/users')
            .then(response=>response.json())
            .then( (users)=>{
                    this.setState({
                        isLoaded: true,
                        robots:users
                    });
                },
                (error)=>{
                    this.setState({
                        isLoaded: true,
                        error
                    });
                }
            )
    }


    render(){
        const {robots, error, isLoaded} = this.state;
        const {searchField, onSearchChange} = this.props;

        if (error) {
            console.log("Error occured")
            return <div>Error: {error.message}</div>;
        }
        else if (!isLoaded) {
            console.log("Saying Hello")
            return <h1>Loading</h1>
        }
        else{
            const filteredRobots = robots.filter(robot=>{
                return robot.name.toLowerCase().includes(searchField.toLowerCase());
            });
            return(
                <div className="tc">
                    <h1 className="f1">RoboFriends </h1>
                    <SearchBox searchChange = {onSearchChange} />
                    <Scroll>
                        <CardList robots={filteredRobots}/>
                    </Scroll>
                </div>
            );
        }
    }
}


export default connect(mapStateToProps, MatchDispatchToProps)(App);