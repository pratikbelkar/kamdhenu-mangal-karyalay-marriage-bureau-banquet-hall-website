import { useTranslation } from '../i18n';
import { Card, CardContent } from '@/components/ui/card';
import { Heart, Users, Award, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function AboutPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[400px] overflow-hidden">
        <img
          src="/assets/generated/wedding-couple.dim_800x600.jpg"
          alt="About Us"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/70 to-primary/90" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">{t('about.title')}</h1>
            <p className="text-xl text-white/90">{t('about.subtitle')}</p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Description */}
        <div className="max-w-4xl mx-auto mb-16">
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            {t('about.description1')}
          </p>
          <p className="text-lg text-muted-foreground mb-4 leading-relaxed">
            {t('about.description2')}
          </p>
          <p className="text-lg text-muted-foreground leading-relaxed">
            {t('about.description3')}
          </p>
        </div>

        {/* Mission */}
        <div className="bg-gradient-to-r from-primary/10 to-secondary/10 rounded-lg p-8 mb-16">
          <div className="max-w-3xl mx-auto text-center">
            <Heart className="h-12 w-12 text-primary mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4 text-primary">{t('about.ourMission')}</h2>
            <p className="text-lg text-muted-foreground">{t('about.missionText')}</p>
          </div>
        </div>

        {/* Why Choose Us */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">{t('about.whyChooseUs')}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Award className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium">{t('about.reason1')}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Users className="h-8 w-8 text-secondary" />
                </div>
                <p className="font-medium">{t('about.reason2')}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-4">
                  <Heart className="h-8 w-8 text-primary" />
                </div>
                <p className="font-medium">{t('about.reason3')}</p>
              </CardContent>
            </Card>

            <Card className="border-2 border-primary/20">
              <CardContent className="p-6 text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-secondary/10 mb-4">
                  <Shield className="h-8 w-8 text-secondary" />
                </div>
                <p className="font-medium">{t('about.reason4')}</p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Gallery Preview */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold mb-8 text-center text-primary">Our Venue</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <img
              src="/assets/generated/hall-exterior.dim_800x600.jpg"
              alt="Hall Exterior"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src="/assets/generated/banquet-dining.dim_800x600.jpg"
              alt="Dining Area"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
            <img
              src="/assets/generated/decoration-setup.dim_800x600.jpg"
              alt="Decoration"
              className="w-full h-64 object-cover rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* CTA */}
        <div className="text-center">
          <Button size="lg" asChild className="bg-primary hover:bg-primary/90">
            <Link to="/contact">{t('pricing.contactUs')}</Link>
          </Button>
        </div>
      </div>
    </div>
  );
}

