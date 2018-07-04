import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Icon from '@material-ui/core/Icon';
import Input from '@material-ui/core/Input';

const styles = theme => ({
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'

    },
    input: {
        width: '300px',
        padding: '10px',
        margin: '10px',
        color: '#fff'
    },
    searchButton: {
        cursor: 'pointer'
    }
});

class Filter extends Component {

    constructor(props) {
        super(props);

        this.state = {
            filter: props.initialFilter
        };
    }

    render() {
        const { classes, onFilterSubmit } = this.props;

        return (
            <AppBar position="static">
                <div className={classes.container}>
                    <Input
                        type="search"
                        inputProps={{
                            'aria-label': 'filter'
                        }}
                        className={classes.input}
                        placeholder="Enter text to filter books"
                        value={this.state.filter}
                        onChange={(e) => {
                            this.setState({ filter: e.target.value })
                        }}
                    />
                    <Icon onClick={() => { onFilterSubmit(this.state.filter); }} className={classes.searchButton}>search</Icon>
                </div>
            </AppBar>
        )
    }
}

export default withStyles(styles)(Filter);
