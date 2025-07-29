import '../../../../pages/SetupPage/AdminSettings.css';
import { fetchUserById, updateUserDetails } from '../../../../api/authApi';
import { useEffect, useState } from 'react';
import { Typography } from '@mui/material';

export default function ChangePassword() {
    const [password, setPassword] = useState({
        oldPassword: '',
        newPassword: '',
        confirmPassword: '',
    });

    const labelStyle = {
        display: "flex",
        alignItems: "center",
        fontSize: "13px",
        color: "#999",
        fontWeight: 600,
    };

    const inputStyle = {
        width: "100%",
        padding: "10px 12px",
        border: "1px solid #ddd",
        borderRadius: "8px",
        fontSize: "14px",
        outline: "none",
        boxSizing: "border-box",
        marginTop: '15px'
    };

    // Put Api Call
    const handleUpdate = async () => {
    };


    return (
        <div
            className="custom-scrollbar"
            style={{
                display: 'flex',
                justifyContent: 'start',
                gap: '40px',
                width: '100%',
                boxShadow: '0px 4px 20px #d8d8d8',
                borderRadius: '20px',
                borderRight: '1px solid #eee',
                overflowY: 'auto',
                width: '50%',
                padding: "20px"
            }}
        >
            <div className="mock-browser-layout" style={{ display: 'flex', flexDirection: 'column', width: '80%', gap: '30px' }}>
                <Typography variant='h5'><strong>Change Password</strong></Typography>
                <div>
                    <label style={labelStyle} htmlFor="oldPassword">Old Password</label>
                    <input style={inputStyle} type="password" id="oldPassword" value={password.oldPassword} onChange={(e) => setPassword({ ...password, oldPassword: e.target.value })} />
                </div>
                <div>
                    <label style={labelStyle} htmlFor="newPassword">New Password</label>
                    <input style={inputStyle} type="password" id="newPassword" value={password.newPassword} onChange={(e) => setPassword({ ...password, newPassword: e.target.value })} />
                </div><div>
                    <label style={labelStyle} htmlFor="currentPassword">Current Password</label>
                    <input style={inputStyle} type="password" id="currentPassword" value={password.currentPassword} onChange={(e) => setPassword({ ...password, currentPassword: e.target.value })} />
                </div>
                <button onClick={handleUpdate} style={{ background: '#4F46E5', color: '#fff', padding: '10px 25px', borderRadius: '8px', border: 'none' }} type="button">Update</button>

                {/* <button style={{ background: '#4F46E5', color: '#fff', padding: '10px 25px', borderRadius: '8px', border: 'none' }} type="button">Save</button> */}
            </div>
        </div >
    );
}
