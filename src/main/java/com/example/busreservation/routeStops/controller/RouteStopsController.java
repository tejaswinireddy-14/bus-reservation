package com.example.busreservation.routeStops.controller;

import com.example.busreservation.routeStops.dao.RouteStopsRepository;
import com.example.busreservation.routeStops.entity.RouteStops;
import com.example.busreservation.routeStops.service.RouteStopService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.sql.Time;
import java.util.List;

@RestController
@CrossOrigin
public class RouteStopsController {
    @Autowired
    RouteStopService routeStopService;
    @Autowired
    RouteStopsRepository routeStopsRepository;

    @GetMapping("/get/routeStop")
    public List<RouteStops> getAllRouteStops() {
        return routeStopService.getAllRouteStop();
    }

    @GetMapping("/routeStopId")
    public List<Long> getRouteIDByRouteStops(@Param("s1") String s1, @Param("s2") String s2) {
        List<Long> routeStops = routeStopService.getRouteIDByRouteStops(s1, s2);
        if (routeStops == null) {
            throw new RuntimeException("RouteStop id not found - ");
        }
        return routeStops;

    }
    @GetMapping("/getrouteId")
    public List<Long> getRouteIdByStopNames(@Param("origin")String origin,@Param("destination")String destination){
        return routeStopService.getRouteIdByStopNames(origin, destination);
    }

    @GetMapping("/stopFare")
    public Long getFareByStopName(@Param("origin") String origin, @Param("destination") String destination) {
        Long fare = routeStopService.getFareByStopName(origin, destination);
        return fare;
    }

    @GetMapping("/stopSeq")
    public Long getStopSeqByStopName(@Param("stopName") String stopName) {
        Long stopSeq = routeStopService.getStopSeqByStopName(stopName);
        return stopSeq;
    }

    @GetMapping("/stopLat")
    public List<String> getStopLat(@Param("origin") String origin, @Param("destination") String destination) {
        List<String> stopSeq = routeStopService.getStopLat(origin, destination);
        return stopSeq;
    }

    @GetMapping("/stopLong")
    public List<String> getStopLong(@Param("origin") String origin, @Param("destination") String destination) {
        List<String> stopSeq = routeStopService.getStopLong(origin, destination);
        return stopSeq;
    }

    @GetMapping("/stopLatitude")
    public String getStopLatByRouteId(@Param("id") Long id) {
        String stopSeq = routeStopService.getStopLatByRouteId(id);
        return stopSeq;
    }

    @GetMapping("/stopLongitude")
    public String getStopLongByRouteId(@Param("id") Long id) {
        String stopSeq = routeStopService.getStopLongByRouteId(id);
        return stopSeq;
    }
    @GetMapping("/allStops")
    public List<RouteStops> getStops(@Param("routeId")Long routeId){
        return routeStopsRepository.getAllStopsByRouteId(routeId);
    }

    @GetMapping("/stopTime")
    public Time getStopTime(@Param("stopName") String stopName) {
        Time stopTime = routeStopService.getStopTime(stopName);
        return stopTime;
    }
    @GetMapping("/boardingTime")
    public Time getBoardingTime(@Param("scheduleId") Long scheduleId,@Param("stopName") String stopName) {
        Time stime = routeStopService.getStopTimeByRoute(scheduleId, stopName);
        return stime;
    }


    @GetMapping("/destination")
    public List<String> getDestination(@Param("origin") String origin) {
        List<String> dest = routeStopService.getDestination(origin);
        return dest;
    }


    @GetMapping("/routeStop/{id}")
    public RouteStops routeStops(@PathVariable("id") Long userId) {
        RouteStops routeStops = routeStopService.getRouteStopById(userId);
        if (routeStops == null) {
            throw new RuntimeException("RouteStop id not found - " + userId);
        }
        return routeStops;
    }

    @PostMapping("/routeStop")
    public RouteStops createRouteStop(@RequestBody RouteStops routeStops) {
        routeStopService.createRouteStop(routeStops);
        return routeStops;

    }

    @PutMapping("/routeStop")
    public RouteStops updateRouteStops(@RequestBody RouteStops routeStops) {
        routeStopService.updateRouteStop(routeStops);
        return routeStops;

    }

    @DeleteMapping("/routeStop/{id}")
    public String deleteUser(@PathVariable("id") Long Id) {
        RouteStops routeStops = routeStopService.getRouteStopById(Id);
        if (routeStops == null) {
            throw new RuntimeException("user id not found - " + Id);
        }
        routeStopService.deleteRouteStop(Id);
        return "Deleted routerStop id - " + Id;
    }

}
