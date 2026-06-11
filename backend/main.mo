import MixinStorage "blob-storage/Mixin";
import Storage "blob-storage/Storage";
import Array "mo:core/Array";
import Map "mo:core/Map";
import Order "mo:core/Order";
import Text "mo:core/Text";
import List "mo:core/List";
import Iter "mo:core/Iter";
import Principal "mo:core/Principal";
import AccessControl "authorization/access-control";
import Runtime "mo:core/Runtime";

actor {
  include MixinStorage();

  // User type for RBAC (role-based access control)
  type User = Principal;

  // Photographer Portfolio types
  type PhotoId = Text;

  type PhotoMetadata = {
    id : PhotoId;
    title : Text;
    description : Text;
    categories : [Text];
    uploadDate : Int;
    fileReference : Storage.ExternalBlob;
  };

  type BookingId = Text;

  type Booking = {
    id : BookingId;
    clientName : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    scheduledDate : Int;
    status : Text;
  };

  type PaymentId = Text;

  type Payment = {
    id : PaymentId;
    bookingId : BookingId;
    amount : Nat;
    currency : Text;
    status : Text;
    timestamp : Int;
    paymentMethod : Text;
  };

  type TimeSlot = {
    id : Text;
    startTime : Int;
    endTime : Int;
    isAvailable : Bool;
  };

  type CreateBookingArgs = {
    clientName : Text;
    email : Text;
    phone : Text;
    serviceType : Text;
    scheduledDate : Int;
  };

  type PaymentNotification = {
    paymentId : Text;
    bookingId : Text;
    amount : Nat;
    paymentStatus : Text;
    paymentMethod : Text;
  };

  type SavePhotoArgs = {
    id : Text;
    title : Text;
    description : Text;
    categories : [Text];
    uploadDate : Int;
    fileReference : Storage.ExternalBlob;
  };

  type UserProfile = {
    name : Text;
    email : Text;
    phone : Text;
  };

  module Booking {
    public func compareByDate(booking1 : Booking, booking2 : Booking) : Order.Order {
      if (booking1.scheduledDate < booking2.scheduledDate) { #less }
      else if (booking1.scheduledDate > booking2.scheduledDate) { #greater } else {
        Text.compare(booking1.clientName, booking2.clientName);
      };
    };
  };

  module Payment {
    public func compareByDate(payment1 : Payment, payment2 : Payment) : Order.Order {
      if (payment1.timestamp < payment2.timestamp) { #less }
      else if (payment1.timestamp > payment2.timestamp) { #greater } else {
        Text.compare(payment1.bookingId, payment2.bookingId);
      };
    };
  };

  module Photo {
    public func compareByDate(photo1 : PhotoMetadata, photo2 : PhotoMetadata) : Order.Order {
      if (photo1.uploadDate < photo2.uploadDate) { #less }
      else if (photo1.uploadDate > photo2.uploadDate) { #greater } else {
        Text.compare(photo1.title, photo2.title);
      };
    };
  };

  // In-memory actor state
  let photos = Map.empty<Text, PhotoMetadata>();
  let bookings = Map.empty<Text, Booking>();
  let payments = Map.empty<Text, Payment>();
  let userProfiles = Map.empty<Principal, UserProfile>();

  // Use global state for time slots
  var timeSlots : [TimeSlot] = [];

  // Prefabricated access control state for RBAC
  let accessControlState = AccessControl.initState();

  // Needed for all backends
  public shared ({ caller }) func initializeAccessControl() : async () {
    AccessControl.initialize(accessControlState, caller);
  };

  public query ({ caller }) func getCallerUserRole() : async AccessControl.UserRole {
    AccessControl.getUserRole(accessControlState, caller);
  };

  public shared ({ caller }) func assignCallerUserRole(user : Principal, role : AccessControl.UserRole) : async () {
    AccessControl.assignRole(accessControlState, caller, user, role);
  };

  public query ({ caller }) func isCallerAdmin() : async Bool {
    AccessControl.isAdmin(accessControlState, caller);
  };

  // User profile functions
  public query ({ caller }) func getCallerUserProfile() : async ?UserProfile {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can access profiles");
    };
    userProfiles.get(caller);
  };

  public query ({ caller }) func getUserProfile(user : Principal) : async ?UserProfile {
    if (caller != user and not AccessControl.isAdmin(accessControlState, caller)) {
      Runtime.trap("Unauthorized: Can only view your own profile");
    };
    userProfiles.get(user);
  };

  public shared ({ caller }) func saveCallerUserProfile(profile : UserProfile) : async () {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can save profiles");
    };
    userProfiles.add(caller, profile);
  };

  func validateAdmin(caller : Principal) {
    if (not (AccessControl.isAdmin(accessControlState, caller))) {
      Runtime.trap("Unauthorized: Only admins can perform this action");
    };
  };

  func validateUser(caller : Principal) {
    if (not (AccessControl.hasPermission(accessControlState, caller, #user))) {
      Runtime.trap("Unauthorized: Only users can perform this action");
    };
  };

  public query func getTimeSlots() : async [TimeSlot] {
    timeSlots;
  };

  public query ({ caller }) func getAllBookings() : async [Booking] {
    validateAdmin(caller);
    bookings.values().toArray().sort(Booking.compareByDate);
  };

  public query ({ caller }) func getPayments() : async [Payment] {
    validateAdmin(caller);
    payments.values().toArray().sort(Payment.compareByDate);
  };

  public shared ({ caller }) func setTimeSlotAvailability(id : Text, isAvailable : Bool) : async () {
    validateAdmin(caller);
    let updatedSlots = timeSlots.map(
      func(slot) {
        if (slot.id == id) {
          { slot with isAvailable };
        } else {
          slot;
        };
      }
    );
    timeSlots := updatedSlots;
  };

  public shared ({ caller }) func setTimeSlots(slots : [TimeSlot]) : async () {
    validateAdmin(caller);
    timeSlots := slots;
  };

  public query ({ caller }) func getBookingsByEmail(email : Text) : async [Booking] {
    // Users can only see their own bookings, admins can see all
    let userProfile = userProfiles.get(caller);
    switch (userProfile) {
      case (?profile) {
        if (profile.email != email and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own bookings");
        };
      };
      case (null) {
        if (not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view your own bookings");
        };
      };
    };

    let filtered = bookings.values().toArray().filter(
      func(booking) {
        booking.email == email;
      }
    );
    filtered.sort(Booking.compareByDate);
  };

  public shared ({ caller }) func updateBooking(
    id : Text,
    clientName : Text,
    email : Text,
    phone : Text,
    serviceType : Text,
    scheduledDate : Int,
    status : Text,
  ) : async () {
    validateAdmin(caller);

    let ?booking = bookings.get(id) else {
      Runtime.trap("Booking does not exist");
    };

    let updatedBooking = {
      booking with clientName;
      email;
      phone;
      serviceType;
      scheduledDate;
      status;
    };
    bookings.add(id, updatedBooking);
  };

  public shared ({ caller }) func updatePayment(id : Text, status : Text) : async () {
    validateAdmin(caller);

    let ?payment = payments.get(id) else {
      Runtime.trap("Payment not found");
    };
    let updatedPayment = { payment with status };
    payments.add(id, updatedPayment);
  };

  public query ({ caller }) func findBookingsByDateRange(startDate : Int, endDate : Int) : async [Booking] {
    validateAdmin(caller);
    let filtered = bookings.values().toArray().filter(
      func(booking) {
        booking.scheduledDate >= startDate and booking.scheduledDate <= endDate
      }
    );
    filtered.sort(Booking.compareByDate);
  };

  public query ({ caller }) func findPaymentsByDateRange(startDate : Int, endDate : Int) : async [Payment] {
    validateAdmin(caller);
    let filtered = payments.values().toArray().filter(
      func(payment) {
        payment.timestamp >= startDate and payment.timestamp <= endDate
      }
    );
    filtered.sort(Payment.compareByDate);
  };

  public query ({ caller }) func getBookingsByStatus(status : Text) : async [Booking] {
    validateAdmin(caller);
    let filtered = bookings.values().toArray().filter(
      func(booking) { booking.status == status }
    );
    filtered.sort(Booking.compareByDate);
  };

  public query ({ caller }) func getPaymentsByStatus(status : Text) : async [Payment] {
    validateAdmin(caller);
    let filtered = payments.values().toArray().filter(
      func(payment) { payment.status == status }
    );
    filtered.sort(Payment.compareByDate);
  };

  public query func getPhotosByCategory(category : Text) : async [PhotoMetadata] {
    let filtered = photos.values().toArray().filter(
      func(photo) {
        photo.categories.any(
          func(c) { c == category }
        );
      }
    );
    filtered.sort(Photo.compareByDate);
  };

  public query ({ caller }) func findBookingsByName(name : Text) : async [Booking] {
    validateAdmin(caller);
    let filtered = bookings.values().toArray().filter(
      func(booking) { booking.clientName.contains(#text name) }
    );
    filtered.sort(Booking.compareByDate);
  };

  public query ({ caller }) func findPaymentsByBookingId(bookingId : Text) : async [Payment] {
    // Check if caller owns the booking or is admin
    switch (bookings.get(bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) {
        let userProfile = userProfiles.get(caller);
        let isOwner = switch (userProfile) {
          case (?profile) { profile.email == booking.email };
          case (null) { false };
        };
        
        if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only view payments for your own bookings");
        };
      };
    };

    let filtered = payments.values().toArray().filter(
      func(payment) { payment.bookingId == bookingId }
    );
    filtered.sort(Payment.compareByDate);
  };

  public query ({ caller }) func getUpcomingBookings() : async [Booking] {
    validateAdmin(caller);
    let filtered = bookings.values().toArray().filter(
      func(booking) { booking.scheduledDate > 0 }
    );
    filtered.sort(Booking.compareByDate);
  };

  // Photo gallery functions
  public shared ({ caller }) func savePhoto(photo : SavePhotoArgs) : async () {
    validateAdmin(caller);

    let photoMetadata : PhotoMetadata = {
      id = photo.id;
      title = photo.title;
      description = photo.description;
      categories = photo.categories;
      uploadDate = photo.uploadDate;
      fileReference = photo.fileReference;
    };

    photos.add(photo.id, photoMetadata);
  };

  public shared ({ caller }) func deletePhoto(id : PhotoId) : async () {
    validateAdmin(caller);

    if (not photos.containsKey(id)) {
      Runtime.trap("Photo does not exist");
    };

    photos.remove(id);
  };

  public shared ({ caller }) func deleteBooking(id : BookingId) : async () {
    validateAdmin(caller);

    switch (bookings.get(id)) {
      case (null) {
        Runtime.trap("Booking does not exist");
      };
      case (?booking) {
        bookings.remove(id);
        // Find the corresponding time slot and mark it as available
        let updatedSlots = timeSlots.map(
          func(slot) {
            if (slot.id == id) {
              { slot with isAvailable = true };
            } else {
              slot;
            };
          }
        );
        timeSlots := updatedSlots;
      };
    };
  };

  public shared ({ caller }) func savePhotoBatch(photosArray : [SavePhotoArgs]) : async () {
    validateAdmin(caller);

    for (photo in photosArray.values()) {
      let photoMetadata : PhotoMetadata = {
        id = photo.id;
        title = photo.title;
        description = photo.description;
        categories = photo.categories;
        uploadDate = photo.uploadDate;
        fileReference = photo.fileReference;
      };

      photos.add(photo.id, photoMetadata);
    };
  };

  public query func getPhotos() : async [PhotoMetadata] {
    photos.values().toArray().sort(Photo.compareByDate);
  };

  public query func getPhotosByCategoryAndDate(category : Text, startDate : Int, endDate : Int) : async [PhotoMetadata] {
    let filtered = photos.values().toArray().filter(
      func(photo) {
        photo.categories.any(
          func(c) { c == category }
        ) and photo.uploadDate >= startDate and photo.uploadDate <= endDate
      }
    );
    filtered.sort(Photo.compareByDate);
  };

  // Booking system functions
  public shared ({ caller }) func createBooking(args : CreateBookingArgs) : async BookingId {
    validateUser(caller);

    // Check if requested time slot is available
    let requestedSlot = timeSlots.find(
      func(slot) {
        slot.startTime == args.scheduledDate and slot.isAvailable;
      }
    );

    switch (requestedSlot) {
      case (null) {
        Runtime.trap("Requested time slot is not available");
      };
      case (?_slot) {
        // Generate unique booking ID
        let uniqueId = createUniqueId(args.clientName, args.email, args.scheduledDate);

        let newBooking : Booking = {
          args with
          id = uniqueId;
          status = "pending";
        };

        bookings.add(uniqueId, newBooking);

        // Mark the time slot as unavailable
        let updatedSlots = timeSlots.map(
          func(slot) {
            if (slot.startTime == args.scheduledDate) {
              { slot with isAvailable = false };
            } else {
              slot;
            };
          }
        );
        timeSlots := updatedSlots;

        uniqueId;
      };
    };
  };

  public shared ({ caller }) func updatePhoto(
    id : Text,
    title : Text,
    description : Text,
    categories : [Text],
    uploadDate : Int,
    fileReference : Storage.ExternalBlob,
  ) : async () {
    validateAdmin(caller);

    let ?photo = photos.get(id) else {
      Runtime.trap("Photo does not exist");
    };

    let updatedPhoto = {
      photo with title;
      description;
      categories;
      uploadDate;
      fileReference;
    };
    photos.add(id, updatedPhoto);
  };

  // Payment functions
  public shared ({ caller }) func processRazorpayPayment(payment : Payment) : async () {
    // Allow users to process payments for their own bookings, or admins
    switch (bookings.get(payment.bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) {
        let userProfile = userProfiles.get(caller);
        let isOwner = switch (userProfile) {
          case (?profile) { profile.email == booking.email };
          case (null) { false };
        };
        
        if (not isOwner and not AccessControl.isAdmin(accessControlState, caller)) {
          Runtime.trap("Unauthorized: Can only process payments for your own bookings");
        };
      };
    };

    payments.add(payment.id, payment);
  };

  public shared ({ caller }) func handlePaymentUpdate(notification : PaymentNotification) : async () {
    // This should be callable by authenticated users (webhook or system)
    // For webhook integration, we allow any authenticated user
    validateUser(caller);

    switch (bookings.get(notification.bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) {
        let updatedBooking = {
          booking with
          status = notification.paymentStatus;
        };
        bookings.add(notification.bookingId, updatedBooking);
      };
    };

    let newPayment : Payment = {
      id = notification.paymentId;
      bookingId = notification.bookingId;
      amount = notification.amount;
      currency = "INR";
      status = notification.paymentStatus;
      timestamp = 0;
      paymentMethod = notification.paymentMethod;
    };

    payments.add(notification.paymentId, newPayment);
  };

  public query func checkAvailability(requestedStartTime : Int, requestedEndTime : Int) : async Bool {
    timeSlots.any(
      func(slot) {
        slot.startTime == requestedStartTime and slot.endTime == requestedEndTime and slot.isAvailable
      }
    );
  };

  public shared ({ caller }) func updateBookingStatus(bookingId : Text, newStatus : Text) : async () {
    validateAdmin(caller);

    switch (bookings.get(bookingId)) {
      case (null) {
        Runtime.trap("Booking not found");
      };
      case (?booking) {
        let updatedBooking = {
          booking with
          status = newStatus;
        };
        bookings.add(bookingId, updatedBooking);
      };
    };
  };

  func createUniqueId(name : Text, email : Text, timestamp : Int) : Text {
    (name.concat(email)).concat(timestamp.toText());
  };
};
