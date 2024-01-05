package com.example.busreservation.schedule.entity;

import com.example.busreservation.routes.entity.Route;
import com.example.busreservation.seats.entity.Seat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.sql.Time;
import java.util.Set;

@Entity
public class ScheduleDetails {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String date;
    String busNumber;
    String busName;

    Time startingTime;

    @OneToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")
    Route route;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL,orphanRemoval = true)
            @JsonIgnore

    Set<Seat>seats;

    public ScheduleDetails() {
    }

    public ScheduleDetails(Long id, String date, String busNumber, String busName, Time startingTime, Route route, Set<Seat> seats) {
        this.id = id;
        this.date = date;
        this.busNumber = busNumber;
        this.busName = busName;

        this.startingTime = startingTime;
        this.route = route;
        this.seats = seats;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDate() {
        return date;
    }

    public void setDate(String date) {
        this.date = date;
    }

    public String getBusNumber() {
        return busNumber;
    }

    public void setBusNumber(String busNumber) {
        this.busNumber = busNumber;
    }

    public String getBusName() {
        return busName;
    }

    public void setBusName(String busName) {
        this.busName = busName;
    }



    public Time getStartingTime() {
        return startingTime;
    }

    public void setStartingTime(Time startingTime) {
        this.startingTime = startingTime;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }

    public Set<Seat> getSeats() {
        return seats;
    }

    public void setSeats(Set<Seat> seats) {
        this.seats = seats;
    }
}
