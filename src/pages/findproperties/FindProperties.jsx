import React, { useState, useEffect } from 'react'
import { CSVLink } from 'react-csv'
import {
  Alert,
  Grid,
  InputLabel,
  Typography,
  Input,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Select,
  MenuItem,
  styled
} from '@mui/material'
import PropTypes from 'prop-types';
import CloseIcon from '@mui/icons-material/Close';
import { Properties, Filter } from '../../components'
import prophelper from '../../helpers/FindPropertyHelper'

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const FindProperties = () => {
  const [fileName, setFileName] = useState('');
  const [properties, setProperties] = useState([]);
  const [allProperties, setAllProperties] = useState([]);
  const [showFilterScreen, setShowFilterScreen] = useState(false);
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');
  const [uploadedFiles, setUploadedFiles] = useState([]);

  const handleChangeSelect = ({ target }) => { 
    //console.log(target.value);
    if(target.value !== 'undefined'){
      setFileName(target.value);
    }
  };

  const handleGetUploadedFileNames = async () => {
    try {
      const res_prop = await prophelper.getUploadedFileNames();
      if (res_prop !== 'undefined') {
        setUploadedFiles(res_prop);
      }
      else {
        setUploadedFiles([]);
      }
    }
    catch (err) {
      console.log(err);
      setAlert('error', 'Something went wrong!');
    }
  };

  const handleSetFileName = async (file) => {
    // clear the current data
    setFileName('');
    setProperties([]);
    setAllProperties([]);

    try {
      if (file) {
        const res_prop = await prophelper.uploadFile(file);
        if (res_prop !== 'undefined') {
          setFileName(file.name);
        }
        else {
          setAlert('error', 'Something went wrong!');
        }
      }
    }
    catch (err) {
      console.log(err);
      setAlert('error', 'Something went wrong!');
    }
  };

  const handleProcess = async () => {
    // clear alerts and the current property data
    clearAlert();
    setProperties([]);
    setAllProperties([]);

    try {
      console.log(`fileName: ${fileName}`);
      const res_prop = await prophelper.fetchProperties(fileName);
      if (res_prop !== 'undefined') {
        //console.log(res_prop);
        setProperties(res_prop);
        setAllProperties(res_prop);
      }
    }
    catch (err) {
      console.log(err);
      setAlert('error', 'Something went wrong!');
    }
  };

  const handleShowDialog = () => {
    setShowFilterScreen(true);
  };

  const handleCloseDialog = () => {
    setShowFilterScreen(false);
  };

  const applyFilters = ((data, minprice, maxprice, minbeds, minbaths, minsqft) => {
    let response = data;
    if (minprice > 0) {
      response = response.filter((item) => parseInt(item.price) >= minprice);
    }
    if (maxprice > 0) {
      response = response.filter((item) => parseInt(item.price) <= maxprice);
    }
    if (minbeds > 0) {
      response = response.filter((item) => parseInt(item.beds) >= minbeds);
    }
    if (minbaths > 0) {
      response = response.filter((item) => parseInt(item.baths) >= minbaths);
    }
    if (minsqft > 0) {
      response = response.filter((item) => parseInt(item.sqFt) >= minsqft);
    }
    return response
  });

  const handleApplyFilters = (minprice, maxprice, minbeds, minbaths, minsqft) => {
    setProperties(applyFilters(allProperties, minprice, maxprice, minbeds, minbaths, minsqft));
    handleCloseDialog();
  };

  const setAlert = (severity, message) => {
    setAlertState(true);
    setAlertSeverity(severity);
    setAlertMessage(message);
  };

  const clearAlert = () => {
    setAlertState(false);
    setAlertSeverity('');
    setAlertMessage('');
  };

  useEffect(() => {
    handleGetUploadedFileNames();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className='container-div' style={{ maxWidth: '90%', margin: '0px auto' }}>
      {(alertState) ?
        (<Alert
          sx={{ m: '20px 0' }}
          severity={alertSeverity}
          onClose={() => clearAlert()}
        >
          {alertMessage}
        </Alert>
        ) : (
          <React.Fragment />
        )}

      <Typography variant='h2'>Find Properties</Typography>
      <Grid container spacing={2} m='40px 20px'>
        <Grid item>
          <Grid item>
            <InputLabel>File Name:</InputLabel>
          </Grid>
        </Grid>
        <Grid item>
          <Input
            id='file-name'
            type="text"
            placeholder='File name...'
            readOnly={true}
            value={fileName}
          />
        </Grid>
        {(uploadedFiles.length > 0) &&
          <Grid item>
            <Select
              labelId="demo-simple-select-filled-label"
              id="demo-simple-select-filled"
              value=''
              onChange={handleChangeSelect}
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {uploadedFiles.map((file) =>
                <MenuItem key={file} value={file}>{file}</MenuItem>
              )}
            </Select>
          </Grid>
        }
        <Grid item>
          <Button
            variant='contained'
            component='label'
          >
            Upload
            <input
              hidden
              accept='.har'
              type='file'
              onChange={(e) => handleSetFileName(e.target.files[0])}
            />
          </Button>
        </Grid>
        <Grid item>
          {(fileName) &&
            <Button
              variant='contained'
              onClick={() => handleProcess()}
            >
              Process
            </Button>
          }
        </Grid>
        <Grid item>
          {(properties.length > 0) &&
            <Box>
              <Button
                variant='contained'
                sx={{ margin: '0 20px 0 0' }}
                onClick={handleShowDialog}
              >
                Filters
              </Button>
              <Button
                variant='contained'
                color='success'
              >
                <CSVLink className="csvlink-btn" data={properties} filename={`${fileName}.csv`}>Export</CSVLink>
              </Button>
            </Box>
          }
        </Grid>
      </Grid>

      {(properties.length > 0) && <Properties properties={properties} />}

      {/* Popup dialog area */}
      <div>
        <BootstrapDialog
          onClose={handleCloseDialog}
          aria-labelledby="customized-dialog-title"
          open={showFilterScreen}
        >
          <BootstrapDialogTitle id="customized-dialog-title" onClose={handleCloseDialog}>
            Apply Filters
          </BootstrapDialogTitle>
          <DialogContent dividers>
            <Filter handleApplyFilters={handleApplyFilters} />
          </DialogContent>
        </BootstrapDialog>
      </div>
    </div>
  )
}

export default FindProperties;