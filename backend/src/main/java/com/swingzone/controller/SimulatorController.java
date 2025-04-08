package com.swingzone.controller;

import com.swingzone.model.Simulator;
import com.swingzone.repository.SimulatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/simulators")
public class SimulatorController {

    @Autowired
    private SimulatorRepository simulatorRepository;

    // Endpoint to fetch all simulators
    @GetMapping
    public List<Simulator> getAllSimulators() {
        return simulatorRepository.findAll();
    }

    @PostMapping
    public Simulator addSimulator(@RequestBody Simulator simulator) {
        return simulatorRepository.save(simulator);
    }
}