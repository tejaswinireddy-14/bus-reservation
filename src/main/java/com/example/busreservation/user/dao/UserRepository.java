package com.example.busreservation.user.dao;

import com.example.busreservation.user.entity.UserDetails;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UserRepository extends JpaRepository<UserDetails,Long>{
    @Query(nativeQuery = true,value = "select id from user_details where user_mail= ?1")
     List<Long> getUserByMail( String userMail);
    @Query(nativeQuery = true,value = "select user_mail from user_details where id=?1")
    public String getUserMail(Long id);
    @Query(nativeQuery = true,value = "select id from user_details where user_mail=?1")
    public Long getUserId(String mail) ;
}
