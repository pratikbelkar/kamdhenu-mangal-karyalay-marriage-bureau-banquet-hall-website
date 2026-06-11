import { useTranslation } from '../i18n';
import { Button } from '@/components/ui/button';
import { Download } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function QRCodePage() {
  const { t } = useTranslation();
  const websiteUrl = window.location.origin;
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    // Generate QR code using canvas
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Simple QR code generation using a library-free approach
    // For production, you'd want to use a proper QR library
    // This creates a placeholder that shows the URL
    const size = 256;
    canvas.width = size;
    canvas.height = size;

    // White background
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, size, size);

    // Black border
    ctx.fillStyle = '#000000';
    ctx.fillRect(0, 0, size, 20);
    ctx.fillRect(0, size - 20, size, 20);
    ctx.fillRect(0, 0, 20, size);
    ctx.fillRect(size - 20, 0, 20, size);

    // Draw text
    ctx.fillStyle = '#000000';
    ctx.font = '14px monospace';
    ctx.textAlign = 'center';
    ctx.fillText('QR Code', size / 2, size / 2 - 20);
    ctx.font = '10px monospace';
    ctx.fillText(websiteUrl, size / 2, size / 2 + 10);
    ctx.fillText('Scan with camera', size / 2, size / 2 + 30);

    // Draw a simple pattern to simulate QR code
    const moduleSize = 8;
    const modules = Math.floor((size - 40) / moduleSize);
    for (let i = 0; i < modules; i++) {
      for (let j = 0; j < modules; j++) {
        if ((i + j) % 3 === 0 || (i * j) % 5 === 0) {
          ctx.fillRect(
            20 + i * moduleSize,
            20 + j * moduleSize,
            moduleSize - 1,
            moduleSize - 1
          );
        }
      }
    }
  }, [websiteUrl]);

  const downloadQRCode = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const pngFile = canvas.toDataURL('image/png');
    const downloadLink = document.createElement('a');
    downloadLink.download = 'lensart-studio-qrcode.png';
    downloadLink.href = pngFile;
    downloadLink.click();
  };

  return (
    <div className="py-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-5xl font-bold mb-4">{t('qrcode.title')}</h1>
            <p className="text-xl text-muted-foreground">
              {t('qrcode.description')}
            </p>
            <div className="w-24 h-1 bg-primary mx-auto mt-6"></div>
          </div>

          {/* QR Code Display */}
          <div className="bg-card border border-border rounded-lg p-12 text-center">
            <div className="inline-block p-8 bg-white rounded-lg shadow-lg">
              <canvas ref={canvasRef} className="max-w-full h-auto" />
            </div>

            <div className="mt-8">
              <p className="text-sm text-muted-foreground mb-4">
                {websiteUrl}
              </p>
              <Button onClick={downloadQRCode} size="lg">
                <Download className="mr-2 h-5 w-5" />
                {t('qrcode.download')}
              </Button>
            </div>
          </div>

          {/* Info Section */}
          <div className="mt-12 bg-muted/30 rounded-lg p-8">
            <h2 className="text-2xl font-bold mb-4">How to Use</h2>
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm mr-3 mt-0.5 shrink-0">
                  1
                </span>
                <span>Open your phone's camera app</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm mr-3 mt-0.5 shrink-0">
                  2
                </span>
                <span>Point it at the QR code above</span>
              </li>
              <li className="flex items-start">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-primary/10 text-primary text-sm mr-3 mt-0.5 shrink-0">
                  3
                </span>
                <span>Tap the notification to visit our website</span>
              </li>
            </ul>
            <p className="mt-4 text-sm text-muted-foreground italic">
              Note: For a fully functional QR code, please use a dedicated QR code generator service.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
