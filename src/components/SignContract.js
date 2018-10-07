import React, { Component } from 'react'
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutline';

class SignContract extends Component {
  constructor(props, context) {
    super(props);
    this.state = {}
  }

  render() {
    return (
      <div>
      {this.state.scanned_qr &&
      <Paper elevation={1}>
        <Typography variant="headline" component="h3">
          <br/>Getting ready to sign the contract!
        </Typography>

          <List>
            {this.state.merkle_proofed &&
              <ListItem>
                <Avatar>
                  <CheckCircleIcon />
                </Avatar>
                <ListItemText primary="Validating identity provider merkle proof" />
              </ListItem>
            }
            {this.state.signature_extracted &&
              <ListItem>
                <Avatar>
                  <CheckCircleIcon />
                </Avatar>
                <ListItemText primary="Extracting user address from Bloom signature" />
              </ListItem>
            }
            {this.state.execute_contract &&
              <ListItem>
                <Avatar>
                  <CheckCircleIcon />
                </Avatar>
                <ListItemText primary="Signing contract" />
              </ListItem>
            }
          </List>

      </Paper>
      }
      </div>
    )
  }
}

export default SignContract