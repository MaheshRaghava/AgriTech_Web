
import React from 'react';

interface MapMarker {
  position: {
    lat: number;
    lng: number;
  };
  title: string;
}

interface GoogleMapComponentProps {
  apiKey?: string;
  center: {
    lat: number;
    lng: number;
  };
  zoom: number;
  markers?: MapMarker[];
}

const GoogleMapComponent: React.FC<GoogleMapComponentProps> = ({
  apiKey,
  center,
  zoom,
  markers = []
}) => {
  return (
    <div className="rounded-lg overflow-hidden h-full w-full">
      <iframe
        title="Google Map"
        width="100%"
        height="100%"
        frameBorder={0}
        src={`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3818.8646815663163!2d81.5225125!3d16.5659653!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a37cd4e8d1d1d8d%3A0xab52da15615ac690!2sVishnu%20Institute%20of%20Technology!5e0!3m2!1sen!2sin!4v1685640417893!5m2!1sen!2sin`}
        style={{ border: 0 }}
        allowFullScreen={true}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
};

export default GoogleMapComponent;
