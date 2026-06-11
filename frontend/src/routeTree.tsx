import { createRootRoute, createRoute } from '@tanstack/react-router';
import Layout from './components/Layout';
import HomePage from './pages/HomePage';
import GalleryPage from './pages/GalleryPage';
import BookingPage from './pages/BookingPage';
import AboutPage from './pages/AboutPage';
import ContactPage from './pages/ContactPage';
import QRCodePage from './pages/QRCodePage';
import AdminPage from './pages/AdminPage';
import BanquetPage from './pages/BanquetPage';
import MarriageBureauPage from './pages/MarriageBureauPage';
import PricingPage from './pages/PricingPage';

const rootRoute = createRootRoute({
  component: Layout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  component: HomePage,
});

const banquetRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/banquet',
  component: BanquetPage,
});

const marriageBureauRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/marriage-bureau',
  component: MarriageBureauPage,
});

const pricingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/pricing',
  component: PricingPage,
});

const galleryRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/gallery',
  component: GalleryPage,
});

const bookingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/booking',
  component: BookingPage,
});

const aboutRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/about',
  component: AboutPage,
});

const contactRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/contact',
  component: ContactPage,
});

const qrcodeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/qrcode',
  component: QRCodePage,
});

const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/admin',
  component: AdminPage,
});

export const routeTree = rootRoute.addChildren([
  indexRoute,
  banquetRoute,
  marriageBureauRoute,
  pricingRoute,
  galleryRoute,
  bookingRoute,
  aboutRoute,
  contactRoute,
  qrcodeRoute,
  adminRoute,
]);

