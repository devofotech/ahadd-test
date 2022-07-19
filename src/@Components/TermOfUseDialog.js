import {
  Container,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
} from '@material-ui/core/';
import CloseIcon from '@material-ui/icons/Clear';

export default function TermOfUseDialog(h) {
  return (
    <Dialog open={h.openModal} onClose={() => h.handleCloseModal()} maxWidth="xs">
      <DialogTitle>
        <h2 className="font-weight-bold">TERMS OF USE</h2>
        <IconButton onClick={() => h.handleCloseModal()} style={{ right: -0, top: -0, position: 'absolute' }}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Container maxWidth="sm">
          <Typography variant="subtitle1" gutterBottom className="color-active">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
            minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
            voluptate velit esse cillum dolore eu fugiat nulla pariatur.
          </Typography>
        </Container>
      </DialogContent>
    </Dialog>
  );
}
