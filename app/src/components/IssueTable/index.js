import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import styles from "./styles.module.css";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import InfoIcon from "@mui/icons-material/Info";
import { IconButton, Tooltip } from "@mui/material";

export const IssueTable = (props) => {
  const { actionsDisabled, deleteIssue, editIssue, checkIssueInfo, issues } =
    props;

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell align="right">Title</TableCell>
            <TableCell align="right">Description</TableCell>
            <TableCell align="right">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {issues.map((row) => (
            <TableRow key={row.id}>
              <TableCell component="th" scope="row">
                {row.id}
              </TableCell>
              <TableCell align="right">{row.title}</TableCell>
              <TableCell align="right">{row.description}</TableCell>
              <TableCell align="right">
                <Tooltip title="Info">
                  <IconButton
                    disabled={actionsDisabled}
                    onClick={() => checkIssueInfo(row.id)}
                    color="info"
                  >
                    <InfoIcon className={styles.tableIcon} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Delete">
                  <IconButton
                    disabled={actionsDisabled}
                    onClick={() => deleteIssue(row.id)}
                    color="warning"
                  >
                    <DeleteIcon className={styles.tableIcon} />
                  </IconButton>
                </Tooltip>
                <Tooltip title="Edit">
                  <IconButton
                    disabled={actionsDisabled}
                    onClick={() => editIssue(row)}
                    color="success"
                  >
                    <EditIcon className={styles.tableIcon} />
                  </IconButton>
                </Tooltip>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
