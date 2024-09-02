import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";

export const InfoModal = (props) => {
  const { open, handleClose, title, description } = props;

  const modalStyles = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
  };

  return (
    <Modal open={open} onClose={handleClose} style={modalStyles}>
      <Card className={styles.container}>
        <Typography variant="h6" gutterBottom align="center">
          Issue Info
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          disabled
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          disabled
        />
        <div className={styles.buttonsWrapper}>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
