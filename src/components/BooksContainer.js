import React, {Component} from 'react';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import { withStyles } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue'
import AddBookDialog from './AddBookDialog.js';
import EditBookDialog from './EditBookDialog.js';
import DeleteBookDialog from './DeleteBookDialog.js';

const cardColor = blue[100];

const styles = theme => ({
    cardContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white'
    },
    card: {
        background: cardColor,
        margin: '10px',
        width: '300px',
        height: '400px',
        alignSelf: 'center',
        display: 'flex',
        flexDirection: 'column'
    },
    actionsWrapper: {
        marginTop: 'auto'
    },
    title: {
        marginTop: '15px'
    },
    addBook: {
        margin: '15px auto',
        display: 'flex'
    }
});

class BooksContainer extends Component {
    state = {
        booksList: [],
        deleteDialogOpen: false,
        editDialogOpen: false,
        addDialogOpen: false,
        bookToEdit: false,
        bookIndexToDelete: null
    };

    componentDidMount() {
        this.getBooks(this.props.filter);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.filter !== this.props.filter) {
            this.getBooks(nextProps.filter);
        }
    }

    handleClose(dialog) {
        this.setState({
            [dialog]: false
        })
    }

    setBooks(booksList = []) {
        if(booksList.length){
            this.setState({
                booksList
            })
        }
    }

    getBooks(query) {
        const req = new XMLHttpRequest();

        req.onreadystatechange = () => {
            let response = req.responseText;

            if (req.readyState === XMLHttpRequest.DONE) {
                response = JSON.parse(response);
                let booksList = [];

                if (response.items.length){
                    booksList = response.items.map((book) => {
                        let publishedDate = book.volumeInfo.publishedDate;

                        if (publishedDate.length === 4) {
                            publishedDate = `${publishedDate}-01-01`;
                        }

                        return {
                            bookId: book.id,
                            authorName: book.volumeInfo.authors,
                            publishedDate,
                            title: this.capitalizeTitle(book.volumeInfo.title.replace(/[^A-Za-z\s]/g, ''))
                        }
                    })
                }
                this.setBooks(booksList);
            }
        };

        req.open('GET', `https://www.googleapis.com/books/v1/volumes?q=${query}`, true);
        req.send(null);
    }

    addBook(item){
        this.setState((nextState) => {
            return nextState.booksList.push(item);
        });

    }

    updateBook(book) {
        this.setState((nextState) => {
            nextState.booksList[nextState.bookIndexToEdit] = book;

            return nextState;
        });
    }

    capitalizeTitle(title) {
        return title.split(' ').map((word) => {
            return word.charAt(0).toUpperCase() + word.slice(1);
        }).join(' ');
    }

    deleteBook() {
        this.setState((nextState) => {
            nextState.booksList.splice(this.state.bookIndexToDelete, 1);
            nextState.deleteDialogOpen = false;

            return nextState;
        });
    }

    render() {
        let { booksList } = this.state;
        const { classes } = this.props;

        return (
            <React.Fragment>
                <Button className={classes.addBook}
                        color="primary"
                        aria-label="add book"
                        onClick={() => this.setState({addDialogOpen: true})}
                >
                    <Icon>add_circle</Icon>
                    Add Book
                </Button>
                <div className={classes.cardContainer}>

                    {booksList.map((book, i) => {
                        let {bookId, authorName, publishedDate, title} =  book;
                        return (
                            <Card key={i} className={classes.card}>
                                <CardContent className={classes.card}>
                                    <Typography variant="headline" component="h2">
                                        {title}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary">
                                        Book ID
                                    </Typography>
                                    <Typography component="p">
                                        {bookId}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary">
                                        Author Name
                                    </Typography>
                                    <Typography component="p">
                                        {authorName}
                                    </Typography>
                                    <Typography className={classes.title} color="textSecondary">
                                        Published Date
                                    </Typography>
                                    <Typography component="p">
                                        {publishedDate}
                                    </Typography>
                                    <div className={classes.actionsWrapper}>
                                        <Button
                                            className="edit"
                                            color="default"
                                            aria-label="edit"
                                            onClick={() => this.setState({
                                                editDialogOpen: true,
                                                bookToEdit: book,
                                                bookIndexToEdit: i
                                            })}
                                        >
                                            <Icon>edit</Icon>
                                            Edit
                                        </Button>
                                        <Button
                                            className="delete"
                                            color="default"
                                            aria-label="delete"
                                            onClick={() => this.setState({
                                                deleteDialogOpen: true,
                                                bookIndexToDelete: i,
                                                currentBookTitle: book.title,
                                            })}
                                        >
                                            <Icon>delete</Icon>
                                            Delete
                                        </Button>
                                    </div>
                                    {this.state.addDialogOpen &&
                                    <AddBookDialog
                                        booksList={this.state.booksList}
                                        handleClose={() => this.handleClose('addDialogOpen')}
                                        addBook={this.addBook.bind(this)}
                                    />}
                                    {this.state.editDialogOpen &&
                                    <EditBookDialog
                                        booksList={this.state.booksList}
                                        bookToEdit={this.state.bookToEdit}
                                        updateBook={this.updateBook.bind(this)}
                                        handleClose={() => this.handleClose('editDialogOpen')}
                                    />}
                                    {this.state.deleteDialogOpen &&
                                    <DeleteBookDialog
                                        currentBookId={this.state.currentBookId}
                                        currentBookTitle={this.state.currentBookTitle}
                                        deleteBook={this.deleteBook.bind(this)}
                                        handleClose={() => this.handleClose('deleteDialogOpen')}
                                    />}
                                    </CardContent>
                            </Card>
                        )
                    })}
                </div>
            </React.Fragment>
        );

    }
}

export default withStyles(styles)(BooksContainer) ;
