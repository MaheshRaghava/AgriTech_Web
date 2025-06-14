
import { useEffect, useRef } from 'react';
import { Card } from '@/components/ui/card';

// Define Three.js types
declare global {
  interface Window {
    THREE: any;
  }
}

const AgricultureTech3D = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load Three.js from CDN
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js';
    script.async = true;
    document.body.appendChild(script);

    script.onload = initThreeJS;

    return () => {
      if (script.parentNode) {
        script.parentNode.removeChild(script);
      }
      // Clean up Three.js scene
      if (containerRef.current) {
        while (containerRef.current.firstChild) {
          containerRef.current.removeChild(containerRef.current.firstChild);
        }
      }
    };
  }, []);

  const initThreeJS = () => {
    if (!containerRef.current || !window.THREE) return;

    const width = containerRef.current.clientWidth;
    const height = 400; // Fixed height for the 3D canvas

    // Create scene
    const scene = new window.THREE.Scene();
    scene.background = new window.THREE.Color(0xf0f8ff);

    // Create camera
    const camera = new window.THREE.PerspectiveCamera(75, width / height, 0.1, 1000);
    camera.position.z = 20;
    camera.position.y = 5;

    // Create renderer
    const renderer = new window.THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(width, height);
    containerRef.current.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new window.THREE.AmbientLight(0x404040, 2);
    scene.add(ambientLight);

    const directionalLight = new window.THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // Create ground (green field)
    const groundGeometry = new window.THREE.PlaneGeometry(100, 100);
    const groundMaterial = new window.THREE.MeshLambertMaterial({ color: 0x7cfc00 });
    const ground = new window.THREE.Mesh(groundGeometry, groundMaterial);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -2;
    scene.add(ground);

    // Create tractor (simplified)
    const tractorGroup = new window.THREE.Group();
    
    // Tractor body
    const bodyGeometry = new window.THREE.BoxGeometry(4, 2, 3);
    const bodyMaterial = new window.THREE.MeshLambertMaterial({ color: 0xff0000 });
    const tractorBody = new window.THREE.Mesh(bodyGeometry, bodyMaterial);
    tractorBody.position.y = 1;
    tractorGroup.add(tractorBody);
    
    // Tractor cab
    const cabGeometry = new window.THREE.BoxGeometry(2, 1.5, 2);
    const cabMaterial = new window.THREE.MeshLambertMaterial({ color: 0x333333 });
    const tractorCab = new window.THREE.Mesh(cabGeometry, cabMaterial);
    tractorCab.position.set(-0.5, 2.5, 0);
    tractorGroup.add(tractorCab);
    
    // Wheels
    const wheelGeometry = new window.THREE.CylinderGeometry(1, 1, 0.5, 16);
    const wheelMaterial = new window.THREE.MeshLambertMaterial({ color: 0x000000 });
    
    const wheel1 = new window.THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel1.position.set(1.5, 0, 1.5);
    wheel1.rotation.z = Math.PI / 2;
    tractorGroup.add(wheel1);
    
    const wheel2 = new window.THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel2.position.set(1.5, 0, -1.5);
    wheel2.rotation.z = Math.PI / 2;
    tractorGroup.add(wheel2);
    
    const wheel3 = new window.THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel3.position.set(-1.5, 0, 1.5);
    wheel3.rotation.z = Math.PI / 2;
    tractorGroup.add(wheel3);
    
    const wheel4 = new window.THREE.Mesh(wheelGeometry, wheelMaterial);
    wheel4.position.set(-1.5, 0, -1.5);
    wheel4.rotation.z = Math.PI / 2;
    tractorGroup.add(wheel4);
    
    scene.add(tractorGroup);
    tractorGroup.position.x = -5;

    // Create simple trees
    const createTree = (x: number, z: number) => {
      const treeGroup = new window.THREE.Group();
      
      // Tree trunk
      const trunkGeometry = new window.THREE.CylinderGeometry(0.2, 0.2, 2, 8);
      const trunkMaterial = new window.THREE.MeshLambertMaterial({ color: 0x8B4513 });
      const trunk = new window.THREE.Mesh(trunkGeometry, trunkMaterial);
      trunk.position.y = 0;
      treeGroup.add(trunk);
      
      // Tree top
      const topGeometry = new window.THREE.ConeGeometry(1, 2, 8);
      const topMaterial = new window.THREE.MeshLambertMaterial({ color: 0x228B22 });
      const top = new window.THREE.Mesh(topGeometry, topMaterial);
      top.position.y = 2;
      treeGroup.add(top);
      
      treeGroup.position.set(x, 0, z);
      scene.add(treeGroup);
    };
    
    // Create some trees
    createTree(5, 5);
    createTree(8, -3);
    createTree(-8, 4);
    createTree(-5, -5);
    createTree(10, 2);

    // Add crops (represented as simple green rectangles)
    const createCropRow = (x: number, z: number, length: number) => {
      const cropGeometry = new window.THREE.BoxGeometry(length, 0.5, 1);
      const cropMaterial = new window.THREE.MeshLambertMaterial({ color: 0x32CD32 });
      const crop = new window.THREE.Mesh(cropGeometry, cropMaterial);
      crop.position.set(x, -1.5, z);
      scene.add(crop);
    };
    
    // Create rows of crops
    for (let i = -10; i <= 10; i += 2) {
      if (i > -3 && i < 3) continue; // Leave space for tractor
      createCropRow(i, 10, 1);
      createCropRow(i, 8, 1);
      createCropRow(i, 6, 1);
    }

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate the scene slightly for a dynamic feel
      scene.rotation.y += 0.002;
      
      // Move the tractor back and forth
      tractorGroup.position.z = Math.sin(Date.now() * 0.001) * 5;
      
      renderer.render(scene, camera);
    };
    
    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      const newWidth = containerRef.current.clientWidth;
      
      camera.aspect = newWidth / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(newWidth, height);
    };
    
    window.addEventListener('resize', handleResize);
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  };

  return (
    <Card className="w-full overflow-hidden shadow-lg border-0 mb-8">
      <div 
        ref={containerRef} 
        className="w-full h-[400px] bg-gray-100 flex items-center justify-center"
      >
        <div className="text-center text-gray-500">
          <p>Loading 3D Agriculture Technology...</p>
        </div>
      </div>
    </Card>
  );
};

export default AgricultureTech3D;
