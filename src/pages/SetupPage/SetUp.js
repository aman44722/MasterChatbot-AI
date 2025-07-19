import React, { useState, useEffect, useRef } from 'react';
import './AdminSettings.css';
import { Box } from '@mui/material';

import { useSelector, useDispatch } from 'react-redux';
import { updateSetting, resetSettings } from '../../redux/botSettingsSlice';


import TextSettings from '../../components/Admin/ViewSetupComponent/TextSettings';
import LogoSettings from '../../components/Admin/ViewSetupComponent/LogoSettings';
import LayoutSettings from '../../components/Admin/ViewSetupComponent/LayoutSettings';
import ThemeSettings from '../../components/Admin/ViewSetupComponent/ThemeSettings';
import ChatPreview from '../../components/Admin/ViewSetupComponent/ChatPreview';

const SetUp = () => {
  const dispatch = useDispatch();
  const {
    botName,
    welcomeText,
    description,
    font,
    fontSize,
    companyLogo,
    avatar,
    botPosition,
    selectedBubbleStyle,
    borderRadius,
    textAlign,
    themeColors,
    overlayOpacity,
    chatColor,
    uploadedImage
  } = useSelector((state) => state.botSettings);


  const [activeTab, setActiveTab] = useState('text');
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);


  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('botSettings'));
    if (saved) {
      dispatch(updateSetting(saved));
    }
  }, [dispatch]);

  const botSettings = useSelector((state) => state.botSettings);

  const handleSave = () => {
    localStorage.setItem('botSettings', JSON.stringify(botSettings));
    alert('Settings saved!');
  };


  const handleReset = () => {
    localStorage.removeItem('botSettings');
    dispatch(resetSettings());
    alert('Settings reset to default!');
  };


  return (
    <Box style={{ display: 'flex', height: '84vh', marginTop: '5%', padding: '10px', width: '100%' }}>
      {/* Left Panel */}
      <Box
        className="custom-scrollbar"
        sx={{
          width: '30%',
          boxShadow: '0px 4px 20px #d8d8d8',
          borderRadius: '20px',
          borderRight: '1px solid #eee',
          overflowY: 'auto',
          background: '#f9fbfd',
        }}
      >
        {/* Tab Navigation */}
        <div style={{ position: 'sticky', top: 0, background: '#fff', padding: '16px 20px', zIndex: 9 }}>
          <div style={{ display: 'flex', gap: '10px' }}>
            {['text', 'logo', 'layout', 'themes'].map(tab => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                style={{
                  padding: '10px 20px',
                  borderRadius: '8px',
                  border: 'none',
                  background: activeTab === tab ? '#ffffff' : '#f4f4f4',
                  boxShadow: activeTab === tab ? '0 4px 8px rgba(0, 0, 0, 0.1)' : 'none',
                  fontWeight: activeTab === tab ? '600' : '500',
                  color: activeTab === tab ? '#333' : '#777',
                  cursor: 'pointer',
                }}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div style={{ flex: 1, padding: '15px', minHeight: '100vh' }}>
          {activeTab === 'text' && (
            <TextSettings
              botName={botName}
              setBotName={(value) => dispatch(updateSetting({ botName: value }))}
              welcomeText={welcomeText}
              setWelcomeText={(value) => dispatch(updateSetting({ welcomeText: value }))}
              description={description}
              setDescription={(value) => dispatch(updateSetting({ description: value }))}
              font={font}
              setFont={(value) => dispatch(updateSetting({ font: value }))}
              fontSize={fontSize}
              setFontSize={(value) => dispatch(updateSetting({ fontSize: value }))}
            />
          )}
          {activeTab === 'logo' && (
            <LogoSettings
              companyLogo={companyLogo}
              setCompanyLogo={(value) => dispatch(updateSetting({ companyLogo: value }))}
              avatar={avatar}
              setAvatar={(value) => dispatch(updateSetting({ avatar: value }))}
            />
          )}
          {activeTab === 'layout' && (
            <LayoutSettings
              botPosition={botPosition}
              setBotPosition={(value) => {
                dispatch(updateSetting({ botPosition: value }));
                setIsChatOpen(false);
              }}
              selectedBubbleStyle={selectedBubbleStyle}
              setSelectedBubbleStyle={(value) => dispatch(updateSetting({ selectedBubbleStyle: value }))}
              borderRadius={borderRadius}
              setBorderRadius={(value) => dispatch(updateSetting({ borderRadius: value }))}
              textAlign={textAlign}
              setTextAlign={(value) => dispatch(updateSetting({ textAlign: value }))}
            />
          )}
          {activeTab === 'themes' && (
            <ThemeSettings
              themeColors={themeColors}
              setThemeColors={(value) => dispatch(updateSetting({ themeColors: value }))}
              overlayOpacity={overlayOpacity}
              setOverlayOpacity={(value) => dispatch(updateSetting({ overlayOpacity: value }))}
              chatColor={chatColor}
              setChatColor={(value) => dispatch(updateSetting({ chatColor: value }))}
              uploadedImage={uploadedImage}
              setUploadedImage={(value) => dispatch(updateSetting({ uploadedImage: value }))}
            />
          )}
        </div>

        {/* Save & Reset Footer */}
        <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '16px 20px', zIndex: 9, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <p style={{ fontSize: '14px', color: '#888', margin: 0 }}>Apply Changes?</p>
          <div style={{ display: 'flex', gap: '10px' }}>
            <button onClick={handleReset} style={{ background: '#f44336', color: '#fff', padding: '10px 25px', borderRadius: '8px', border: 'none' }}>Reset</button>
            <button onClick={handleSave} style={{ background: '#4F46E5', color: '#fff', padding: '10px 25px', borderRadius: '8px', border: 'none' }}>Save</button>
          </div>
        </div>
      </Box>

      {/* Right Preview Panel */}
      <ChatPreview
        isChatOpen={isChatOpen}
        setIsChatOpen={setIsChatOpen}
        botPosition={botPosition}
        welcomeText={welcomeText}
        companyLogo={companyLogo}
        botName={botName}
        description={description}
        font={font}
        themeColors={themeColors}
        avatar={avatar}
        selectedBubbleStyle={selectedBubbleStyle}
        borderRadius={borderRadius}
        textAlign={textAlign}
        isHeaderExpanded={isHeaderExpanded}
        setIsHeaderExpanded={setIsHeaderExpanded}
        overlayOpacity={overlayOpacity}
      />
    </Box>
  );
};

export default SetUp;
