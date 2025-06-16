package com.vigeelante1.NextGen.repository;
import com.vigeelante1.NextGen.entities.Course;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface CourseRepository extends JpaRepository<Course, Long> {

    @Query("SELECT c FROM Course c LEFT JOIN FETCH c.learningPoints WHERE c.id = :id")
    Optional<Course> findByIdWithLearningPoints(@Param("id") Long id);

    // JpaRepository already provides methods like findAll(), findById(), save(), delete(), etc.
}
