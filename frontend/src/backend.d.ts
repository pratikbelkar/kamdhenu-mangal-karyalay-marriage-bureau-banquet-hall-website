import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export class ExternalBlob {
    getBytes(): Promise<Uint8Array<ArrayBuffer>>;
    getDirectURL(): string;
    static fromURL(url: string): ExternalBlob;
    static fromBytes(blob: Uint8Array<ArrayBuffer>): ExternalBlob;
    withUploadProgress(onProgress: (percentage: number) => void): ExternalBlob;
}
export type BookingId = string;
export interface TimeSlot {
    id: string;
    startTime: bigint;
    endTime: bigint;
    isAvailable: boolean;
}
export type PhotoId = string;
export interface PhotoMetadata {
    id: PhotoId;
    categories: Array<string>;
    title: string;
    description: string;
    uploadDate: bigint;
    fileReference: ExternalBlob;
}
export interface PaymentNotification {
    paymentStatus: string;
    paymentMethod: string;
    bookingId: string;
    paymentId: string;
    amount: bigint;
}
export interface Payment {
    id: PaymentId;
    status: string;
    paymentMethod: string;
    bookingId: BookingId;
    currency: string;
    timestamp: bigint;
    amount: bigint;
}
export type PaymentId = string;
export interface SavePhotoArgs {
    id: string;
    categories: Array<string>;
    title: string;
    description: string;
    uploadDate: bigint;
    fileReference: ExternalBlob;
}
export interface CreateBookingArgs {
    serviceType: string;
    clientName: string;
    scheduledDate: bigint;
    email: string;
    phone: string;
}
export interface Booking {
    id: BookingId;
    status: string;
    serviceType: string;
    clientName: string;
    scheduledDate: bigint;
    email: string;
    phone: string;
}
export interface UserProfile {
    name: string;
    email: string;
    phone: string;
}
export enum UserRole {
    admin = "admin",
    user = "user",
    guest = "guest"
}
export interface backendInterface {
    assignCallerUserRole(user: Principal, role: UserRole): Promise<void>;
    checkAvailability(requestedStartTime: bigint, requestedEndTime: bigint): Promise<boolean>;
    createBooking(args: CreateBookingArgs): Promise<BookingId>;
    deleteBooking(id: BookingId): Promise<void>;
    deletePhoto(id: PhotoId): Promise<void>;
    findBookingsByDateRange(startDate: bigint, endDate: bigint): Promise<Array<Booking>>;
    findBookingsByName(name: string): Promise<Array<Booking>>;
    findPaymentsByBookingId(bookingId: string): Promise<Array<Payment>>;
    findPaymentsByDateRange(startDate: bigint, endDate: bigint): Promise<Array<Payment>>;
    getAllBookings(): Promise<Array<Booking>>;
    getBookingsByEmail(email: string): Promise<Array<Booking>>;
    getBookingsByStatus(status: string): Promise<Array<Booking>>;
    getCallerUserProfile(): Promise<UserProfile | null>;
    getCallerUserRole(): Promise<UserRole>;
    getPayments(): Promise<Array<Payment>>;
    getPaymentsByStatus(status: string): Promise<Array<Payment>>;
    getPhotos(): Promise<Array<PhotoMetadata>>;
    getPhotosByCategory(category: string): Promise<Array<PhotoMetadata>>;
    getPhotosByCategoryAndDate(category: string, startDate: bigint, endDate: bigint): Promise<Array<PhotoMetadata>>;
    getTimeSlots(): Promise<Array<TimeSlot>>;
    getUpcomingBookings(): Promise<Array<Booking>>;
    getUserProfile(user: Principal): Promise<UserProfile | null>;
    handlePaymentUpdate(notification: PaymentNotification): Promise<void>;
    initializeAccessControl(): Promise<void>;
    isCallerAdmin(): Promise<boolean>;
    processRazorpayPayment(payment: Payment): Promise<void>;
    saveCallerUserProfile(profile: UserProfile): Promise<void>;
    savePhoto(photo: SavePhotoArgs): Promise<void>;
    savePhotoBatch(photosArray: Array<SavePhotoArgs>): Promise<void>;
    setTimeSlotAvailability(id: string, isAvailable: boolean): Promise<void>;
    setTimeSlots(slots: Array<TimeSlot>): Promise<void>;
    updateBooking(id: string, clientName: string, email: string, phone: string, serviceType: string, scheduledDate: bigint, status: string): Promise<void>;
    updateBookingStatus(bookingId: string, newStatus: string): Promise<void>;
    updatePayment(id: string, status: string): Promise<void>;
    updatePhoto(id: string, title: string, description: string, categories: Array<string>, uploadDate: bigint, fileReference: ExternalBlob): Promise<void>;
}
