import { useEffect, useRef, useState } from 'react';
import { BrowserMultiFormatReader, NotFoundException, ChecksumException, FormatException } from '@zxing/library';

type BarcodeScannerProps = {
  onDetected: (code: string) => void;
  isScanning: boolean;
};

export default function BarcodeScanner({ onDetected, isScanning }: BarcodeScannerProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const codeReader = new BrowserMultiFormatReader();
    let videoElement: HTMLVideoElement | null = null;

    if (isScanning) {
      if (videoRef.current) {
        videoElement = videoRef.current;

        codeReader
          .decodeFromConstraints(
            {
              audio: false,
              video: { facingMode: 'environment' }
            },
            videoElement,
            (result, error) => {
              if (result) {
                // Successfully detected barcode
                onDetected(result.getText());
              }
              
              if (error) {
                if (
                  !(error instanceof NotFoundException) && 
                  !(error instanceof ChecksumException) && 
                  !(error instanceof FormatException)
                ) {
                  setError('Error scanning barcode. Please try again.');
                  console.error(error);
                }
                // Note: We ignore not found errors as they just mean no barcode found in current frame
              }
            }
          )
          .catch((err) => {
            setError('Failed to access camera. Please check permissions.');
            console.error(err);
          });
      }
    }

    return () => {
      if (isScanning) {
        codeReader.reset();
        if (videoElement) {
          const tracks = videoElement.srcObject as MediaStream;
          if (tracks) {
            tracks.getTracks().forEach(track => track.stop());
          }
        }
      }
    };
  }, [isScanning, onDetected]);

  return (
    <div className="relative w-full">
      {error && <div className="text-red-500 mb-2">{error}</div>}
      <div className="relative aspect-[4/3] w-full rounded-lg overflow-hidden bg-gray-800">
        <video 
          ref={videoRef} 
          className={`w-full h-full object-cover ${isScanning ? 'block' : 'hidden'}`} 
        />
        {isScanning && (
          <div className="absolute inset-0 border-2 border-dashed border-yellow-400 opacity-60 z-10">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white text-sm font-medium px-2 py-1 rounded bg-black/50 backdrop-blur-sm">
                Position barcode in frame
              </div>
            </div>
          </div>
        )}
        {!isScanning && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-white text-sm">
              Camera off
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
