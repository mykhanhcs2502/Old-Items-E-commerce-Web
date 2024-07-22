import * as React from 'react';
import { styled } from '@mui/material/styles';
import Card from '@mui/material/Card';
import CardHeader from '@mui/material/CardHeader';
import Avatar from '@mui/material/Avatar';
import { red } from '@mui/material/colors';
import Typography from '@mui/material/Typography';

export default function FeedbackCard(props) {
  const {buyer_name, comment, star, review_date} = props;

  return (
    <Card>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {buyer_name[0]}
          </Avatar>
        }
        title={buyer_name}
        subheader={
          <Typography variant="body2" color="text.secondary">
            {comment} <br />
            {review_date} 
          </Typography>
        }
      />
    </Card>
  );
};