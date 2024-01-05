package com.example.busreservation.routes.service;

import com.example.busreservation.routes.entity.Route;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface RouteService {
    public Route createRoute(Route route);
    public List<Route> getAllRoutes();
    public Route getRoutesById(Long id);
    public String deleteRoute(Long id);
    public Route updateRoute(Route route);
    public  Route getRouteIdByStopName(String s1, String s2);
}

