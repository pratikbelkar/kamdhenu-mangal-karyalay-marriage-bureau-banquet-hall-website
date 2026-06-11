import { Button } from '@/components/ui/button';
import { Heart, MapPin, Users, Sparkles, Phone, MessageCircle } from 'lucide-react';
import { Link } from '@tanstack/react-router';
import { useTranslation } from '../i18n';
import { Card, CardContent } from '@/components/ui/card';
import { SiFacebook, SiInstagram } from 'react-icons/si';

export default function HomePage() {
  const { t } = useTranslation();

  const whatsappNumber = '+919876543210'; // Replace with actual number
  const phoneNumber = '+919876543210'; // Replace with actual number

  return (
    <div className="relative">
      {/* Hero Banner */}
      <div className="relative h-[600px] overflow-hidden">
        <img
          src="/assets/generated/hero-banner-hall.dim_1200x600.jpg"
          alt="Kamdhenu Mangal Karyalay"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary/60 to-primary/90" />
        
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4 max-w-4xl">
            <div className="mb-6 inline-flex items-center justify-center">
              <Heart className="h-16 w-16 text-secondary fill-secondary animate-pulse" />
            </div>
            <h1 className="text-4xl md:text-6xl font-bold mb-4 tracking-tight">
              {t('hero.title')}
              <span className="block text-secondary mt-2">
                {t('hero.subtitle')}
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-white/95 max-w-2xl mx-auto">
              {t('hero.description')}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-6 bg-secondary hover:bg-secondary/90 text-primary">
                <Link to="/booking">
                  <Heart className="mr-2 h-5 w-5" />
                  {t('hero.bookNow')}
                </Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer">
                  <MessageCircle className="mr-2 h-5 w-5" />
                  {t('hero.enquireWhatsApp')}
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                asChild
                className="text-lg px-8 py-6 bg-white/10 backdrop-blur-sm border-white/20 text-white hover:bg-white/20"
              >
                <Link to="/marriage-bureau">
                  <Users className="mr-2 h-5 w-5" />
                  {t('hero.registerBureau')}
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Services</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need for your perfect celebration
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Heart className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.venue.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.venue.desc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Sparkles className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.catering.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.catering.desc')}
              </p>
            </CardContent>
          </Card>
          
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Sparkles className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.decoration.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.decoration.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <MapPin className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.parking.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.parking.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                <Users className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.matchmaking.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.matchmaking.desc')}
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-lg">
            <CardContent className="text-center p-6">
              <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                <Heart className="h-8 w-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">{t('features.experience.title')}</h3>
              <p className="text-muted-foreground">
                {t('features.experience.desc')}
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Gallery Preview */}
      <div className="bg-gradient-to-b from-muted/30 to-background py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4 text-primary">Our Venue</h2>
            <p className="text-lg text-muted-foreground">
              Take a glimpse of our beautiful banquet hall
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/generated/wedding-ceremony.dim_800x600.jpg"
                alt="Wedding Ceremony"
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Wedding Ceremonies</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/generated/banquet-dining.dim_800x600.jpg"
                alt="Banquet Dining"
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Dining Area</p>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-lg shadow-lg group">
              <img
                src="/assets/generated/decoration-setup.dim_800x600.jpg"
                alt="Decoration"
                className="w-full h-64 object-cover transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 to-transparent flex items-end p-4">
                <p className="text-white font-semibold">Decoration Setup</p>
              </div>
            </div>
          </div>
          <div className="text-center mt-8">
            <Button size="lg" asChild variant="outline" className="border-primary text-primary hover:bg-primary hover:text-white">
              <Link to="/gallery">{t('common.viewMore')}</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-primary text-white py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Ready to Book Your Event?</h2>
          <p className="text-lg mb-8 text-white/90 max-w-2xl mx-auto">
            Contact us today to discuss your requirements and reserve your date
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" asChild className="bg-secondary hover:bg-secondary/90 text-primary">
              <a href={`tel:${phoneNumber}`}>
                <Phone className="mr-2 h-5 w-5" />
                {t('contact.callNow')}
              </a>
            </Button>
            <Button size="lg" variant="outline" asChild className="bg-white/10 border-white text-white hover:bg-white hover:text-primary">
              <Link to="/contact">{t('pricing.contactUs')}</Link>
            </Button>
          </div>
          <div className="mt-8 flex items-center justify-center gap-4">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              <SiFacebook className="h-6 w-6" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="text-white hover:text-secondary transition-colors">
              <SiInstagram className="h-6 w-6" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

