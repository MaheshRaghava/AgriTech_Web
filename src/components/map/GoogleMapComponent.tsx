
import { useEffect, useRef } from 'react';

// Define the window object with Google Maps
declare global {
  interface Window {
    google: any;
    initMap: () => void;
  }
}

const GoogleMapComponent = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  useEffect(() => {
    // Function to initialize the map
    const initMap = () => {
      if (!mapRef.current || !window.google) {
        console.log("Map reference or Google Maps API not available");
        return;
      }
      
      // Vishnu Institute of Technology, Bhimavaram coordinates (more precise)
      const vishnuInstitute = { lat: 16.445401, lng: 81.790770 };
      
      const mapOptions = {
        center: vishnuInstitute,
        zoom: 15,
        mapTypeId: window.google.maps.MapTypeId.ROADMAP,
        mapTypeControl: true,
        fullscreenControl: true,
        streetViewControl: true,
        zoomControl: true,
      };
      
      try {
        // Create the map
        const map = new window.google.maps.Map(mapRef.current, mapOptions);
        mapInstanceRef.current = map;
        
        // Create info window content with better styling
        const contentString = `
          <div style="padding: 12px; max-width: 300px; font-family: Arial, sans-serif;">
            <h3 style="margin: 0 0 8px; font-size: 18px; color: #3b8249;">Vishnu Institute of Technology</h3>
            <p style="margin: 0 0 8px; font-size: 14px; color: #4A5568;">Bhimavaram, Andhra Pradesh, India</p>
            <p style="margin: 0; font-size: 13px; color: #718096;">
              A premier engineering institution offering technical education with modern facilities and industry connections.
            </p>
          </div>
        `;
        
        // Create info window
        const infoWindow = new window.google.maps.InfoWindow({
          content: contentString,
          maxWidth: 300,
        });
        
        // Add marker
        const marker = new window.google.maps.Marker({
          position: vishnuInstitute,
          map: map,
          title: 'Vishnu Institute of Technology',
          animation: window.google.maps.Animation.DROP,
        });
        
        // Add click listener to marker
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
        });
        
        // Open info window by default with a slight delay for better UX
        setTimeout(() => {
          infoWindow.open(map, marker);
        }, 500);

        console.log("Map initialized successfully");
      } catch (error) {
        console.error("Error initializing map:", error);
        displayMapError();
      }
    };

    const displayMapError = () => {
      const mapContainer = mapRef.current;
      if (mapContainer) {
        mapContainer.innerHTML = `
          <div class="flex flex-col items-center justify-center h-full text-gray-500">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-12 w-12 mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p class="text-center">Unable to load the map. Please check your internet connection.</p>
          </div>
        `;
      }
    };

    // Function to load the Google Maps script
    const loadGoogleMapsScript = () => {
      // Expose initMap globally so the callback can access it
      window.initMap = initMap;
      
      // Check if the script is already added
      const existingScript = document.getElementById('google-maps-script');
      if (existingScript) {
        console.log("Google Maps script already loaded");
        return;
      }
      
      console.log("Loading Google Maps script");
      const googleMapScript = document.createElement('script');
      googleMapScript.id = 'google-maps-script';
      googleMapScript.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyBIwzALxUPNbatRBj3Xi1Uhp0fFzwWNBkE&libraries=places&callback=initMap`;
      googleMapScript.async = true;
      googleMapScript.defer = true;
      document.body.appendChild(googleMapScript);
      
      // Add error handler
      googleMapScript.onerror = () => {
        console.error("Failed to load Google Maps script");
        displayMapError();
      };
    };

    // Check if Google Maps API is already loaded
    if (window.google?.maps) {
      console.log("Google Maps API already loaded");
      initMap();
    } else {
      loadGoogleMapsScript();
    }
    
    return () => {
      // Cleanup the global function when component unmounts
      if (window.initMap) {
        // @ts-ignore
        delete window.initMap;
      }
    };
  }, []);

  return (
    <div className="relative w-full h-full">
      <div ref={mapRef} className="w-full h-full rounded-lg shadow-md"></div>
      <div className="absolute bottom-2 right-2 bg-white py-1 px-2 text-xs text-gray-500 rounded shadow-sm">
        © Google Maps
      </div>
    </div>
  );
};

export default GoogleMapComponent;
