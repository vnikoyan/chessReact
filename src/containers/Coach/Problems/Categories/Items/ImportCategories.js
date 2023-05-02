import React, { useRef, useState } from "react";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import { makeStyles } from "@material-ui/styles";
import { Divider, OutlinedInput } from "@material-ui/core";
import { categories } from "modules/coach/actions";
import { useAction } from "utils/hooks";
import { Typography } from "@material-ui/core";
import CloudUploadIcon from "@material-ui/icons/CloudUpload";
import UploadFileIcon from "@mui/icons-material/UploadFile";
import { useTranslation } from "react-i18next";

const useStyles = makeStyles((theme) => ({
  dialogFooter: {
    padding: 0,
    marginTop: 30,
    marginBottom: 10,
  },
  importDialog: {
    minWidth: 300,
    paddingTop: 24,
  },
  importInput: {
    cursor: "pointer",
    "& input": {
      cursor: "pointer",
    },
  },
}));

export default function ImportCategories() {
  const { t } = useTranslation();
  const [open, setOpen] = useState(false);
  const classes = useStyles();
  const [importedFile, setImportedFile] = useState({ name: "" });
  const importCategories = useAction(categories.import);
  const hiddenFileInput = useRef(null);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setImportedFile({ name: "" });
  };

  const handleImport = async () => {
    let fileReader = new FileReader();
    fileReader.onloadend = async () => {
      const content = fileReader.result;
      const parsedContent = JSON.parse(content);
      importCategories(parsedContent);
      handleClose();
    };
    await fileReader.readAsText(importedFile);
  };

  const handleChange = (event) => {
    const fileUploaded = event.target.files[0];
    setImportedFile(fileUploaded);
  };

  const handleFileSelect = () => {
    hiddenFileInput.current.click();
  };

  return (
    <>
      <Button
        color="primary"
        size="medium"
        variant="outlined"
        onClick={handleClickOpen}
        endIcon={<CloudUploadIcon fontSize="small" />}
      >
        {t("coach.problems.categories.import")}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="form-dialog-title"
      >
        <DialogTitle disableTypography id="form-dialog-title">
          <Typography component="span" variant="h4">
            {t("coach.problems.categories.import")}{" "}
            <Typography component="span" color="primary" variant="h4">
              proxoft{" "}
            </Typography>
            {t("coach.problems.categories.file")}
          </Typography>
        </DialogTitle>
        <Divider />
        <DialogContent className={classes.importDialog}>
          <OutlinedInput
            endadornment={<UploadFileIcon />}
            type="text"
            value={importedFile.name}
            onClick={handleFileSelect}
            fullWidth
            className={classes.importInput}
          />
          <input
            type="file"
            ref={hiddenFileInput}
            onChange={handleChange}
            style={{ display: "none" }}
            accept=".proxoft"
          />
          <DialogActions className={classes.dialogFooter} disableSpacing>
            <Button
              onClick={handleImport}
              disabled={!importedFile.name}
              variant="contained"
              color="primary"
            >
              {t("coach.problems.categories.import")}
            </Button>
          </DialogActions>
        </DialogContent>
      </Dialog>
    </>
  );
}
