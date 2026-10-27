import React, { useState } from 'react';
import { ScreenTab, LkpdItem } from './types';
import { AppLayout } from './components/common/AppLayout';
import { Header } from './components/common/Header';
import { BottomNav } from './components/common/BottomNav';
import { LoginScreen } from './components/screens/LoginScreen';
import { HomeScreen } from './components/screens/HomeScreen';
import { MateriScreen } from './components/screens/MateriScreen';
import { LkpdScreen } from './components/screens/LkpdScreen';
import { SimulasiScreen } from './components/screens/SimulasiScreen';
import { FenomenaTesScreen } from './components/screens/FenomenaTesScreen';
import { PanduanProfilScreen } from './components/screens/PanduanProfilScreen';
import { AiTutorModal } from './components/modals/AiTutorModal';
import { ArCameraModal } from './components/modals/ArCameraModal';
import { LkpdModal } from './components/modals/LkpdModal';

export const App: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(true);
  const [userEmail, setUserEmail] = useState<string>('fadhil.siswa@ariwephys.edu');
  const [currentTab, setCurrentTab] = useState<ScreenTab>('beranda');

  // Modals
  const [isAiOpen, setIsAiOpen] = useState<boolean>(false);
  const [aiInitialQuery, setAiInitialQuery] = useState<string | undefined>(undefined);
  const [isArOpen, setIsArOpen] = useState<boolean>(false);
  const [activeLkpdWorksheet, setActiveLkpdWorksheet] = useState<LkpdItem | null>(null);

  const handleLoginSuccess = (email: string) => {
    setUserEmail(email);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
  };

  const handleOpenAi = (query?: string) => {
    setAiInitialQuery(query);
    setIsAiOpen(true);
  };

  const handleOpenAr = () => {
    setIsArOpen(true);
  };

  const handleOpenWorksheet = (lkpd: LkpdItem) => {
    setActiveLkpdWorksheet(lkpd);
  };

  const handleWorksheetSubmit = (lkpdId: number, score: number) => {
    // Worksheet submit handled
  };

  return (
    <AppLayout
      onOpenAr={handleOpenAr}
      onOpenAi={() => handleOpenAi()}
    >
      {!isLoggedIn ? (
        <LoginScreen onLoginSuccess={handleLoginSuccess} />
      ) : (
        <div className="flex flex-col min-h-full flex-1 bg-slate-50 relative">
          {/* Top Sticky Header */}
          <Header
            currentTab={currentTab}
            onTabChange={setCurrentTab}
            onOpenAr={handleOpenAr}
            onOpenAi={() => handleOpenAi()}
            onLogout={handleLogout}
          />

          {/* Active Screen Tab View */}
          <main className="flex-1 w-full">
            {currentTab === 'beranda' && (
              <HomeScreen
                onNavigate={setCurrentTab}
                onOpenAr={handleOpenAr}
                onOpenAi={handleOpenAi}
              />
            )}
            {currentTab === 'materi' && <MateriScreen />}
            {currentTab === 'lkpd' && (
              <LkpdScreen onOpenWorksheet={handleOpenWorksheet} />
            )}
            {currentTab === 'simulasi' && <SimulasiScreen />}
            {currentTab === 'fenomena' && (
              <FenomenaTesScreen onAskAi={handleOpenAi} />
            )}
            {currentTab === 'panduan' && (
              <PanduanProfilScreen
                onOpenAr={handleOpenAr}
                onLogout={handleLogout}
              />
            )}
          </main>

          {/* Bottom Navigation Bar */}
          <BottomNav
            currentTab={currentTab}
            onTabChange={setCurrentTab}
          />
        </div>
      )}

      {/* Global Modals */}
      <AiTutorModal
        isOpen={isAiOpen}
        onClose={() => {
          setIsAiOpen(false);
          setAiInitialQuery(undefined);
        }}
        initialQuery={aiInitialQuery}
      />

      <ArCameraModal
        isOpen={isArOpen}
        onClose={() => setIsArOpen(false)}
      />

      <LkpdModal
        isOpen={!!activeLkpdWorksheet}
        lkpd={activeLkpdWorksheet}
        onClose={() => setActiveLkpdWorksheet(null)}
        onSubmitSuccess={handleWorksheetSubmit}
      />
    </AppLayout>
  );
};

export default App;
