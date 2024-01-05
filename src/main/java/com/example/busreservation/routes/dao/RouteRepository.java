package com.example.busreservation.routes.dao;

import com.example.busreservation.routes.entity.Route;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RouteRepository extends JpaRepository<Route,Long> {
@Query(nativeQuery = true, value = "select * from route where route.stopName = ?1")
    List<Route>getByStopName(String s1);
}
