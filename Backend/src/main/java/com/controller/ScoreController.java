package com.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.domain.Score;
import com.service.ScoreService;

@RestController
@RequestMapping("/ranking")
public class ScoreController {

	@Autowired
	ScoreService service;

	@GetMapping
	public List<Score> listaPorNivel(@RequestParam String nivel){
		return service.ranking(nivel);
	}

	@PostMapping
	public Score registraScore(@RequestBody Score score) {
		return service.novo(score);
	}

}
