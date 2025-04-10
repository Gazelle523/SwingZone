package com.swingzone.controller;

import org.springframework.web.bind.annotation.*;

import com.swingzone.model.Booking;
import com.swingzone.service.BookingService;

import java.time.ZonedDateTime;
import java.util.List;

@RestController
@RequestMapping("/api/bookings")
public class BookingController {

    private final BookingService bookingService;

    public BookingController(BookingService bookingService) {
        this.bookingService = bookingService;
    }

    @PostMapping("/book/{simulatorId}")
    public Booking bookSimulator(@PathVariable Long simulatorId, 
                                 @RequestParam ZonedDateTime startTime,
                                 @RequestParam ZonedDateTime endTime) {
        return bookingService.createBooking(simulatorId, startTime, endTime);
    }

    @GetMapping("/simulator/{simulatorId}")
    public List<Booking> getBookingsForSim(@PathVariable Long simulatorId) {
        return bookingService.getAllBookingsForSimulator(simulatorId);
    }
}
