import React from 'react';
import {
    BrowserRouter as Router,
    Route
} from 'react-router-dom'

import NavigationBar from "./NavigationBar";
import Categories from "./Categories";
import Player from "./Player";

class App extends React.Component {
    render() {
        return (
            <Router>
                <div>
                    <NavigationBar/>
                    <Route exact path="/" component={Categories} />
                    <Route path="/player" component={Player} />
                </div>
            </Router>
        )
    }
}

export default App;