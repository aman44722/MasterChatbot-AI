import { Box } from '@mui/material'
import React from 'react'
// import ChatPreview from '../../components/Admin/ViewSetupComponent/ChatPreview'
import FlowSidebarComponent from '../../components/Admin/FlowSetupComponent/FlowSidebarComponent'
import FlowCanvasComponent from '../../components/Admin/FlowSetupComponent/FlowCanvasComponent'
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend';

const FlowSetup = () => {
   return (
      <DndProvider backend={HTML5Backend}>
         <Box sx={{ display: 'flex', marginTop: '5%' }}>
            <FlowSidebarComponent />
            <FlowCanvasComponent />
         </Box>
      </DndProvider>

   )
}

export default FlowSetup
