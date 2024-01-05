package com.example.busreservation.routes.controller;

import com.example.busreservation.routes.entity.Route;
import com.example.busreservation.routes.service.RouteService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin
public class RouteController {
    @Autowired
    RouteService routeService;
    @GetMapping("/get/route")
    public List<Route> getAllRoutes(){
        return routeService.getAllRoutes();
    }
    @GetMapping("routeId")
    public Route getRouteIdByStopName(@Param("s1") String stopName1, @Param("s2") String stopName2){
        Route route = routeService.getRouteIdByStopName(stopName1, stopName2);
        if (route == null) {
            throw new RuntimeException("route id not found - " );
        }
        return  route;
    }

    @GetMapping("/route/{id}")
    public Route route(@PathVariable("id") Long userId) {
       Route route = routeService.getRoutesById(userId);
        if (route == null) {
            throw new RuntimeException("route id not found - " + userId);
        }
        return route;
    }


    @PostMapping("/route")
    public Route createRoute(@RequestBody Route route) {
       routeService.createRoute(route);
        return route;
    }

    @PutMapping("/route")
    public Route updateRoute(@RequestBody Route route) {
        routeService.updateRoute(route);
        return route;
    }

    @DeleteMapping("/route/{id}")
    public String deleteUser(@PathVariable("id") Long Id) {
        Route route = routeService.getRoutesById(Id);
        if (route == null) {
            throw new RuntimeException("route id not found - " + Id);
        }
       routeService.deleteRoute(Id);
        return "Deleted route id - " + Id;
    }

}
