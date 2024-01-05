package com.example.busreservation.routeStops.dao;

import com.example.busreservation.routeStops.entity.RouteStops;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.sql.Time;
import java.util.List;

@Repository
public interface RouteStopsRepository extends JpaRepository<RouteStops,Long> {
    @Query(nativeQuery = true,value = "select route_id from route_stops where stop_name = ?1 ")
     List<Long> getBystopName(String stopName);
    @Query(nativeQuery = true,value = "select * from route_stops where stop_name = ?1")
    RouteStops getByStopName(String stopName);
    @Query(nativeQuery = true,value = "select route_id from route_stops where stop_name =?1")
    List<Long> getRouteIdByStopName(String stopName);
    @Query(nativeQuery = true,value = "select stop_seq from route_stops where stop_name=?1")
    Long getStopSeq(String stopName);
    @Query(nativeQuery = true,value = "select stop_lat from route_stops where stop_seq = ?1")
    String getStopLat(Long stopSeq);
    @Query(nativeQuery = true,value = "select stop_long from route_stops where stop_seq = ?1")
    String getStopLong(Long stopSeq);
    @Query(nativeQuery = true,value = "select stop_lat from route_stops where time =?1")
    String getStopLats(Time time);
    @Query(nativeQuery = true,value = "select stop_long from route_stops where time =?1")
    String getStopLongs(Time time);
    @Query(nativeQuery = true,value = "select time from route_stops where route_id =?1")
   List< Time> getStopLatitude(Long id);
    @Query(nativeQuery = true, value = "select time from route_stops where stop_name =?1")
    Time getStopTime(String stopName);
    @Query(nativeQuery = true, value = "select fare from route_stops where stop_name =?1")
    Long getFare(String stopName);
    @Query(nativeQuery = true,value = "select stop_name from route_stops where stop_seq>?1")
    List<String> getStopNames(Long seq);

    @Query(nativeQuery = true,value = "select stop_seq from route_stops where stop_name = ?1 and route_id =?2")
    Long getStopSeqByRouteId(String stopName, Long routeId );
    @Query(nativeQuery = true,value = "select * from route_stops where route_id =?1")
    List<RouteStops> getAllStopsByRouteId(Long routeId);
    @Query(nativeQuery = true,value = "select time from route_stops where route_id = ?1 and stop_name = ?2")
    Time getStopTimeByRoute(Long rId, String origin);






}
