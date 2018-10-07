import {RequestQRCode, RequestData} from '@bloomprotocol/share-kit'
import React from 'react'

const BloomRequest: React.SFC = props => {
  const requestData: RequestData = {
    action: "request_attestation_data",
    token: '0x8f31e48a585fd12ba58e70e03292cac712cbae39bc7eb980ec189aa88e24d043',
    url: 'https://17539714.ngrok.io/bloom_resp_relay',
    org_logo_url: 'https://bloom.co/images/notif/bloom-logo.png',
    org_name: 'BlocUSign',
    org_usage_policy_url: 'https://bloom.co/legal/terms',
    org_privacy_policy_url: 'https://bloom.co/legal/privacy',
    types: ['email'],
  }
  return <RequestQRCode requestData={requestData} size={200} fgColor='#6067f1' bgColor='#E3B5E5'/>
}

export default BloomRequest;