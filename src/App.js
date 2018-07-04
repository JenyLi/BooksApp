import React, {Component} from 'react';
import BooksContainer from './components/BooksContainer.js';
import CssBaseline from '@material-ui/core/CssBaseline';
import Filter from './components/Filter.js';

class App extends Component {

    state = {
        filter: 'Dog'
    };

    onFilterSubmit(filter) {
        if (filter) {
            this.setState({
                filter
            });
        }
    }

    render() {
        return (
            <React.Fragment>
                <CssBaseline />
                <div className="appContainer">
                    <Filter
                        initialFilter={this.state.filter}
                        onFilterSubmit={this.onFilterSubmit.bind(this)}
                    />
                    <BooksContainer filter={this.state.filter} />
                </div>
            </React.Fragment>
        );
    }
}

export default App;
