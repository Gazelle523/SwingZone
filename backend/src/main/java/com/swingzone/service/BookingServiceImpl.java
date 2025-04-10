package com.swingzone.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.swingzone.model.Booking;
import com.swingzone.repository.BookingRepository;
import com.swingzone.repository.SimulatorRepository;

import java.time.ZonedDateTime;
import java.util.List;

@Service
public class BookingServiceImpl implements BookingService {

    private final BookingRepository bookingRepo;
    private final SimulatorRepository simulatorRepo;

    public BookingServiceImpl(BookingRepository bookingRepo,  SimulatorRepository simulatorRepo) {
        this.bookingRepo = bookingRepo;
        this.simulatorRepo = simulatorRepo;
    }

    @Override
    @Transactional
    public Booking createBooking(Long simulatorId, ZonedDateTime start, ZonedDateTime end) {
        // Check for time conflict
        var overlapping = bookingRepo.findBySimulator_SimulatorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
            simulatorId, end, start
        );
        if (!overlapping.isEmpty()) {
            throw new IllegalStateException("Time slot is already booked");
        }

         var simulator = simulatorRepo.findById(simulatorId).orElseThrow(() -> new IllegalArgumentException("Simulator not found"));

        Booking booking = new Booking();
        booking.setSimulator(simulator);
        booking.setStartTime(start);
        booking.setEndTime(end);

        return bookingRepo.save(booking);
    }

    @Override
    public List<Booking> getAllBookingsForSimulator(Long simulatorId) {
        return bookingRepo.findAll().stream()
                .filter(b -> b.getSimulator().getSimulatorId().equals(simulatorId))
                .toList();
    }
}