package com.swingzone.service;

import java.time.ZonedDateTime;
import java.util.List;

import com.swingzone.model.Booking;

public interface BookingService {
    Booking createBooking(Long simulatorId, ZonedDateTime start, ZonedDateTime end);
    List<Booking> getAllBookingsForSimulator(Long simulatorId);
}
