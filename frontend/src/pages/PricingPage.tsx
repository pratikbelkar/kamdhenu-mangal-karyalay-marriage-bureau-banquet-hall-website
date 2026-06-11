import { useTranslation } from '../i18n';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from '@tanstack/react-router';

export default function PricingPage() {
  const { t } = useTranslation();

  return (
    <div className="min-h-screen py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('pricing.title')}</h1>
          <p className="text-xl text-muted-foreground">{t('pricing.subtitle')}</p>
        </div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Basic Package */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{t('pricing.basic')}</CardTitle>
              <div className="text-4xl font-bold text-primary">{t('pricing.basicPrice')}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.basicFeature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.basicFeature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.basicFeature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.basicFeature4')}</span>
                </li>
              </ul>
              <Button className="w-full mt-6" asChild>
                <Link to="/booking">{t('hero.bookNow')}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Standard Package */}
          <Card className="border-2 border-secondary shadow-xl scale-105 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-secondary text-primary px-4 py-1 rounded-full text-sm font-semibold">
              Popular
            </div>
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{t('pricing.standard')}</CardTitle>
              <div className="text-4xl font-bold text-secondary">{t('pricing.standardPrice')}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.standardFeature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.standardFeature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.standardFeature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.standardFeature4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-secondary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.standardFeature5')}</span>
                </li>
              </ul>
              <Button className="w-full mt-6 bg-secondary hover:bg-secondary/90 text-primary" asChild>
                <Link to="/booking">{t('hero.bookNow')}</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Premium Package */}
          <Card className="border-2 border-primary/20 hover:border-primary/40 transition-all hover:shadow-xl">
            <CardHeader className="text-center pb-8">
              <CardTitle className="text-2xl mb-2">{t('pricing.premium')}</CardTitle>
              <div className="text-4xl font-bold text-primary">{t('pricing.premiumPrice')}</div>
            </CardHeader>
            <CardContent>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature1')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature2')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature3')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature4')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature5')}</span>
                </li>
                <li className="flex items-start gap-2">
                  <Check className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                  <span>{t('pricing.premiumFeature6')}</span>
                </li>
              </ul>
              <Button className="w-full mt-6" asChild>
                <Link to="/booking">{t('hero.bookNow')}</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Custom Package CTA */}
        <Card className="bg-gradient-to-r from-primary to-primary/80 text-white">
          <CardContent className="p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">{t('pricing.customPackage')}</h2>
            <p className="text-lg mb-6 text-white/90">{t('pricing.customDesc')}</p>
            <Button size="lg" variant="secondary" asChild>
              <Link to="/contact">{t('pricing.contactUs')}</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

