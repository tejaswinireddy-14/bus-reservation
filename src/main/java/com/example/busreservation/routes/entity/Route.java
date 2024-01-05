package com.example.busreservation.routes.entity;

import com.example.busreservation.routeStops.entity.RouteStops;
import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.util.Set;

@Entity
public class Route {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    Long id;
    String routeName;
    @OneToMany(fetch = FetchType.EAGER,cascade = CascadeType.ALL)
            @JsonIgnore
    Set<RouteStops> routeStops;

    public Route() {
    }

    public Route(Long id, String routeName, Set<RouteStops> routeStops) {
        this.id = id;
        this.routeName = routeName;
        this.routeStops = routeStops;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getRouteName() {
        return routeName;
    }

    public void setRouteName(String routeName) {
        this.routeName = routeName;
    }

    public Set<RouteStops> getRouteStops() {
        return routeStops;
    }

    public void setRouteStops(Set<RouteStops> routeStops) {
        this.routeStops = routeStops;
    }
}
