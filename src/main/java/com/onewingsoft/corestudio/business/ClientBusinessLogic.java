package com.onewingsoft.corestudio.business;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.onewingsoft.corestudio.model.Client;
import com.onewingsoft.corestudio.repository.ClientRepository;

@Service
public class ClientBusinessLogic {

	@Autowired
	private ClientRepository clientRepository;

	public Iterable<Client> getAllClients() {
		return clientRepository.findAll();
	}

	public Client getClient(Long clientId) {
		return clientRepository.findOne(clientId);
	}

	public Client createClient(Client client) {
		return clientRepository.save(client);
	}
}
