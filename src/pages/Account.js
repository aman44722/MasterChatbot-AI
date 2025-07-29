import { Box } from '@mui/material';
import { useState } from 'react';

import AccountSettingSidebar from '../components/Common/AccountSetting/AccountSettingSidebar';
import ProfileDetails from '../components/Common/AccountSetting/AccountProfile/ProfileDetails';
import ChangePassword from '../components/Common/AccountSetting/AccountChangePasswprd/ChangePassword';
import CreateDepartment from '../components/Common/AccountSetting/AccountCreateDepartment/CreateDepartment';

export default function Account() {
    const [selected, setSelected] = useState();

    return (
        <Box sx={{ display: 'flex', height: '84vh', padding: '10px', width: '100%', gap: '10px', }}>
            <AccountSettingSidebar selected={selected} setSelected={setSelected} />
            <Box >
                {selected === 'Your Profile' && <ProfileDetails />}
                {selected === 'Change Password' && <ChangePassword />}
                {selected === 'Create Department' && <CreateDepartment />}
                {/* Add other components here conditionally */}
            </Box>
        </Box >
    );
}
