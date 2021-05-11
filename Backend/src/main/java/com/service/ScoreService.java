package com.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.domain.Score;
import com.domain.Usuario;
import com.repository.ScoreRepository;

@Service
public class ScoreService {

	@Autowired
	ScoreRepository repo;

	// criar método que retorne o top 10

	public List<Score> todos() {
		return repo.findAll();
	}

	public List<Score> ranking(String nivel) {
		return repo.ranking(nivel);
	}

	public Score novo(Score score) {
		int aux = 0;
		List<Score> todos = todos();
		Integer idUser = score.getUsuario().getId();
		Integer pontuacao = score.getPontuacao();
		String nivel = score.getNivel();

		for (Score s : todos) {
			if (s.getUsuario().getId() == idUser && s.getPontuacao() == pontuacao && s.getNivel().equals(nivel)) {
				aux++;
			}
		}
		if (aux == 0)
			return repo.save(score);
		else
			System.out.println("Pontuação já existe!");
		return score;
	}

}
