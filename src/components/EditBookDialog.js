import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

const inputStyle = {
    margin: '0 5px 15px 5px'
};

const inputRowStyle = {
    display: 'flex',
};

class EditBookDialog extends Component {
    constructor(props){
        super(props);

        this.state = {
            bookId: {
                value: props.bookToEdit.bookId,
                error: false
            },
            title: {
                value: props.bookToEdit.title,
                error: false
            },
            publishedDate: {
                value: props.bookToEdit.publishedDate,
                error: false
            },
            authorName: {
                value: props.bookToEdit.authorName,
                error: false
            }
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }


    handleChange(e) {
        this.setState({
            [e.target.name]: {
                value: e.target.value,
                error: false
            }
        });
    }

    handleSubmit(e) {
        e.preventDefault();

        this.setState((nextState) => {
            let updatedBook = {
                bookId: nextState.bookId.value,
                title: nextState.title.value,
                authorName: nextState.authorName.value,
                publishedDate: nextState.publishedDate.value
            };

            let isValid = true;

            if (!nextState.bookId.value) {
                isValid = false;
                nextState.bookId.error = "ID can't be empty";
            }

            if (!nextState.title.value) {
                isValid = false;
                nextState.title.error = "Title can't be empty";
            } else if (!/^[A-Za-z\s]+$/.test(nextState.title.value)) {
                isValid = false;
                nextState.title.error = "Only letters and spaces allowed.";
            } else if (this.props.bookToEdit.title !== nextState.title.value) {
                const existingBook = this.props.booksList.filter((book) => {
                    return book.title === nextState.title.value;
                });

                if (existingBook.length) {
                    isValid = false;
                    nextState.title.error = "A book with this title already exists.";
                }
            }

            if (!nextState.authorName.value) {
                isValid = false;
                nextState.authorName.error = "Author name can't be empty";
            }

            if (!nextState.publishedDate.value) {
                isValid = false;
                nextState.publishedDate.error = "Published date can't be empty";
            } else {
                let dateParts = nextState.publishedDate.value.split('-');

                if (dateParts[0].length < 4 || dateParts[1].length < 2 || dateParts[2].length < 2 ) {
                    isValid = false;
                    nextState.publishedDate.error = "Invalid date";
                }
            }

            if (isValid) {
                this.props.updateBook(updatedBook);
                this.props.handleClose();
            }

            return nextState;
        });
    }

    render () {
        return (
            <Dialog open onClose={this.props.handleClose}>
                <DialogTitle>{`Edit "${this.props.bookToEdit.title}"`}</DialogTitle>
                <DialogContent>
                    <form onSubmit={this.handleSubmit.bind(this)}>
                        <div style={inputRowStyle}>
                            <TextField
                                name="title"
                                type="text"
                                value={this.state.title.value}
                                error={!!this.state.title.error}
                                helperText={this.state.title.error}
                                onChange={this.handleChange}
                                aria-label="book title"
                                label="Title"
                                style={inputStyle}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                name="bookId"
                                value={this.state.bookId.value}
                                error={!!this.state.bookId.error}
                                helperText={this.state.bookId.error}
                                onChange={this.handleChange}
                                type={'text'}
                                aria-label="book id"
                                label="Id"
                                style={inputStyle}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </div>
                        <div style={inputRowStyle}>
                            <TextField
                                name="authorName"
                                type={'text'}
                                value={this.state.authorName.value}
                                error={!!this.state.authorName.error}
                                helperText={this.state.authorName.error}
                                onChange={this.handleChange}
                                aria-label="book author"
                                label="Author"
                                style={inputStyle}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                            <TextField
                                name="publishedDate"
                                value={this.state.publishedDate.value}
                                error={!!this.state.publishedDate.error}
                                helperText={this.state.publishedDate.error}
                                onChange={this.handleChange}
                                type={'date'}
                                aria-label="book publish date"
                                label="Publish Date"
                                style={inputStyle}
                                InputLabelProps={{
                                    shrink: true
                                }}
                            />
                        </div>
                    </form>
                </DialogContent>
                <div style={inputRowStyle}>
                    <Button aria-label="save" onClick={this.handleSubmit.bind(this)}>
                        Save
                    </Button>
                    <Button aria-label="Cancel" onClick={this.props.handleClose}>
                        Cancel
                    </Button>
                </div>
            </Dialog>
        )
    }
}

export default EditBookDialog;
