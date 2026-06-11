import { useTranslation } from '../i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, Wind, Car, Sparkles, Utensils, Zap, Music, Home } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function BanquetPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/assets/generated/hall-exterior.dim_800x600.jpg"
          alt="Banquet Hall"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('banquet.title')}</h1>
            <p className="text-xl text-white/90">{t('banquet.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Features */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('banquet.capacity')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('banquet.capacityDesc')}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Wind className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{t('banquet.acOptions')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('banquet.acDesc')}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Car className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('banquet.parking')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('banquet.parkingDesc')}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-secondary/10">
                  <Sparkles className="h-6 w-6 text-secondary" />
                </div>
                <CardTitle>{t('banquet.decoration')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('banquet.decorationDesc')}</p>
            </CardContent>
          </Card>

          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex items-center gap-3">
                <div className="p-3 rounded-full bg-primary/10">
                  <Utensils className="h-6 w-6 text-primary" />
                </div>
                <CardTitle>{t('banquet.catering')}</CardTitle>
              </div>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{t('banquet.cateringDesc')}</p>
            </CardContent>
          </Card>
        </div>

        {/* Additional Amenities */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">{t('banquet.amenities')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Music className="h-8 w-8 text-primary" />
              <p className="font-medium">{t('banquet.amenity1')}</p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Utensils className="h-8 w-8 text-secondary" />
              <p className="font-medium">{t('banquet.amenity2')}</p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Home className="h-8 w-8 text-primary" />
              <p className="font-medium">{t('banquet.amenity3')}</p>
            </div>
            <div className="flex items-center gap-3 p-4 bg-muted/30 rounded-lg">
              <Zap className="h-8 w-8 text-secondary" />
              <p className="font-medium">{t('banquet.amenity4')}</p>
            </div>
          </div>
        </div>

        {/* Gallery Section */}
        <div className="mt-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Hall Views</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <img
              src="/assets/generated/banquet-dining.dim_800x600.jpg"
              alt="Dining Area"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
            <img
              src="/assets/generated/decoration-setup.dim_800x600.jpg"
              alt="Decoration"
              className="w-full h-80 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="mt-16 text-center">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link to="/booking">{t('hero.bookNow')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

