import { useInternetIdentity } from '../hooks/useInternetIdentity';
import { useGetCallerUserProfile, useIsCallerAdmin } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { Heart, Menu, X, User, LogOut, Shield, Globe } from 'lucide-react';
import { useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { Link, useLocation } from '@tanstack/react-router';
import { useTranslation } from '../i18n';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

export default function Header() {
  const { login, clear, loginStatus, identity } = useInternetIdentity();
  const { data: userProfile } = useGetCallerUserProfile();
  const { data: isAdmin } = useIsCallerAdmin();
  const queryClient = useQueryClient();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { t, i18n } = useTranslation();

  const isAuthenticated = !!identity;
  const disabled = loginStatus === 'logging-in';

  const handleAuth = async () => {
    if (isAuthenticated) {
      await clear();
      queryClient.clear();
    } else {
      try {
        await login();
      } catch (error: any) {
        console.error('Login error:', error);
        if (error.message === 'User is already authenticated') {
          await clear();
          setTimeout(() => login(), 300);
        }
      }
    }
    setMobileMenuOpen(false);
  };

  const changeLanguage = (lng: string) => {
    i18n.changeLanguage(lng);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2 hover:opacity-80 transition-opacity">
            <Heart className="h-7 w-7 text-primary fill-primary" />
            <div className="flex flex-col leading-tight">
              <span className="text-lg font-bold tracking-tight text-primary">कामधेनू</span>
              <span className="text-xs text-muted-foreground">Mangal Karyalay</span>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-1">
            <Button variant={isActive('/') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/">{t('nav.home')}</Link>
            </Button>
            <Button variant={isActive('/banquet') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/banquet">{t('nav.banquet')}</Link>
            </Button>
            <Button variant={isActive('/marriage-bureau') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/marriage-bureau">{t('nav.marriage')}</Link>
            </Button>
            <Button variant={isActive('/pricing') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/pricing">{t('nav.pricing')}</Link>
            </Button>
            <Button variant={isActive('/gallery') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/gallery">{t('nav.gallery')}</Link>
            </Button>
            <Button variant={isActive('/about') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/about">{t('nav.about')}</Link>
            </Button>
            <Button variant={isActive('/contact') ? 'default' : 'ghost'} asChild size="sm">
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>
            {isAdmin && (
              <Button variant={isActive('/admin') ? 'default' : 'ghost'} asChild size="sm">
                <Link to="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('nav.admin')}
                </Link>
              </Button>
            )}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm">
                  <Globe className="h-4 w-4 mr-2" />
                  {i18n.language === 'en' ? 'EN' : 'मर'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem onClick={() => changeLanguage('en')}>
                  English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => changeLanguage('mr')}>
                  मराठी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {isAuthenticated && userProfile && (
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <User className="h-4 w-4" />
                <span>{userProfile.name}</span>
              </div>
            )}
            <Button
              onClick={handleAuth}
              disabled={disabled}
              variant={isAuthenticated ? 'outline' : 'default'}
              size="sm"
            >
              {disabled ? (
                'Loading...'
              ) : isAuthenticated ? (
                <>
                  <LogOut className="h-4 w-4 mr-2" />
                  {t('nav.logout')}
                </>
              ) : (
                t('nav.login')
              )}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-md hover:bg-accent"
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/40">
            <Button
              variant={isActive('/') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/">{t('nav.home')}</Link>
            </Button>
            <Button
              variant={isActive('/banquet') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/banquet">{t('nav.banquet')}</Link>
            </Button>
            <Button
              variant={isActive('/marriage-bureau') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/marriage-bureau">{t('nav.marriage')}</Link>
            </Button>
            <Button
              variant={isActive('/pricing') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/pricing">{t('nav.pricing')}</Link>
            </Button>
            <Button
              variant={isActive('/gallery') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/gallery">{t('nav.gallery')}</Link>
            </Button>
            <Button
              variant={isActive('/about') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/about">{t('nav.about')}</Link>
            </Button>
            <Button
              variant={isActive('/contact') ? 'default' : 'ghost'}
              className="w-full justify-start"
              asChild
              onClick={() => setMobileMenuOpen(false)}
            >
              <Link to="/contact">{t('nav.contact')}</Link>
            </Button>
            {isAdmin && (
              <Button
                variant={isActive('/admin') ? 'default' : 'ghost'}
                className="w-full justify-start"
                asChild
                onClick={() => setMobileMenuOpen(false)}
              >
                <Link to="/admin">
                  <Shield className="h-4 w-4 mr-2" />
                  {t('nav.admin')}
                </Link>
              </Button>
            )}
            
            <div className="pt-2 border-t border-border/40 space-y-2">
              {/* Language Switcher Mobile */}
              <div className="px-3 py-2">
                <p className="text-sm text-muted-foreground mb-2">Language</p>
                <div className="flex gap-2">
                  <Button
                    variant={i18n.language === 'en' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeLanguage('en')}
                  >
                    EN
                  </Button>
                  <Button
                    variant={i18n.language === 'mr' ? 'default' : 'outline'}
                    size="sm"
                    onClick={() => changeLanguage('mr')}
                  >
                    मर
                  </Button>
                </div>
              </div>

              {isAuthenticated && userProfile && (
                <div className="flex items-center space-x-2 text-sm text-muted-foreground px-3 py-2">
                  <User className="h-4 w-4" />
                  <span>{userProfile.name}</span>
                </div>
              )}
              <Button
                onClick={handleAuth}
                disabled={disabled}
                variant={isAuthenticated ? 'outline' : 'default'}
                className="w-full"
              >
                {disabled ? 'Loading...' : isAuthenticated ? t('nav.logout') : t('nav.login')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

