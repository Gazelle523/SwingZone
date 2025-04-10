package com.swingzone.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.Table;

@Entity
@Table(name = "simulators")
public class Simulator {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long simulatorId;

    private String location;
    private double price;
    private String description;

    private Long userId;

    // Getters and Setters
    public Long getSimulatorId() {
        return simulatorId;
    }

    public void setSimulatorId(Long id) {
        this.simulatorId = id;
    }

    public String getLocation() {
        return location;
    }

    public void setLocation(String location) {
        this.location = location;
    }

    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }
}
