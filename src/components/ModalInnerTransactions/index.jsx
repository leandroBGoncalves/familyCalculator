import { Dialog } from '@material-ui/core';

export default function ModalTransactions({open, handleClose}) {
    return (
        <Dialog
        fullWidth
        maxWidth="sm"
        open={open}
        onClose={handleClose}
      >

        </Dialog>
    )
}