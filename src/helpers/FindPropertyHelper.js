import axios from 'axios';

const api = {
  fetchTest: function (fileName) {
    const urlString = `${process.env.REACT_APP_API}api/parser/test`;

    return axios.get(urlString)
      .then(function (response) {
        console.log(response);
      })
  },

  uploadFile: function (file) {
    const urlString = `${process.env.REACT_APP_API}api/parser/uploadfile`;

    // pass data to server as FormData !
    const data = new FormData();
    data.append("uploadedFile", file);

    return axios.post(urlString, data)
      .then(function (response) {
        //console.log(response);
      })
  },

  getUploadedFiles: function () {
    const urlString = `${process.env.REACT_APP_API}api/UploadedFiles`;

    return axios.get(urlString)
      .then(function (response) {
        return response.data;
      })
  },

  getUploadedFileNames: function () {
    const urlString = `${process.env.REACT_APP_API}api/UploadedFiles/GetUploadedFileNames`;
    console.log(urlString);

    return axios.get(urlString)
      .then(function (response) {
        return response.data;
      })
  },
  
  fetchProperties: function (fileName) {
    const urlString = `${process.env.REACT_APP_API}api/parser/parsefile`;

    // pass data to server as FormData !
    const data = new FormData();
    data.append("fileName", fileName);

    return axios.post(urlString, data)
      .then(function (response) {
        var data = response.data.map(function(element) {
          return {
            'baths': `${element.baths}`,
            'beds': `${element.beds}`,
            'city': `${element.city}`,
            'countryCode': `${element.countryCode}`,
            'hoa': `${element.hoa}`,
            'latitude': `${element.latitude}`,
            'listingId': `${element.listingId}`,
            'listingRemarks': `${element.listingRemarks}`,
            'listingType': `${element.listingType}`,
            'location': `${element.location}`,
            'longitude': `${element.longitude}`,
            'lotSize': `${element.lotSize}`,
            'postalCode': `${element.postalCode}`,
            'price': `${element.price}`,
            'pricePerSqFt': `${element.pricePerSqFt}`,
            'propertyId': `${element.propertyId}`,
            'propertyType': `${element.propertyType}`,
            'soldDate': `${element.soldDate}`,
            'sqFt': `${element.sqFt}`,
            'state': `${element.state}`,
            'streetLine': `${element.streetLine}`,
            'daysListed': `${element.daysListed}`,
            'unitNumber': `${element.unitNumber}`,
            'url': `${element.url}`,
            'yearBuilt': `${element.yearBuilt}`,
            'zip': `${element.zip}`
          }; 
        });
        return data;
      })
  }
};

export default api;