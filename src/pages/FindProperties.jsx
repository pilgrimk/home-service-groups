import React, { useState } from 'react'
import { CSVLink } from 'react-csv'
import {
  Alert,
  Grid,
  InputLabel,
  Typography,
  Input,
  Button
} from '@mui/material'
import { Properties } from '../components'
import prophelper from '../helpers/FindPropertyHelper'

const FindProperties = () => {
  const [fileName, setFileName] = useState('');
  const [properties, setProperties] = useState([]);
  const [alertState, setAlertState] = useState(false);
  const [alertSeverity, setAlertSeverity] = useState('');
  const [alertMessage, setAlertMessage] = useState('');

  const handleSetFileName = async (file) => {
    // clear the current data
    setFileName('');
    setProperties([]);

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

    try {
      console.log(`fileName: ${fileName}`);
      const res_prop = await prophelper.fetchProperties(fileName);
      if (res_prop !== 'undefined') {
        //console.log(res_prop);
        setProperties(res_prop);
      }
    }
    catch (err) {
      console.log(err);
      setAlert('error', 'Something went wrong!');
    }
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

  return (
    <div className='container-div' style={{ maxWidth: '90%', margin: '0px auto'}}>
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
      <Grid container spacing={3} m='40px 20px'>
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
            <Button
              variant='contained'
              color='success'
            >
              <CSVLink className="csvlink-btn" data={properties} filename={`${fileName}.csv`}>Export</CSVLink>
            </Button>
          }
        </Grid>
      </Grid>

      {(properties.length > 0) && <Properties properties={properties} />}
    </div>
  )
}

export default FindProperties;