import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { IoStatsChart } from 'react-icons/io5';

const style = {
    position: 'absolute' as 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const buttonStyle = {
    position: 'absolute' as 'absolute',
    top: 0,
    right: 0
}

const box = {
    position: 'relative' as 'relative',
}

export default function BlockLayout({
    children
}: {
    children: React.ReactNode
}) {
    const [clicks, setClicks] = React.useState(0)
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const handleClick = (e: any) => {
        setClicks(clicks + 1)
    }

    return (
        <div onClick={handleClick} style={box}>
            {children}
            <div>
                <Button onClick={handleOpen} sx={buttonStyle}>{<IoStatsChart />}</Button>
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        User Stats
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Clicks: {clicks}
                    </Typography>
                    </Box>
                </Modal>
            </div>
        </div>
    )
}