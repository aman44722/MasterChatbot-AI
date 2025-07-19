import React, { useState, useEffect, useRef } from 'react';
import './AdminSettings.css';
import { Box } from '@mui/material';

import TextSettings from '../../components/Admin/ViewSetupComponent/TextSettings';
import LogoSettings from '../../components/Admin/ViewSetupComponent/LogoSettings';
import LayoutSettings from '../../components/Admin/ViewSetupComponent/LayoutSettings';
import ThemeSettings from '../../components/Admin/ViewSetupComponent/ThemeSettings';
import ChatPreview from '../../components/Admin/ViewSetupComponent/ChatPreview';

const SetUp = () => {
  const [activeTab, setActiveTab] = useState('text');
  const [botName, setBotName] = useState('chatbot');
  const [welcomeText, setWelcomeText] = useState('Hey');
  const [description, setDescription] = useState('Discriptions');
  const [font, setFont] = useState('Nanum Gothic Coding');
  const [fontSize, setFontSize] = useState('14px');
  const [companyLogo, setCompanyLogo] = useState('https://cdn-icons-png.flaticon.com/512/4712/4712027.png');
  const [avatar, setAvatar] = useState(null);
  const [botPosition, setBotPosition] = useState('right');
  const [selectedBubbleStyle, setSelectedBubbleStyle] = useState('style1');
  const [borderRadius, setBorderRadius] = useState('10');
  const [textAlign, setTextAlign] = useState('left');
  const [themeColors, setThemeColors] = useState({
    header: "#006C74",
    question: "#ffffff",
    answer: "#007bff",
    option: "#007bff",
    optionBorder: "#444c5c"
  });
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isHeaderExpanded, setIsHeaderExpanded] = useState(false);
  const [overlayOpacity, setOverlayOpacity] = useState(0);
  const [chatColor, setChatColor] = useState({ r: 255, g: 255, b: 255, a: 1 });
  const [uploadedImage, setUploadedImage] = useState(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem('botSettings'));
    if (saved) {
      setCompanyLogo(saved.companyLogo || companyLogo);
      setAvatar(saved.avatar || avatar);
      setBotName(saved.botName || botName);
      setWelcomeText(saved.welcomeText || welcomeText);
      setDescription(saved.description || description);
      setFont(saved.font || font);
      setFontSize(saved.fontSize || fontSize);
      setBotPosition(saved.botPosition || botPosition);
      setSelectedBubbleStyle(saved.selectedBubbleStyle || selectedBubbleStyle);
      setBorderRadius(saved.borderRadius || borderRadius);
      setTextAlign(saved.textAlign || textAlign);
      setThemeColors(saved.themeColors || themeColors);
    }
  }, []);

  const handleSave = () => {
    localStorage.setItem(
      'botSettings',
      JSON.stringify({
        companyLogo, avatar, botName, welcomeText, description,
        font, fontSize, botPosition, selectedBubbleStyle,
        borderRadius, textAlign, themeColors
      })
    );
    alert('Settings saved!');
  };

  const handleReset = () => {
    localStorage.removeItem('botSettings');
    setCompanyLogo('https://cdn-icons-png.flaticon.com/512/4712/4712027.png');
    setAvatar(null);
    setBotName('chatbot');
    setWelcomeText('Hey');
    setDescription('Discriptions');
    setFont('Nanum Gothic Coding');
    setFontSize('14px');
    setBotPosition('right');
    setSelectedBubbleStyle('style1');
    setBorderRadius('10');
    setTextAlign('left');
    setThemeColors({
      header: "#006C74",
      question: "#ffffff",
      answer: "#007bff",
      option: "#007bff",
      optionBorder: "#444c5c"
    });
    setOverlayOpacity(0);
    setChatColor({ r: 255, g: 255, b: 255, a: 1 });
    setUploadedImage(null);
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
              setBotName={setBotName}
              welcomeText={welcomeText}
              setWelcomeText={setWelcomeText}
              description={description}
              setDescription={setDescription}
              font={font}
              setFont={setFont}
              fontSize={fontSize}
              setFontSize={setFontSize}
            />
          )}
          {activeTab === 'logo' && (
            <LogoSettings
              companyLogo={companyLogo}
              setCompanyLogo={setCompanyLogo}
              avatar={avatar}
              setAvatar={setAvatar}
            />
          )}
          {activeTab === 'layout' && (
            <LayoutSettings
              botPosition={botPosition}
              setBotPosition={setBotPosition}
              selectedBubbleStyle={selectedBubbleStyle}
              setSelectedBubbleStyle={setSelectedBubbleStyle}
              borderRadius={borderRadius}
              setBorderRadius={setBorderRadius}
              textAlign={textAlign}
              setTextAlign={setTextAlign}
            />
          )}
          {activeTab === 'themes' && (
            <ThemeSettings
              themeColors={themeColors}
              setThemeColors={setThemeColors}
              overlayOpacity={overlayOpacity}
              setOverlayOpacity={setOverlayOpacity}
              chatColor={chatColor}
              setChatColor={setChatColor}
              uploadedImage={uploadedImage}
              setUploadedImage={setUploadedImage}
            />
          )}
        </div>

        {/* Save & Reset Footer */}
        <div style={{ position: 'sticky', bottom: 0, background: '#fff', padding: '16px 20px', zIndex: 9, display:'flex', justifyContent:'space-between', alignItems:'center' }}>
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
