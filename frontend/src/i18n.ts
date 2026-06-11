// Custom i18n implementation without external dependencies
type TranslationKey = string;
type Translations = Record<string, string>;
type LanguageResources = Record<string, Translations>;

const resources: LanguageResources = {
  en: {
    // Navigation
    'nav.home': 'Home',
    'nav.gallery': 'Gallery',
    'nav.banquet': 'Banquet Hall',
    'nav.marriage': 'Marriage Bureau',
    'nav.pricing': 'Pricing',
    'nav.about': 'About Us',
    'nav.contact': 'Contact',
    'nav.admin': 'Admin',
    'nav.login': 'Login',
    'nav.logout': 'Logout',
    
    // Hero Section
    'hero.title': 'Perfect Venue for Your',
    'hero.subtitle': 'Special Moments',
    'hero.description': 'Kamdhenu Mangal Karyalay - Your trusted partner for weddings, celebrations, and matchmaking services',
    'hero.bookNow': 'Book Now',
    'hero.enquireWhatsApp': 'Enquire on WhatsApp',
    'hero.registerBureau': 'Register for Marriage Bureau',
    
    // Features
    'features.venue.title': 'Premium Venue',
    'features.venue.desc': 'Spacious banquet hall with AC/Non-AC options, accommodating 50-500 guests',
    'features.catering.title': 'Catering Services',
    'features.catering.desc': 'Delicious multi-cuisine catering with customizable menu options',
    'features.decoration.title': 'Decoration & Setup',
    'features.decoration.desc': 'Professional decoration services to make your event memorable',
    'features.parking.title': 'Ample Parking',
    'features.parking.desc': 'Spacious parking facility for your guests convenience',
    'features.matchmaking.title': 'Trusted Matchmaking',
    'features.matchmaking.desc': 'Safe and reliable marriage bureau services with verified profiles',
    'features.experience.title': 'Years of Experience',
    'features.experience.desc': 'Serving the community with trust and quality for over a decade',
    
    // About Section
    'about.title': 'About Kamdhenu Mangal Karyalay',
    'about.subtitle': 'Your Trusted Partner for Life\'s Special Moments',
    'about.description1': 'Kamdhenu Mangal Karyalay has been serving the community for years with dedication and excellence. We provide premium banquet hall facilities and trusted marriage bureau services.',
    'about.description2': 'Our commitment to quality, attention to detail, and personalized service has made us the preferred choice for weddings, celebrations, and matchmaking in the region.',
    'about.description3': 'With state-of-the-art facilities, experienced staff, and a track record of successful events, we ensure your special moments are celebrated perfectly.',
    'about.ourMission': 'Our Mission',
    'about.missionText': 'To provide exceptional venue and matchmaking services that create lasting memories and meaningful relationships.',
    'about.whyChooseUs': 'Why Choose Us',
    'about.reason1': 'Premium facilities with modern amenities',
    'about.reason2': 'Experienced and professional staff',
    'about.reason3': 'Customizable packages to suit your needs',
    'about.reason4': 'Trusted marriage bureau with verified profiles',
    
    // Banquet Hall
    'banquet.title': 'Banquet Hall Details',
    'banquet.subtitle': 'A Perfect Venue for Your Celebrations',
    'banquet.capacity': 'Seating Capacity',
    'banquet.capacityDesc': '50 to 500 guests',
    'banquet.acOptions': 'AC/Non-AC Options',
    'banquet.acDesc': 'Both air-conditioned and non-AC halls available',
    'banquet.parking': 'Parking Facility',
    'banquet.parkingDesc': 'Spacious parking for 100+ vehicles',
    'banquet.decoration': 'Decoration Services',
    'banquet.decorationDesc': 'Professional decoration and stage setup',
    'banquet.catering': 'Catering Services',
    'banquet.cateringDesc': 'Multi-cuisine catering with customizable menus',
    'banquet.amenities': 'Additional Amenities',
    'banquet.amenity1': 'Sound system and lighting',
    'banquet.amenity2': 'Separate dining area',
    'banquet.amenity3': 'Bridal room',
    'banquet.amenity4': 'Generator backup',
    
    // Marriage Bureau
    'marriage.title': 'Marriage Bureau Services',
    'marriage.subtitle': 'Safe and Trusted Matchmaking',
    'marriage.description': 'Our marriage bureau provides reliable matchmaking services with verified profiles. We understand the importance of finding the right life partner and work with dedication to help families find suitable matches.',
    'marriage.register': 'Register for Marriage Bureau',
    'marriage.features': 'Our Services',
    'marriage.feature1': 'Verified profiles with background checks',
    'marriage.feature2': 'Personalized matchmaking assistance',
    'marriage.feature3': 'Confidential and secure process',
    'marriage.feature4': 'Regular profile updates',
    'marriage.feature5': 'Family counseling support',
    'marriage.feature6': 'Post-marriage follow-up',
    'marriage.howItWorks': 'How It Works',
    'marriage.step1': 'Register with us',
    'marriage.step2': 'Profile verification',
    'marriage.step3': 'Receive suitable matches',
    'marriage.step4': 'Meet and decide',
    
    // Pricing
    'pricing.title': 'Pricing & Packages',
    'pricing.subtitle': 'Choose the Perfect Package for Your Event',
    'pricing.basic': 'Basic Package',
    'pricing.standard': 'Standard Package',
    'pricing.premium': 'Premium Package',
    'pricing.basicPrice': '₹25,000',
    'pricing.standardPrice': '₹50,000',
    'pricing.premiumPrice': '₹1,00,000',
    'pricing.basicFeature1': 'Hall rental (4 hours)',
    'pricing.basicFeature2': 'Basic decoration',
    'pricing.basicFeature3': 'Seating for 100 guests',
    'pricing.basicFeature4': 'Basic sound system',
    'pricing.standardFeature1': 'Hall rental (6 hours)',
    'pricing.standardFeature2': 'Premium decoration',
    'pricing.standardFeature3': 'Seating for 250 guests',
    'pricing.standardFeature4': 'Sound & lighting',
    'pricing.standardFeature5': 'Catering (veg)',
    'pricing.premiumFeature1': 'Hall rental (full day)',
    'pricing.premiumFeature2': 'Luxury decoration',
    'pricing.premiumFeature3': 'Seating for 500 guests',
    'pricing.premiumFeature4': 'Premium sound & lighting',
    'pricing.premiumFeature5': 'Catering (veg & non-veg)',
    'pricing.premiumFeature6': 'Photography & videography',
    'pricing.customPackage': 'Need a Custom Package?',
    'pricing.customDesc': 'Contact us for personalized packages tailored to your specific requirements',
    'pricing.contactUs': 'Contact Us',
    
    // Gallery
    'gallery.title': 'Photo Gallery',
    'gallery.subtitle': 'Glimpses of Our Venue and Events',
    'gallery.all': 'All',
    'gallery.hall': 'Hall Setup',
    'gallery.weddings': 'Weddings',
    'gallery.decoration': 'Decorations',
    'gallery.catering': 'Catering',
    'gallery.loading': 'Loading photos...',
    'gallery.noPhotos': 'No photos available',
    
    // Booking
    'booking.title': 'Book Your Event',
    'booking.subtitle': 'Reserve Your Date Today',
    'booking.form.name': 'Full Name',
    'booking.form.email': 'Email Address',
    'booking.form.phone': 'Phone Number',
    'booking.form.service': 'Event Type',
    'booking.form.date': 'Event Date',
    'booking.form.time': 'Preferred Time',
    'booking.form.message': 'Special Requirements (Optional)',
    'booking.form.submit': 'Submit Booking',
    'booking.form.submitting': 'Submitting...',
    'booking.services.wedding': 'Wedding Reception',
    'booking.services.engagement': 'Engagement Ceremony',
    'booking.services.birthday': 'Birthday Party',
    'booking.services.anniversary': 'Anniversary Celebration',
    'booking.services.corporate': 'Corporate Event',
    'booking.services.other': 'Other Event',
    'booking.myBookings': 'My Bookings',
    'booking.noBookings': 'No bookings yet',
    'booking.status': 'Status',
    'booking.loginRequired': 'Please login to book an event',
    
    // Contact
    'contact.title': 'Get in Touch',
    'contact.subtitle': 'We\'re Here to Help You Plan Your Perfect Event',
    'contact.phone': 'Phone',
    'contact.email': 'Email',
    'contact.address': 'Address',
    'contact.addressText': 'Kamdhenu Mangal Karyalay, Main Road, City',
    'contact.social': 'Connect With Us',
    'contact.hours': 'Business Hours',
    'contact.hoursDesc': 'Monday - Sunday: 9:00 AM - 9:00 PM',
    'contact.callNow': 'Call Now',
    'contact.whatsapp': 'WhatsApp',
    'contact.form.title': 'Send Us a Message',
    'contact.form.name': 'Your Name',
    'contact.form.email': 'Your Email',
    'contact.form.phone': 'Your Phone',
    'contact.form.message': 'Your Message',
    'contact.form.submit': 'Send Message',
    'contact.form.submitting': 'Sending...',
    'contact.location': 'Our Location',
    
    // QR Code
    'qrcode.title': 'Scan to Visit',
    'qrcode.description': 'Scan this QR code with your mobile device to visit our website',
    'qrcode.download': 'Download QR Code',
    
    // Admin
    'admin.title': 'Admin Dashboard',
    'admin.photos': 'Photos',
    'admin.bookings': 'Bookings',
    'admin.payments': 'Payments',
    'admin.timeSlots': 'Time Slots',
    
    // Common
    'common.loading': 'Loading...',
    'common.error': 'An error occurred',
    'common.success': 'Success!',
    'common.cancel': 'Cancel',
    'common.save': 'Save',
    'common.delete': 'Delete',
    'common.edit': 'Edit',
    'common.close': 'Close',
    'common.viewMore': 'View More',
    'common.learnMore': 'Learn More',
  },
  mr: {
    // Navigation
    'nav.home': 'मुख्यपृष्ठ',
    'nav.gallery': 'गॅलरी',
    'nav.banquet': 'बँक्वेट हॉल',
    'nav.marriage': 'विवाह मंडळ',
    'nav.pricing': 'किंमत',
    'nav.about': 'आमच्याबद्दल',
    'nav.contact': 'संपर्क',
    'nav.admin': 'प्रशासक',
    'nav.login': 'लॉगिन',
    'nav.logout': 'लॉगआउट',
    
    // Hero Section
    'hero.title': 'तुमच्या खास क्षणांसाठी',
    'hero.subtitle': 'परिपूर्ण मंगल कार्यालय',
    'hero.description': 'कामधेनू मंगल कार्यालय - लग्न, समारंभ आणि विवाह सेवांसाठी तुमचा विश्वासू साथीदार',
    'hero.bookNow': 'आता बुक करा',
    'hero.enquireWhatsApp': 'व्हॉट्सअॅपवर चौकशी करा',
    'hero.registerBureau': 'विवाह मंडळासाठी नोंदणी करा',
    
    // Features
    'features.venue.title': 'प्रीमियम व्हेन्यू',
    'features.venue.desc': 'AC/Non-AC पर्यायांसह प्रशस्त बँक्वेट हॉल, 50-500 पाहुण्यांसाठी',
    'features.catering.title': 'केटरिंग सेवा',
    'features.catering.desc': 'सानुकूल मेनू पर्यायांसह स्वादिष्ट बहु-पाककृती केटरिंग',
    'features.decoration.title': 'सजावट आणि सेटअप',
    'features.decoration.desc': 'तुमचा कार्यक्रम संस्मरणीय बनवण्यासाठी व्यावसायिक सजावट सेवा',
    'features.parking.title': 'भरपूर पार्किंग',
    'features.parking.desc': 'तुमच्या पाहुण्यांच्या सोयीसाठी प्रशस्त पार्किंग सुविधा',
    'features.matchmaking.title': 'विश्वासू मॅचमेकिंग',
    'features.matchmaking.desc': 'सत्यापित प्रोफाइलसह सुरक्षित आणि विश्वासार्ह विवाह मंडळ सेवा',
    'features.experience.title': 'वर्षांचा अनुभव',
    'features.experience.desc': 'एका दशकाहून अधिक काळ विश्वास आणि गुणवत्तेसह समाजाची सेवा करत आहोत',
    
    // About Section
    'about.title': 'कामधेनू मंगल कार्यालयाबद्दल',
    'about.subtitle': 'जीवनातील खास क्षणांसाठी तुमचा विश्वासू साथीदार',
    'about.description1': 'कामधेनू मंगल कार्यालय वर्षानुवर्षे समर्पण आणि उत्कृष्टतेसह समाजाची सेवा करत आहे. आम्ही प्रीमियम बँक्वेट हॉल सुविधा आणि विश्वासू विवाह मंडळ सेवा प्रदान करतो.',
    'about.description2': 'गुणवत्तेची आमची वचनबद्धता, तपशीलाकडे लक्ष आणि वैयक्तिक सेवा यामुळे आम्ही या प्रदेशातील लग्न, समारंभ आणि मॅचमेकिंगसाठी पसंतीची निवड बनलो आहोत.',
    'about.description3': 'अत्याधुनिक सुविधा, अनुभवी कर्मचारी आणि यशस्वी कार्यक्रमांच्या ट्रॅक रेकॉर्डसह, आम्ही तुमचे खास क्षण परिपूर्णपणे साजरे केले जातील याची खात्री करतो.',
    'about.ourMission': 'आमचे ध्येय',
    'about.missionText': 'चिरस्थायी आठवणी आणि अर्थपूर्ण नातेसंबंध निर्माण करणाऱ्या अपवादात्मक व्हेन्यू आणि मॅचमेकिंग सेवा प्रदान करणे.',
    'about.whyChooseUs': 'आम्हाला का निवडावे',
    'about.reason1': 'आधुनिक सुविधांसह प्रीमियम सुविधा',
    'about.reason2': 'अनुभवी आणि व्यावसायिक कर्मचारी',
    'about.reason3': 'तुमच्या गरजेनुसार सानुकूल पॅकेजेस',
    'about.reason4': 'सत्यापित प्रोफाइलसह विश्वासू विवाह मंडळ',
    
    // Banquet Hall
    'banquet.title': 'बँक्वेट हॉल तपशील',
    'banquet.subtitle': 'तुमच्या समारंभांसाठी एक परिपूर्ण व्हेन्यू',
    'banquet.capacity': 'बसण्याची क्षमता',
    'banquet.capacityDesc': '50 ते 500 पाहुणे',
    'banquet.acOptions': 'AC/Non-AC पर्याय',
    'banquet.acDesc': 'वातानुकूलित आणि नॉन-AC दोन्ही हॉल उपलब्ध',
    'banquet.parking': 'पार्किंग सुविधा',
    'banquet.parkingDesc': '100+ वाहनांसाठी प्रशस्त पार्किंग',
    'banquet.decoration': 'सजावट सेवा',
    'banquet.decorationDesc': 'व्यावसायिक सजावट आणि स्टेज सेटअप',
    'banquet.catering': 'केटरिंग सेवा',
    'banquet.cateringDesc': 'सानुकूल मेनूसह बहु-पाककृती केटरिंग',
    'banquet.amenities': 'अतिरिक्त सुविधा',
    'banquet.amenity1': 'ध्वनी प्रणाली आणि प्रकाश',
    'banquet.amenity2': 'स्वतंत्र जेवणाचे क्षेत्र',
    'banquet.amenity3': 'वधू खोली',
    'banquet.amenity4': 'जनरेटर बॅकअप',
    
    // Marriage Bureau
    'marriage.title': 'विवाह मंडळ सेवा',
    'marriage.subtitle': 'सुरक्षित आणि विश्वासू मॅचमेकिंग',
    'marriage.description': 'आमचे विवाह मंडळ सत्यापित प्रोफाइलसह विश्वासार्ह मॅचमेकिंग सेवा प्रदान करते. योग्य जीवनसाथी शोधण्याचे महत्त्व आम्हाला समजते आणि कुटुंबांना योग्य जुळणी शोधण्यात मदत करण्यासाठी समर्पणाने काम करतो.',
    'marriage.register': 'विवाह मंडळासाठी नोंदणी करा',
    'marriage.features': 'आमच्या सेवा',
    'marriage.feature1': 'पार्श्वभूमी तपासणीसह सत्यापित प्रोफाइल',
    'marriage.feature2': 'वैयक्तिक मॅचमेकिंग सहाय्य',
    'marriage.feature3': 'गोपनीय आणि सुरक्षित प्रक्रिया',
    'marriage.feature4': 'नियमित प्रोफाइल अपडेट',
    'marriage.feature5': 'कौटुंबिक समुपदेशन समर्थन',
    'marriage.feature6': 'विवाहोत्तर फॉलो-अप',
    'marriage.howItWorks': 'हे कसे कार्य करते',
    'marriage.step1': 'आमच्याकडे नोंदणी करा',
    'marriage.step2': 'प्रोफाइल सत्यापन',
    'marriage.step3': 'योग्य जुळणी प्राप्त करा',
    'marriage.step4': 'भेटा आणि निर्णय घ्या',
    
    // Pricing
    'pricing.title': 'किंमत आणि पॅकेजेस',
    'pricing.subtitle': 'तुमच्या कार्यक्रमासाठी परिपूर्ण पॅकेज निवडा',
    'pricing.basic': 'मूलभूत पॅकेज',
    'pricing.standard': 'मानक पॅकेज',
    'pricing.premium': 'प्रीमियम पॅकेज',
    'pricing.basicPrice': '₹25,000',
    'pricing.standardPrice': '₹50,000',
    'pricing.premiumPrice': '₹1,00,000',
    'pricing.basicFeature1': 'हॉल भाडे (4 तास)',
    'pricing.basicFeature2': 'मूलभूत सजावट',
    'pricing.basicFeature3': '100 पाहुण्यांसाठी बसण्याची व्यवस्था',
    'pricing.basicFeature4': 'मूलभूत ध्वनी प्रणाली',
    'pricing.standardFeature1': 'हॉल भाडे (6 तास)',
    'pricing.standardFeature2': 'प्रीमियम सजावट',
    'pricing.standardFeature3': '250 पाहुण्यांसाठी बसण्याची व्यवस्था',
    'pricing.standardFeature4': 'ध्वनी आणि प्रकाश',
    'pricing.standardFeature5': 'केटरिंग (शाकाहारी)',
    'pricing.premiumFeature1': 'हॉल भाडे (पूर्ण दिवस)',
    'pricing.premiumFeature2': 'लक्झरी सजावट',
    'pricing.premiumFeature3': '500 पाहुण्यांसाठी बसण्याची व्यवस्था',
    'pricing.premiumFeature4': 'प्रीमियम ध्वनी आणि प्रकाश',
    'pricing.premiumFeature5': 'केटरिंग (शाकाहारी आणि मांसाहारी)',
    'pricing.premiumFeature6': 'फोटोग्राफी आणि व्हिडिओग्राफी',
    'pricing.customPackage': 'सानुकूल पॅकेज हवे आहे?',
    'pricing.customDesc': 'तुमच्या विशिष्ट आवश्यकतांनुसार तयार केलेल्या वैयक्तिक पॅकेजेससाठी आमच्याशी संपर्क साधा',
    'pricing.contactUs': 'आमच्याशी संपर्क साधा',
    
    // Gallery
    'gallery.title': 'फोटो गॅलरी',
    'gallery.subtitle': 'आमच्या व्हेन्यू आणि कार्यक्रमांच्या झलक',
    'gallery.all': 'सर्व',
    'gallery.hall': 'हॉल सेटअप',
    'gallery.weddings': 'लग्ने',
    'gallery.decoration': 'सजावट',
    'gallery.catering': 'केटरिंग',
    'gallery.loading': 'फोटो लोड होत आहेत...',
    'gallery.noPhotos': 'कोणतेही फोटो उपलब्ध नाहीत',
    
    // Booking
    'booking.title': 'तुमचा कार्यक्रम बुक करा',
    'booking.subtitle': 'आजच तुमची तारीख राखीव ठेवा',
    'booking.form.name': 'पूर्ण नाव',
    'booking.form.email': 'ईमेल पत्ता',
    'booking.form.phone': 'फोन नंबर',
    'booking.form.service': 'कार्यक्रम प्रकार',
    'booking.form.date': 'कार्यक्रमाची तारीख',
    'booking.form.time': 'पसंतीची वेळ',
    'booking.form.message': 'विशेष आवश्यकता (पर्यायी)',
    'booking.form.submit': 'बुकिंग सबमिट करा',
    'booking.form.submitting': 'सबमिट करत आहे...',
    'booking.services.wedding': 'लग्न रिसेप्शन',
    'booking.services.engagement': 'साखरपुडा समारंभ',
    'booking.services.birthday': 'वाढदिवस पार्टी',
    'booking.services.anniversary': 'वर्धापनदिन साजरा',
    'booking.services.corporate': 'कॉर्पोरेट कार्यक्रम',
    'booking.services.other': 'इतर कार्यक्रम',
    'booking.myBookings': 'माझी बुकिंग',
    'booking.noBookings': 'अद्याप कोणतीही बुकिंग नाही',
    'booking.status': 'स्थिती',
    'booking.loginRequired': 'कार्यक्रम बुक करण्यासाठी कृपया लॉगिन करा',
    
    // Contact
    'contact.title': 'संपर्कात रहा',
    'contact.subtitle': 'तुमचा परिपूर्ण कार्यक्रम नियोजित करण्यात मदत करण्यासाठी आम्ही येथे आहोत',
    'contact.phone': 'फोन',
    'contact.email': 'ईमेल',
    'contact.address': 'पत्ता',
    'contact.addressText': 'कामधेनू मंगल कार्यालय, मुख्य रस्ता, शहर',
    'contact.social': 'आमच्याशी जुळा',
    'contact.hours': 'व्यवसाय वेळा',
    'contact.hoursDesc': 'सोमवार - रविवार: सकाळी 9:00 - रात्री 9:00',
    'contact.callNow': 'आता कॉल करा',
    'contact.whatsapp': 'व्हॉट्सअॅप',
    'contact.form.title': 'आम्हाला संदेश पाठवा',
    'contact.form.name': 'तुमचे नाव',
    'contact.form.email': 'तुमचा ईमेल',
    'contact.form.phone': 'तुमचा फोन',
    'contact.form.message': 'तुमचा संदेश',
    'contact.form.submit': 'संदेश पाठवा',
    'contact.form.submitting': 'पाठवत आहे...',
    'contact.location': 'आमचे स्थान',
    
    // QR Code
    'qrcode.title': 'स्कॅन करा',
    'qrcode.description': 'आमच्या वेबसाइटला भेट देण्यासाठी तुमच्या मोबाइल डिव्हाइससह हा QR कोड स्कॅन करा',
    'qrcode.download': 'QR कोड डाउनलोड करा',
    
    // Admin
    'admin.title': 'प्रशासक डॅशबोर्ड',
    'admin.photos': 'फोटो',
    'admin.bookings': 'बुकिंग',
    'admin.payments': 'पेमेंट',
    'admin.timeSlots': 'वेळ स्लॉट',
    
    // Common
    'common.loading': 'लोड होत आहे...',
    'common.error': 'एक त्रुटी आली',
    'common.success': 'यश!',
    'common.cancel': 'रद्द करा',
    'common.save': 'जतन करा',
    'common.delete': 'हटवा',
    'common.edit': 'संपादित करा',
    'common.close': 'बंद करा',
    'common.viewMore': 'अधिक पहा',
    'common.learnMore': 'अधिक जाणून घ्या',
  },
};

class I18n {
  private currentLanguage: string = 'en';
  private listeners: Set<() => void> = new Set();

  changeLanguage(lng: string) {
    if (resources[lng]) {
      this.currentLanguage = lng;
      this.notifyListeners();
    }
  }

  get language() {
    return this.currentLanguage;
  }

  t(key: TranslationKey): string {
    return resources[this.currentLanguage]?.[key] || resources.en[key] || key;
  }

  subscribe(callback: () => void) {
    this.listeners.add(callback);
    return () => {
      this.listeners.delete(callback);
    };
  }

  private notifyListeners() {
    this.listeners.forEach(callback => callback());
  }
}

export const i18n = new I18n();

// React imports for useEffect and useState
import { useEffect, useState } from 'react';

export function useTranslation() {
  const [, setUpdate] = useState(0);

  useEffect(() => {
    const unsubscribe = i18n.subscribe(() => {
      setUpdate(prev => prev + 1);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return {
    t: (key: TranslationKey) => i18n.t(key),
    i18n: {
      language: i18n.language,
      changeLanguage: (lng: string) => i18n.changeLanguage(lng),
    },
  };
}

