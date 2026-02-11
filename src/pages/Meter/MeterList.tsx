
import React from 'react';
import { useSearchParams } from 'react-router-dom';
import UploadMeter from './UploadMeter';
import InstantUpload from '../InstantPower/InstantUpload';
import UploadAlarm from '../Alarm/UploadAlarm';

const MeterList: React.FC = () => {
  const [searchParams] = useSearchParams();
  const activeTab = searchParams.get('tab') || 'meter';

  const renderContent = () => {
    switch (activeTab) {
      case 'instant':
        return <InstantUpload />;
      case 'alarm':
        return <UploadAlarm />;
      case 'meter':
      default:
        return <UploadMeter />;
    }
  };

  return (
    <div className="h-full flex flex-col bg-white overflow-hidden">
      {renderContent()}
    </div>
  );
};

export default MeterList;
