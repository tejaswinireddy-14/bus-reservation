package com.example.busreservation.routeStops.service;

import com.example.busreservation.routeStops.dao.RouteStopsRepository;
import com.example.busreservation.routeStops.entity.RouteStops;
import com.example.busreservation.schedule.dao.ScheduleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.sql.Time;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;


@Service
public class RouteStopServiceImpl implements RouteStopService {
    @Autowired
    RouteStopsRepository routeStopsRepository;
    @Autowired
    ScheduleRepository scheduleRepository;

    @Override
    public RouteStops createRouteStop(RouteStops routeStops) {
        return routeStopsRepository.save(routeStops);
    }

    @Override
    public List<RouteStops> getAllRouteStop() {
        List<RouteStops> results = routeStopsRepository.findAll();
        return results;
    }

    @Override
    public RouteStops getRouteStopById(Long id) {

        return routeStopsRepository.findById(id).orElse(null);
    }

    @Override
    public String deleteRouteStop(Long id) {
        routeStopsRepository.deleteById(id);
        return "User with User Id " + id + " deleted!!!";
    }

    @Override
    public RouteStops updateRouteStop(RouteStops routeStops) {
        RouteStops u = routeStopsRepository.findById(routeStops.getId()).orElse(null);
        u.setRoute(routeStops.getRoute());
        u.setId(routeStops.getId());
        u.setStopName(routeStops.getStopName());
        u.setStopSeq(routeStops.getStopSeq());
        u.setTime(routeStops.getTime());
        u.setFare(routeStops.getFare());
        u.setStopLat(routeStops.getStopLat());
        u.setStopLong(routeStops.getStopLong());
        return routeStopsRepository.save(u);
    }



    @Override
    public List<Long> getRouteIDByRouteStops(String stopName1, String stopName2) {
        RouteStops ro1 = routeStopsRepository.getByStopName(stopName1);
        RouteStops ro2 = routeStopsRepository.getByStopName(stopName2);
        List<Long> result1 = new ArrayList<>();
        if (ro1.getStopSeq() < ro2.getStopSeq()) {

            List<Long> r1 = routeStopsRepository.getBystopName(stopName1);
            List<Long> r2 = routeStopsRepository.getBystopName(stopName2);
            result1 = new ArrayList<>();
            for (Long route1 : r1) {
                for (Long route2 : r2) {
                    if (route1.equals(route2)) {
                        result1.add(route1);
                    }
                }
            }

        }
        return result1;
    }

    @Override
    public List<Long> getRouteIdByStopNames(String s1, String s2) {
        List<Long> r1 = routeStopsRepository.getRouteIdByStopName(s1);
        List<Long> r2 = routeStopsRepository.getRouteIdByStopName(s2);
        List<Long> result1 = new ArrayList<>();
        for (Long a:r1){
            for (Long b:r2){
                if (a.equals(b)) {
                    result1.add(a);
                }
            }
        }
        return  result1;
    }

    @Override
    public Long getStopSeqByStopName(String stopName) {

        return routeStopsRepository.getStopSeq(stopName);
    }

    @Override
    public List<String> getStopLat(String stopName1, String stopName2) {


        Long s1 = routeStopsRepository.getStopSeq(stopName1);
        Long s2 = routeStopsRepository.getStopSeq(stopName2);
        List<String> l1 = new ArrayList<>();
        for (Long i = s1; i < s2 + 1; i++) {
            l1.add(routeStopsRepository.getStopLat(i));

        }

        return l1;

    }

    @Override
    public List<String> getStopLong(String stopName1, String stopName2) {
        Long s1 = routeStopsRepository.getStopSeq(stopName1);
        Long s2 = routeStopsRepository.getStopSeq(stopName2);
        List<String> l2 = new ArrayList<>();
        for (Long i = s1; i < s2 + 1; i++) {
            l2.add(routeStopsRepository.getStopLong(i));

        }
        return l2;

    }

    @Override
    public String getStopLatByRouteId(Long id) {
        Long r = scheduleRepository.getRouteId(id);
        List<Time> l1 = routeStopsRepository.getStopLatitude(r);
        Integer a = l1.size();
        List<Long> l2 = new ArrayList<>();
        LocalTime now = LocalTime.now();
        Time time = Time.valueOf(now);

        for (Time t : l1) {
            long diff = Math.abs((time.getTime() - t.getTime()));
            Long diffHours = diff / (60 * 60 * 1000) % 24;
            Long diffMinutes = diff / (60 * 1000) % 60;
            Long diffSeconds = diff / 1000 % 60;
            l2.add(diffHours);

        }
        int minIndex = l2.indexOf(Collections.min(l2));
        Time time1 = l1.get(minIndex);
        return routeStopsRepository.getStopLats(time1);


    }

    @Override
    public String getStopLongByRouteId(Long id) {
        Long r = scheduleRepository.getRouteId(id);
        List<Time> l1 = routeStopsRepository.getStopLatitude(r);
        Integer a = l1.size();
        List<Long> l2 = new ArrayList<>();
        LocalTime now = LocalTime.now();
        Time time = Time.valueOf(now);

        for (Time t : l1) {
            long diff = Math.abs((time.getTime() - t.getTime()));
            Long diffHours = diff / (60 * 60 * 1000) % 24;
            Long diffMinutes = diff / (60 * 1000) % 60;
            Long diffSeconds = diff / 1000 % 60;
            l2.add(diffHours);


        }
        int minIndex = l2.indexOf(Collections.min(l2));

        Time time1 = l1.get(minIndex);

        return routeStopsRepository.getStopLongs(time1);


    }

    @Override
    public Time getStopTime(String stopName) {
        return routeStopsRepository.getStopTime(stopName);
    }

    @Override
    public Long getFareByStopName(String stopName1, String stopName2) {
        Long fare1 = routeStopsRepository.getFare(stopName1);
        Long fare2 = routeStopsRepository.getFare(stopName2);
        return Math.abs(fare1 - fare2);

    }

    @Override
    public List<String> getDestination(String stopName) {
        List<Long> list = routeStopsRepository.getBystopName(stopName);

        Long r = routeStopsRepository.getStopSeq(stopName);
        return routeStopsRepository.getStopNames(r);
    }

    @Override
    public Time getStopTimeByRoute(Long sId, String origin) {
        Long rId= scheduleRepository.getRouteId(sId);
        return routeStopsRepository.getStopTimeByRoute(rId,origin);
    }

}


