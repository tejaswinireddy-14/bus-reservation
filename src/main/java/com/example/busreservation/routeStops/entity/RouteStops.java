package com.example.busreservation.routeStops.entity;

import com.example.busreservation.routes.entity.Route;

import javax.persistence.*;

@Entity
public class RouteStops {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String stopName;
    Long stopSeq;
    String stopLat;
    String stopLong;
    String time;
    Long fare;
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "route_id")

    Route route;

    public RouteStops() {
    }

    public RouteStops(Long id, String stopName, Long stopSeq, String stopLat, String stopLong, String time, Long fare, Route route) {
        this.id = id;
        this.stopName = stopName;
        this.stopSeq = stopSeq;
        this.stopLat = stopLat;
        this.stopLong = stopLong;
        this.time = time;
        this.fare = fare;
        this.route = route;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStopName() {
        return stopName;
    }

    public void setStopName(String stopName) {
        this.stopName = stopName;
    }

    public Long getStopSeq() {
        return stopSeq;
    }

    public void setStopSeq(Long stopSeq) {
        this.stopSeq = stopSeq;
    }

    public String getStopLat() {
        return stopLat;
    }

    public void setStopLat(String stopLat) {
        this.stopLat = stopLat;
    }

    public String getStopLong() {
        return stopLong;
    }

    public void setStopLong(String stopLong) {
        this.stopLong = stopLong;
    }

    public String getTime() {
        return time;
    }

    public void setTime(String time) {
        this.time = time;
    }

    public Long getFare() {
        return fare;
    }

    public void setFare(Long fare) {
        this.fare = fare;
    }

    public Route getRoute() {
        return route;
    }

    public void setRoute(Route route) {
        this.route = route;
    }
}
