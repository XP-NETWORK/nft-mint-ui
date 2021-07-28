import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import upload_cloud from '../assets/SVG/cloud_upload.png'

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};

const getBase64 = (file) => {
  return new Promise(function (resolve, reject) {
      var reader = new FileReader();

      reader.onloadend = function (e) {
          resolve(e.target.result);
      };
      reader.onerror = function (e) {
          reject(e.target.error);
      };
      reader.readAsDataURL(file);
  });
}


function XPDropzone(props) {
  const [files, setFiles] = useState([]);
  const [blob, setBlob] = useState(undefined);
  const {getRootProps, getInputProps} = useDropzone({
    accept: 'image/*',
    onDrop: acceptedFiles => {
      setFiles(acceptedFiles.map(file => Object.assign(file, {
        preview: URL.createObjectURL(file)
      })));
      getBase64(acceptedFiles[0]).then(data => {
        console.log(data);
        setBlob(data);
      })
      
    }
  });
  
  const thumbs = files.map(file => (
    <div style={thumb} key={file.name}>
      <div style={thumbInner}>
        <img
          src={file.preview}
          style={img}
          alt={''}
        />
      </div>
    </div>
  ));

  useEffect(() => () => {
    // Make sure to revoke the data uris to avoid memory leaks
    files.forEach(file => URL.revokeObjectURL(file.preview));
  }, [files]);


  return (
    <section 
    onChange={props.onChange(blob)}
    className="container">
      <div {...getRootProps({className: 'dropzone'})}>
        <input {...getInputProps()} />
        <div className="flex-centered">
        <img 
        src={upload_cloud} 
        alt="upload cloud" 
        className="flex-item"/>
        <div className="flex-item">
          <div className="upload-button">
            Upload File
          </div>
        </div>
        </div>
        <div className="bold-label color-blue">
          PNG, GIF, MP4 or MP3, Max 50mb
        </div>
      </div>
      <aside style={thumbsContainer}>
        {thumbs}
      </aside>
    </section>
  );
}

<XPDropzone />

export default XPDropzone;