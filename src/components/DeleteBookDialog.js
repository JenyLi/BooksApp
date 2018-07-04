import React, {Component} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';

class DeleteBookDialog extends Component {
    render () {
        return (
            <Dialog open onClose={this.props.handleClose}>
                <DialogContent>
                    <DialogTitle>
                        {`Are you sure you want to delete the book "${this.props.currentBookTitle}"?`}
                    </DialogTitle>
                    <div>
                        <Button aria-label="Ok" onClick={this.props.deleteBook}>
                            OK
                        </Button>
                        <Button aria-label="Cancel" onClick={this.props.handleClose}>
                            Cancel
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        )
    }
}

export default DeleteBookDialog;
