"use client";

import { User } from "@/types";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import React, { useState } from "react";

interface ProfessorDialogProps {
  professor: User;
}

function ProfessorDialog({ professor }: ProfessorDialogProps) {
  const [openDialog, setOpenDialog] = useState(false);

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  return (
    <Dialog open={openDialog} onClose={handleOpenDialog}>
      <DialogTitle>Professor Information</DialogTitle>
      <DialogContent>
        <Typography variant="h6" fontWeight="bold">
          Name: {professor.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Email: {professor.email}
        </Typography>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseDialog} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default ProfessorDialog;
