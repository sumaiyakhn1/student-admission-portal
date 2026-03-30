import React, { useState, useRef, useCallback, useEffect } from "react";
import { Camera, X, RefreshCw, Check, Loader2, AlertCircle } from "lucide-react";
import toast from "react-hot-toast";

interface CameraCaptureProps {
  onCapture: (file: File) => void;
  onClose: () => void;
  title: string;
}

const CameraCapture: React.FC<CameraCaptureProps> = ({ onCapture, onClose, title }) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [isFrontCamera, setIsFrontCamera] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const currentStreamRef = useRef<MediaStream | null>(null);

    const startCamera = useCallback(async (isFront: boolean = false) => {
    setLoading(true);
    setError(null);
    
    // Check for Secure Context (HTTPS requirement)
    if (!window.isSecureContext && window.location.hostname !== "localhost") {
        const msg = "Camera access requires a secure connection (HTTPS). Please ensure you are using HTTPS or localhost.";
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
    }

    // Check if navigator.mediaDevices is available
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        const msg = "Camera API is not supported in this browser or app. Try a different browser like Chrome or Safari.";
        setError(msg);
        toast.error(msg);
        setLoading(false);
        return;
    }

    // Stop previous stream
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach(track => track.stop());
    }

    try {
      // Robust constraints with fallbacks
      const constraints = {
        video: {
          facingMode: isFront ? "user" : "environment",
          width: { ideal: 1280, min: 640 },
          height: { ideal: 720, min: 480 }
        },
        audio: false
      };
      
      let newStream;
      try {
        newStream = await navigator.mediaDevices.getUserMedia(constraints);
      } catch (err) {
        console.warn("Retrying with simpler constraints:", err);
        // Fallback to basic video if ideal resolution fails
        newStream = await navigator.mediaDevices.getUserMedia({ 
            video: { facingMode: isFront ? "user" : "environment" },
            audio: false 
        });
      }

      currentStreamRef.current = newStream;
      
      if (videoRef.current) {
        videoRef.current.srcObject = newStream;
        // Explicitly play for mobile browsers
        try {
            await videoRef.current.play();
        } catch (playErr) {
            console.error("Video play error:", playErr);
        }
      }
      setLoading(false);
    } catch (err: any) {
      console.error("Camera error:", err);
      let errorMsg = "Could not start camera. Please check permissions and ensure you are using HTTPS.";
      if (err.name === 'NotAllowedError') errorMsg = "Camera permission denied. Please enable it in settings.";
      if (err.name === 'NotFoundError') errorMsg = "No camera found on this device.";
      
      setError(errorMsg);
      toast.error(errorMsg);
      setLoading(false);
      // We DON'T call onClose() here anymore to stop the "flash" effect.
      // The user can manually close it once they see the error.
    }
  }, []);

  useEffect(() => {
    startCamera(isFrontCamera);
    return () => {
      // Cleanup on unmount using ref
      if (currentStreamRef.current) {
        currentStreamRef.current.getTracks().forEach(track => track.stop());
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const switchCamera = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nextMode = !isFrontCamera;
    setIsFrontCamera(nextMode);
    startCamera(nextMode);
  };

  const capturePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!videoRef.current || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const video = videoRef.current;
    
    // Set canvas dimensions to match video stream
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    
    const context = canvas.getContext("2d");
    if (!context) return;

    // Flip horizontally if it's the front camera
    if (isFrontCamera) {
      context.translate(canvas.width, 0);
      context.scale(-1, 1);
    }

    context.drawImage(video, 0, 0, canvas.width, canvas.height);
    
    const dataUrl = canvas.toDataURL("image/jpeg", 0.9);
    setCapturedImage(dataUrl);
    
    // Stop camera stream
    if (currentStreamRef.current) {
      currentStreamRef.current.getTracks().forEach(track => track.stop());
      currentStreamRef.current = null;
    }
  };

  const retakePhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setCapturedImage(null);
    startCamera(isFrontCamera);
  };

  const confirmPhoto = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (!capturedImage) return;

    try {
        // Convert dataUrl to File
        const byteString = atob(capturedImage.split(',')[1]);
        const mimeString = capturedImage.split(',')[0].split(':')[1].split(';')[0];
        const ab = new ArrayBuffer(byteString.length);
        const ia = new Uint8Array(ab);
        for (let i = 0; i < byteString.length; i++) {
            ia[i] = byteString.charCodeAt(i);
        }
        const blob = new Blob([ab], { type: mimeString });
        const file = new File([blob], "captured-photo.jpg", { type: mimeString });
        
        onCapture(file);
        onClose();
    } catch (err) {
        console.error("Capture processing error:", err);
        toast.error("Failed to process image");
    }
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl w-full max-w-xl overflow-hidden shadow-2xl relative">
        {/* HEADER */}
        <div className="p-4 border-b flex justify-between items-center bg-gray-50">
          <h3 className="font-bold text-gray-800 text-sm sm:text-lg uppercase tracking-wider">Capture {title}</h3>
          <button onClick={onClose} className="p-2 hover:bg-gray-200 rounded-full transition-colors">
            <X size={20} className="text-gray-400" />
          </button>
        </div>

        {/* CAMERA VIEWPORT */}
        <div className="relative aspect-[3/4] sm:aspect-video bg-black flex items-center justify-center overflow-hidden">
          {loading && !error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-2">
              <Loader2 className="animate-spin text-orange-500" size={32} />
              <span className="text-[11px] font-bold uppercase tracking-widest text-orange-200">Initializing...</span>
            </div>
          )}

          {error && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white gap-3 p-6 text-center">
              <AlertCircle size={40} className="text-red-500" />
              <div className="space-y-1">
                <p className="text-sm font-bold text-white uppercase tracking-wider">Camera Error</p>
                <p className="text-xs text-gray-400 max-w-[250px]">{error}</p>
              </div>
              <button 
                onClick={() => startCamera(isFrontCamera)}
                className="mt-2 px-4 py-2 bg-white/10 hover:bg-white/20 rounded-full text-[10px] font-bold uppercase tracking-widest transition-colors border border-white/10"
              >
                Try Again
              </button>
            </div>
          )}

          {!capturedImage && !error && (
            <video 
              ref={videoRef} 
              autoPlay 
              playsInline 
              muted
              className={`w-full h-full object-cover ${isFrontCamera ? "scale-x-[-1]" : ""}`}
            />
          )}
          
          {capturedImage && (
            <img 
              src={capturedImage} 
              alt="Captured" 
              className="w-full h-full object-cover"
            />
          )}

          <canvas ref={canvasRef} className="hidden" />
          
          {!capturedImage && !loading && !error && (
            <div className="absolute inset-0 border-2 border-white/10 pointer-events-none flex items-center justify-center">
                <div className="w-[85%] h-[75%] border-2 border-dashed border-white/30 rounded-2xl flex items-center justify-center">
                    <div className="text-[10px] text-white/40 font-bold uppercase tracking-[0.2em]">Align document within frame</div>
                </div>
            </div>
          )}
        </div>

        {/* CONTROLS */}
        <div className="p-6 sm:p-8 flex justify-center items-center gap-6 bg-white border-t">
          {!capturedImage ? (
            <>
              <button 
                type="button"
                onClick={switchCamera}
                disabled={loading || !!error}
                className="w-14 h-14 bg-gray-50 border border-gray-100 text-gray-400 rounded-full hover:bg-gray-100 transition-all flex items-center justify-center disabled:opacity-30"
                title="Switch Camera"
              >
                <RefreshCw size={24} />
              </button>
              
              <button 
                type="button"
                onClick={capturePhoto}
                disabled={loading || !!error}
                className="w-20 h-20 bg-orange-500 text-white rounded-full flex items-center justify-center hover:bg-orange-600 transition-all shadow-xl shadow-orange-200 p-1 border-4 border-gray-50 disabled:bg-gray-200 disabled:shadow-none"
                title="Capture"
              >
                <div className="w-full h-full rounded-full border-2 border-white/20 flex items-center justify-center">
                    <Camera size={32} />
                </div>
              </button>

              <div className="w-14 shrink-0" /> {/* Spacer */}
            </>
          ) : (
            <>
              <button 
                type="button"
                onClick={retakePhoto}
                className="px-6 py-4 bg-gray-50 text-gray-500 font-bold rounded-2xl hover:bg-gray-100 transition-all flex items-center gap-2 text-xs uppercase tracking-widest"
              >
                <RefreshCw size={18} />
                Retake
              </button>
              
              <button 
                type="button"
                onClick={confirmPhoto}
                className="px-8 py-4 bg-orange-600 text-white font-bold rounded-2xl hover:bg-orange-700 transition-all shadow-lg shadow-orange-100 flex items-center gap-2 text-xs uppercase tracking-widest"
              >
                <Check size={18} />
                Upload Photo
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CameraCapture;
