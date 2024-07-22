import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import { red } from '@mui/material/colors';

export default function ShopCard(props) {
  const { username, email, address, phone } = props
  const avatarUrl = "https://picsum.photos/seed/picsum/200/300.jpg";

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500], width: 100, height: 100 }} aria-label="recipe">
            <img
              src={avatarUrl}
              alt="User Avatar"
              style={{ width: 100, height: 100, borderRadius: '50%' }}
            />
          </Avatar>
        }
        title={
          <Typography variant="h4" color="text.secondary">
            {username}
          </Typography>
        }
        subheader={
          <Typography variant="body1" color="text.secondary">
            {email} <br />
            {address} <br />
            {phone}
          </Typography>
        }

      />
    </Card>
  );
}