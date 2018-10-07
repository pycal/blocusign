import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'
import React from 'react'
import BloomSVG from './bloom.svg'

const BloomRequest: React.SFC = props => {
  const requestData: RequestData = {
    action: "request_attestation_data",
    token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
    url: 'https://e3640e09.ngrok.io/bloom_payload',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: 'BlocUSign',
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['email'],
  }

  return (
    <div className="pure-u-1-1">
      <div className="pure-u-1-3">
        <RequestQRCode requestData={requestData} size={160} fgColor='#6067f1' bgColor='#E3B5E5'/>
      </div>
      <div className="pure-u-2-3 bloomed">
        <h2>Use your BloomID to sign</h2>
        <img src={BloomSVG} style={{width: '180px', color: '#6067f1'}}/>
      </div>
    </div>
  )
}

export default BloomRequest;