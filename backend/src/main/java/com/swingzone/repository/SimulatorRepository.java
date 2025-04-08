package com.swingzone.repository;

import com.swingzone.model.Simulator;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface SimulatorRepository extends JpaRepository<Simulator, Long> {

}