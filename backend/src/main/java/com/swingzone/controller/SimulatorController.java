package com.swingzone.controller;

import com.swingzone.model.Simulator;
import com.swingzone.repository.SimulatorRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/simulators")
public class SimulatorController {

    @Autowired
    private SimulatorRepository simulatorRepository;

    // Fetch all simulators
    @GetMapping
    public List<Simulator> getAllSimulators() {
        return simulatorRepository.findAll();
    }

    // Fetch simulator by ID
    @GetMapping("/{id}")
    public Simulator getSimulatorById(@PathVariable Long id) {
        return simulatorRepository.findById(id).orElse(null);
    }

    // Fetch all simulators for a specific user
    @GetMapping("/user/{userId}")
    public List<Simulator> getSimulatorsByUserId(@PathVariable Long userId) {
        return simulatorRepository.findByUserId(userId);
    }

    // Create a new simulator listing
    @PostMapping
    public Simulator addSimulator(@RequestBody Simulator simulator) {
        return simulatorRepository.save(simulator);
    }

    // Update an existing simulator by ID
    @PutMapping("/{id}")
    public Simulator updateSimulator(@PathVariable Long id, @RequestBody Simulator updatedSimulator) {
        Optional<Simulator> optionalSim = simulatorRepository.findById(id);

        if (optionalSim.isPresent()) {
            Simulator existing = optionalSim.get();
            existing.setLocation(updatedSimulator.getLocation());
            existing.setPrice(updatedSimulator.getPrice());
            existing.setDescription(updatedSimulator.getDescription());
            existing.setUserId(updatedSimulator.getUserId()); // if userId can be edited
            // Add any other fields here
            return simulatorRepository.save(existing);
        } else {
            return null; // or throw exception / return ResponseEntity.notFound()
        }
    }

    // Endpoint to delete a simulator by ID
    @DeleteMapping("/{id}")
    @ResponseStatus(HttpStatus.NO_CONTENT) // Returns 204 No Content status
    public void deleteSimulator(@PathVariable Long id) {
        Optional<Simulator> simulator = simulatorRepository.findById(id);
        if (simulator.isPresent()) {
            simulatorRepository.deleteById(id); // Delete simulator by ID
        } else {
            throw new RuntimeException("Simulator not found");
        }
    }
}
