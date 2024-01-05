package com.example.busreservation.routes.service;

import com.example.busreservation.routes.dao.RouteRepository;
import com.example.busreservation.routes.entity.Route;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class RouteServiceImpl implements RouteService {
    @Autowired
    RouteRepository routeRepository;

    @Override
    public Route createRoute(Route route) {
        return routeRepository.save(route);
    }

    @Override
    public List<Route> getAllRoutes() {
        List<Route>results =  routeRepository.findAll();
        return results;
    }

    @Override
    public Route getRoutesById(Long id) {
        return routeRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteRoute(Long id) {
        routeRepository.deleteById(id);
        return "User with User Id " + id + " deleted!!!";
    }

    @Override
    public Route updateRoute(Route route) {
        Route u= routeRepository.findById(route.getId()).orElse(null);
       u.setRouteName(route.getRouteName());
       u.setRouteStops(route.getRouteStops());
       u.setId(route.getId());
        return routeRepository.save(u);
    }

    @Override
    public Route getRouteIdByStopName(String s1, String s2) {
        List<Route>r1 = routeRepository.getByStopName(s1);
        List<Route>r2 = routeRepository.getByStopName(s2);
        List<Long>result = new ArrayList<>();
            for(Route route1:r1){
                for(Route route2:r2){
                    if(route1.getId().equals(route2.getId())){
                        result.add(route1.getId());
                    }
                }
            }
        return null;
    }
}
