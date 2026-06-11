import { useState } from 'react';
import { useGetPhotos } from '../hooks/useQueries';
import { Button } from '@/components/ui/button';
import { X, Loader2 } from 'lucide-react';
import { useTranslation } from '../i18n';

export default function Gallery() {
  const { data: photos, isLoading } = useGetPhotos();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const { t } = useTranslation();

  const categories = [
    { id: 'all', label: t('gallery.all') },
    { id: 'hall', label: t('gallery.hall') },
    { id: 'weddings', label: t('gallery.weddings') },
    { id: 'decoration', label: t('gallery.decoration') },
    { id: 'catering', label: t('gallery.catering') },
  ];

  const filteredPhotos =
    selectedCategory === 'all'
      ? photos
      : photos?.filter((photo) => photo.categories.includes(selectedCategory));

  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
      <div className="text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4 text-primary">{t('gallery.title')}</h1>
        <p className="text-xl text-muted-foreground">{t('gallery.subtitle')}</p>
      </div>

      {/* Category Filter */}
      <div className="flex flex-wrap justify-center gap-2 mb-12">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => setSelectedCategory(category.id)}
            className={selectedCategory === category.id ? 'bg-primary' : ''}
          >
            {category.label}
          </Button>
        ))}
      </div>

      {/* Photo Grid */}
      {isLoading ? (
        <div className="flex justify-center items-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
          <span className="ml-2 text-muted-foreground">{t('gallery.loading')}</span>
        </div>
      ) : filteredPhotos && filteredPhotos.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredPhotos.map((photo) => (
            <div
              key={photo.id}
              className="group relative overflow-hidden rounded-lg shadow-lg cursor-pointer aspect-[4/3] bg-muted"
              onClick={() => setLightboxImage(photo.fileReference.getDirectURL())}
            >
              <img
                src={photo.fileReference.getDirectURL()}
                alt={photo.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/80 via-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                <div className="text-white">
                  <h3 className="font-semibold text-lg">{photo.title}</h3>
                  {photo.description && (
                    <p className="text-sm text-white/90">{photo.description}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-20">
          <p className="text-muted-foreground text-lg">{t('gallery.noPhotos')}</p>
        </div>
      )}

      {/* Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 bg-black/95 flex items-center justify-center p-4"
          onClick={() => setLightboxImage(null)}
        >
          <button
            className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 transition-colors"
            onClick={() => setLightboxImage(null)}
          >
            <X className="h-6 w-6 text-white" />
          </button>
          <img
            src={lightboxImage}
            alt="Full size"
            className="max-w-full max-h-full object-contain"
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}
    </div>
  );
}

