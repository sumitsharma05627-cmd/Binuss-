import React from 'react';
import { SocialCommandProvider } from './context/SocialCommandContext';
import { SocialCommandCenterLayout } from './components/SocialCommandCenterLayout';

interface SocialCommandAppProps {
  onBackToWebsite: () => void;
}

const SocialCommandApp: React.FC<SocialCommandAppProps> = ({ onBackToWebsite }) => {
  return (
    <SocialCommandProvider>
      <SocialCommandCenterLayout onBackToWebsite={onBackToWebsite} />
    </SocialCommandProvider>
  );
};

export default SocialCommandApp;
