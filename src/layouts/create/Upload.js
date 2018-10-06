import React, { Component, Fragment } from 'react'
import ipfsAPI from 'ipfs-api'
import ReactDropzone from 'react-dropzone'
import {AccountData, ContractData, ContractForm} from "drizzle-react-components";

class Upload extends React.Component {
  constructor() {
    super()
    this.state = { files: [] }
    this.ipfsApi = ipfsAPI('localhost', '5001')

    this.onDrop = this.onDrop.bind(this);
    this.saveToIpfs = this.saveToIpfs.bind(this);
  }

  onDrop(files) {

    this.setState({
      files: this.state.files.concat(files)
    });
    const file = files[0]
    let reader = new window.FileReader()
    reader.onloadend = () => this.saveToIpfs(reader)
    reader.readAsArrayBuffer(file)
  }


  saveToIpfs (reader) {
    let ipfsId
    const buffer = Buffer.from(reader.result)
    this.ipfsApi.add(buffer, { progress: (prog) => console.log(`received: ${prog}`) })
      .then((response) => {
        console.log(response)
        ipfsId = response[0].hash
        this.props.onUpload(ipfsId);
      }).catch((err) => {
        console.error(err)
      })
  }

  render() {
    const previewStyle = {
      display: 'inline',
      width: 100,
      height: 100,
    };

    let dropzoneStyle = {

    };

    return (
      <section>
        <div>
          <ReactDropzone onDrop={this.onDrop.bind(this)} className="dropzone">
            {this.state.files.length == 0 &&
              <Fragment>
                <p>Upload your contract file.</p>
              </Fragment>
             }
            {this.state.files.length > 0 &&
              <Fragment>
                {this.state.files.map((file) => (
                  <img
                    alt="Preview"
                    key={file.preview}
                    src={file.preview}
                    style={previewStyle}
                  />
                ))}
              </Fragment>
            }
          </ReactDropzone>

        </div>
        <aside>
          <h2>Dropped files</h2>
          <ul>
            {
              this.state.files.map(f => <li key={f.name}>{f.name} - {f.size} bytes</li>)
            }
          </ul>
        </aside>
      </section>
    );
  }
}

export default Upload
