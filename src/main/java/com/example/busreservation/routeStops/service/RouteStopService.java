package com.example.busreservation.routeStops.service;

import com.example.busreservation.routeStops.entity.RouteStops;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.util.List;

@Service
public interface RouteStopService {
    public RouteStops createRouteStop(RouteStops routeStops);
    public List<RouteStops> getAllRouteStop();
    public RouteStops getRouteStopById(Long id);
    public String deleteRouteStop(Long id);
    public RouteStops updateRouteStop(RouteStops routeStops);
    public  List<Long> getRouteIDByRouteStops(String stopName1, String stopName2);
    public List<Long> getRouteIdByStopNames(String s1, String s2);
    public Long getStopSeqByStopName(String stopName);
    public List<String> getStopLat(String stopName1, String stopName2);
    public List<String> getStopLong(String stopName1, String stopName2);
    public String getStopLatByRouteId(Long id);
    public String getStopLongByRouteId(Long id);
    public  Time getStopTime(String stopName);
    public Long getFareByStopName(String stopName1, String stopName2);
    public List<String>getDestination(String stopName);
    public Time getStopTimeByRoute(Long sId, String origin);






}
