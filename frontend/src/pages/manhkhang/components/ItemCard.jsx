import React from 'react';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import {LocationOn} from "@mui/icons-material";

export default function MediaCard() {
    return (
        <Card sx={{maxWidth: 200, boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)'}}>
            <CardMedia
                component="div" // Use div as the component for non-image media
                sx={{width: '100%', paddingTop: '100%', position: 'relative'}}
                image="https://static.oreka.vn/500-500_0620f880-9e9f-4aa5-82e9-d500924957d8"
                alt="file"
            />
            <CardContent sx={{
                backgroundColor: 'white', padding: '24px', borderRadius: '0 0 8px 8px'}}>
                <Typography variant="body1" mb={0.5}>
                    Pin Điện Thoại BL-4U Cho Nokia 8800 Arte, Sirocco, Anakin và Nokia 515
                </Typography>
                <CardContent sx={{
                    mb: 2,
                    color: 'rgba(0, 0, 0, 0.6)',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                }}>
                    <Typography variant="body1" sx={{ oneLine: true, flex: '1' }}>
                        Nokia
                    </Typography>
                    <div sx={{
                        display: 'flex',
                        alignItems: 'center',
                        marginLeft: '8px',
                    }}>
                        <LocationOn/>
                    </div>
                </CardContent>

                <div sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px'}}>
                    <Typography variant="body1" sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1px'}}>
                        350,000đ
                    </Typography>
                </div>
            </CardContent>
        </Card>
    );
}
