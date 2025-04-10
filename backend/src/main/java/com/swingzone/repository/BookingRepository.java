package com.swingzone.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.ZonedDateTime;
import java.util.List;
import com.swingzone.model.Booking;

@Repository
public interface BookingRepository extends JpaRepository<Booking, Long> {
    List<Booking> findBySimulator_SimulatorIdAndStartTimeLessThanEqualAndEndTimeGreaterThanEqual(
        Long simulatorId, ZonedDateTime endTime, ZonedDateTime startTime);
}
