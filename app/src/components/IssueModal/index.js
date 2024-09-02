import { Button, Card, Modal, TextField, Typography } from "@mui/material";
import styles from "./styles.module.css";

export const IssueModal = (props) => {
  const {
    open,
    handleClose,
    handleSubmit,
    title,
    setTitle,
    description,
    setDescription,
    modalMode,
  } = props;

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
          {modalMode === "edit" ? "Edit" : "Add"} Issue
        </Typography>
        <TextField
          label="Title"
          variant="outlined"
          fullWidth
          margin="normal"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          label="Description"
          variant="outlined"
          fullWidth
          margin="normal"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        <div className={styles.buttonsWrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleSubmit(title, description)}
          >
            Submit
          </Button>
          <Button variant="contained" color="warning" onClick={handleClose}>
            Close
          </Button>
        </div>
      </Card>
    </Modal>
  );
};
