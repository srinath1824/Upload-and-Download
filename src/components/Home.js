import React from 'react';
import Button from '@material-ui/core/Button';
import Dashboard from './Dashboard';
import axios from 'axios';
var Base64 = require('js-base64').Base64;

class Home extends React.Component {
    constructor(){
        super();
        this.state = {
            DBSelected: "",
            DBconnected: false,
            error: "",
            file: null,
            meta: null
        };
    }

handleChange(event) {
this.setState({DBSelected: event.target.value});
}

handleClick() {
    axios.get(`http://localhost:4000/connect/db/${this.state.DBSelected}`, {
    }).then(res => {
        if(res.data.status == 200) {
            console.log("Connected", res);
            this.setState({DBconnected: true})
        } else{
            this.setState({error: "Error in connecting to Database"})
        }
    })
}

UploadFile(e) {
    this.setState({file : e.target.files[0]})
    console.log(e.target.files[0]);
}

UploadSubmit = async () => {
    console.log(this.state.file);
    const data = new FormData() 
    let reader = new FileReader();
    reader.readAsDataURL(this.state.file);
    reader.onload = (e) => {
        console.log(e.target.result);
        data.append('resumes', e.target.result);
        this.setState({meta: e.target.result});
    }
}

download() {
    let data = this.state.meta;
    //let mimeType = this.state.file.type;
    let fileName = this.state.file.name;
    let encodedData = Base64.encode(data);
    console.log(encodedData);
    this.downloadURL(encodedData, fileName);
}

downloadURL = (data, fileName) => {
    let base64Data = Base64.decode(data)
    //console.log(base64Data)
    var a;
    a = document.createElement('a');
    a.href = base64Data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
    a.click();
    a.remove();
};

render() {

    if(this.state.DBconnected) {
        return (
        <Dashboard />
        )
    }
return (
<div style={{textAlign: 'center'}}>
    <br/>
    <input type="file" name="resumes" multiple onChange={(e) => this.UploadFile(e)}></input><br/><br/>
    <Button variant="contained" color="primary" onClick={() => this.UploadSubmit()}>Upload</Button>
    <a id="download" href="#" onClick={() => this.download()}>Download file</a>
</div>
);
}
}
export default Home;