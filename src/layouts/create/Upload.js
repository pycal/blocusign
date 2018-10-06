import React, { Component } from 'react'
import ipfsAPI from 'ipfs-api'
import Dropzone from 'react-dropzone'
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
      files
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
    return (
      <section>
        <div className="dropzone">
          <Dropzone onDrop={this.onDrop.bind(this)}>
            <p>Try dropping some files here, or click to select files to upload.</p>
          </Dropzone>
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
