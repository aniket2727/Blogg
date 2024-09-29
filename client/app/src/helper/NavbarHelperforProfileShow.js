import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Popover from '@mui/material/Popover'; // Use Popover instead of Dialog
import PersonIcon from '@mui/icons-material/Person';
import CancelIcon from '@mui/icons-material/Cancel';
import { blue } from '@mui/material/colors';

function ProfileDialog({ onClose, open, userInfo, anchorEl }) {
  const { email, followers, postCount } = userInfo;

  const handleClose = () => {
    onClose();
  };

  return (
    <Popover
      open={open}
      anchorEl={anchorEl}
      onClose={handleClose}
      anchorOrigin={{
        vertical: 'bottom',
        horizontal: 'center',
      }}
      transformOrigin={{
        vertical: 'top',
        horizontal: 'center',
      }}
    >
      <List sx={{ pt: 0, padding: '16px' }}>
        <ListItem>
          <Avatar sx={{ bgcolor: blue[100], color: blue[600] }}>
            <PersonIcon />
          </Avatar>
          <ListItemText primary="Email" secondary={email} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Post Count" secondary={postCount} />
        </ListItem>
        <ListItem>
          <ListItemText primary="Following" secondary={followers} />
        </ListItem>
        <ListItem>
          <Button
            variant="outlined"
            startIcon={<CancelIcon />}
            onClick={handleClose}
            style={{ margin: '0 auto', display: 'block' }}
          >
            Cancel
          </Button>
        </ListItem>
      </List>
    </Popover>
  );
}

ProfileDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  anchorEl: PropTypes.object, // Anchor element
  userInfo: PropTypes.shape({
    email: PropTypes.string.isRequired,
    followers: PropTypes.number.isRequired,
    postCount: PropTypes.number.isRequired,
  }).isRequired,
};

export default ProfileDialog;
