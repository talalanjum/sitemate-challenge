import { useEffect, useState } from "react";
import { Alert, Button, Snackbar, Typography } from "@mui/material";
import styles from "./styles.module.css";
import { IssueTable } from "../IssueTable";
import { IssueModal } from "../IssueModal";
import axios from "axios";
import { InfoModal } from "../InfoModal";

export const Home = () => {
  const [issueModalOpen, setIssueModalOpen] = useState(false);
  const [infoModalOpen, setInfoModalOpen] = useState(false);

  const [actionsDisabled, setActionsDisabled] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState(false);
  const [alertType, setAlertType] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [issues, setIssues] = useState([]);
  const [issueId, setIssueId] = useState(null);
  const [modalMode, setModalMode] = useState("");

  const loadIssues = async () => {
    try {
      const res = await axios.get("http://localhost:8080");
      setIssues(res.data);
    } catch (error) {}
  };

  useEffect(() => {
    loadIssues();
  }, []);

  const openModal = (mode) => {
    setModalMode(mode);
    setIssueModalOpen(true);
  };

  const handleModalClose = () => {
    setIssueModalOpen(false);
    setTitle("");
    setDescription("");
    setIssueId(null);
  };

  const handleInfoModalClose = () => {
    setInfoModalOpen(false);
    setTitle("");
    setDescription("");
    setIssueId(null);
  };

  const addIssue = async () => {
    setActionsDisabled(true);
    try {
      const res = await axios.post(`http://localhost:8080/`, {
        title,
        description,
      });
      setAlertMessage(res.data);
      setAlertType("success");
      loadIssues();
    } catch (error) {
      setAlertMessage(error);
      setAlertType("error");
    }
    handleModalClose();
    setAlertVisible(true);
    setActionsDisabled(false);
  };

  const openModalInEditMode = (issue) => {
    const { id, title, description } = issue;
    setIssueId(id);
    setTitle(title);
    setDescription(description);
    openModal("edit");
  };

  const editIssue = async () => {
    setActionsDisabled(true);
    try {
      const res = await axios.put(`http://localhost:8080/${issueId}`, {
        title,
        description,
      });
      setAlertMessage(res.data);
      setAlertType("success");
      loadIssues();
    } catch (error) {
      setAlertMessage(error);
      setAlertType("error");
    }
    handleModalClose();
    setAlertVisible(true);
    setActionsDisabled(false);
  };

  const deleteIssue = async (id) => {
    setActionsDisabled(true);

    try {
      const res = await axios.delete(`http://localhost:8080/${id}`);
      setAlertMessage(res.data);
      setAlertType("success");
    } catch (error) {
      setAlertMessage(error);
      setAlertType("error");
    }

    setAlertVisible(true);

    if (issues.length > 0) {
      const newIssues = issues.filter((issue) => issue.id !== id);
      setIssues(newIssues);
    } else {
      setIssues([]);
    }

    setActionsDisabled(false);
  };

  const checkIssueInfo = async (id) => {
    setInfoModalOpen(true);
    setActionsDisabled(true);

    try {
      const res = await axios.get(`http://localhost:8080/${id}`);
      const { title, description } = res.data[0];
      setTitle(title);
      setDescription(description);
    } catch (error) {
      setAlertMessage(error);
      setAlertType("error");
    }

    setActionsDisabled(false);
  };

  return (
    <>
      <Snackbar
        open={alertVisible}
        autoHideDuration={2000}
        onClose={() => setAlertVisible(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          variant="filled"
          severity={alertType === "success" ? "success" : "error"}
        >
          {alertMessage}
        </Alert>
      </Snackbar>
      <div className={styles.wrapper}>
        <Typography variant="h4" gutterBottom>
          Sitemate Issues
        </Typography>
        <div className={styles.buttonWrapper}>
          <Button
            variant="contained"
            color="primary"
            onClick={() => openModal("add")}
            disabled={actionsDisabled}
          >
            Add Issue
          </Button>
        </div>
        <IssueTable
          editIssue={openModalInEditMode}
          deleteIssue={deleteIssue}
          checkIssueInfo={checkIssueInfo}
          actionsDisabled={actionsDisabled}
          issues={issues}
        />
        <IssueModal
          open={issueModalOpen}
          title={title}
          description={description}
          setTitle={setTitle}
          setDescription={setDescription}
          handleClose={() => handleModalClose()}
          handleSubmit={() => (modalMode === "edit" ? editIssue() : addIssue())}
          modalMode={modalMode}
        />
        <InfoModal
          open={infoModalOpen}
          title={title}
          description={description}
          handleClose={() => handleInfoModalClose()}
          issueId={issueId}
        />
      </div>
    </>
  );
};
