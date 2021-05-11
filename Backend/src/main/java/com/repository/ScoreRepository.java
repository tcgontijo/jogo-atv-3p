package com.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.domain.Score;

public interface ScoreRepository extends JpaRepository<Score, Integer> {

	@Query(value = "SELECT * FROM score obj WHERE nivel= ?1 ORDER BY pontuacao DESC limit 10", nativeQuery=true)
	List<Score> ranking(String nivel);

}
