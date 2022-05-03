import React, { useState } from 'react';
import PropertyTable from '../components/PropertiesTable';
import prophelper from '../helpers/FindPropertyHelper';
import './FindProperties.css';

function FindProperties() {
    const [fileName, setFileName] = useState("");
    const [properties, setProperties] = useState([]);

    const [error, setError] = useState(false);

    const handleSetFileName = async (file) => {
        // clear the current file name
        setFileName("");

        try {
            if (file) {
                const res_prop = await prophelper.uploadFile(file);
                if (res_prop !== 'undefined') {
                    setFileName(file.name);
                }
                else {
                    setError(true);
                }
            }
        }
        catch (err) {
            console.log(err);
            setError(true);
        }
    };

    const handleSubmit = async (e) => {
        // prevent default refresh of the page
        e.preventDefault();
        setError(false);

        // clear the current property data
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
            setError(true);
        }
    };

    return (
        <div className="find-properties">
            <form className="find-properties-form" onSubmit={handleSubmit}>
                <label>File Name:</label>
                <input className="find-file-input"
                    type="text"
                    placeholder="File name..."
                    readOnly={true}
                    value={fileName} />
                <label htmlFor='fileInput'>
                    <i className="find-file-icon fas fa-plus"></i>
                </label>
                <input
                    type="file"
                    id="fileInput"
                    style={{ display: "none" }}
                    onChange={(e) => handleSetFileName(e.target.files[0])} />
                <button className="process-button" type="submit">Process</button>
            </form>
            {properties.length > 0 && <PropertyTable properties={properties} />}
            {error && <span className="error-message">Something went wrong!</span>}
        </div>
    )
}

export default FindProperties