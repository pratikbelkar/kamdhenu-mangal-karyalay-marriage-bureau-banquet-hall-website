import { Button } from '@/components/ui/button';
import { Camera, Calendar, Image } from 'lucide-react';

interface HeroProps {
  onNavigate: (section: 'gallery' | 'booking') => void;
}

export default function Hero({ onNavigate }: HeroProps) {
  return (
    <div className="relative">
      {/* Hero Banner */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner.dim_1200x600.jpg"
          alt="Photography Banner"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/40 to-black/70" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Capturing Life's
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-white to-white/70">
                Beautiful Moments
              </span>
            </h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90 max-w-2xl mx-auto">
              Professional photography services for weddings, portraits, events, and more
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => onNavigate('gallery')}
                className="text-lg px-8 py-6"
              >
                <Image className="mr-2 h-5 w-5" />
                View Gallery
              </Button>
              <Button
                size="lg"
                variant="outline"
                onClick={() => onNavigate('booking')}
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Calendar className="mr-2 h-5 w-5" />
                Book a Session
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid md:grid-cols-3 gap-8">
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Camera className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Professional Quality</h3>
            <p className="text-muted-foreground">
              High-end equipment and expert techniques to capture stunning images
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Calendar className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Booking</h3>
            <p className="text-muted-foreground">
              Simple online scheduling system with flexible time slots
            </p>
          </div>
          
          <div className="text-center p-6">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
              <Image className="h-8 w-8 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Diverse Portfolio</h3>
            <p className="text-muted-foreground">
              Specializing in weddings, portraits, events, and landscape photography
            </p>
          </div>
        </div>
      </div>

      {/* About Section */}
      <div className="bg-muted/30 py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img
                src="/assets/generated/photographer-profile.dim_300x300.jpg"
                alt="Photographer"
                className="rounded-lg shadow-2xl w-full max-w-md mx-auto"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold mb-6">About the Artist</h2>
              <p className="text-lg text-muted-foreground mb-4">
                With over a decade of experience in professional photography, I specialize in 
                capturing authentic moments that tell your unique story.
              </p>
              <p className="text-lg text-muted-foreground mb-6">
                From intimate portraits to grand celebrations, every project receives my full 
                attention and creative vision to deliver images you'll treasure forever.
              </p>
              <Button size="lg" onClick={() => onNavigate('booking')}>
                Book Your Session
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
