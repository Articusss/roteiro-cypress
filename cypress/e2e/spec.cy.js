describe('template spec', () => {
  it('Verifica se app está abrindo', () => {
    cy.visit('http://127.0.0.1:7001/')
  })

  it('Insere uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'TP2 de Engenharia de Software'); 
  });

  it('Insere e deleta uma tarefa', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de Engenharia de Software{enter}');

    cy.get('.todo-list li .destroy')
      .invoke('show')
      .click();

    cy.get('.todo-list li')
      .should('have.length', 0);
  });

  it('Filtra tarefas completas e ativas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');

    cy.get('.todo-list li .toggle')
      .first()
      .click();

    cy.contains('Active').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'Prova de ES');

    cy.contains('Completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1)
      .first()
      .should('have.text', 'TP2 de ES');

    cy.contains('All').click();
    cy.get('.todo-list li')
      .should('have.length', 2);
  });

  it('Limpa tarefas completas', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');
    
    cy.get('.todo-list li .toggle')
    .first()
    .click();

    cy.contains('Clear completed').click();
    cy.get('.todo-list li')
      .should('have.length', 1);
    
  });

  it('Tenta editar um todo', () => {
    cy.visit('http://127.0.0.1:7001');

    cy.get('.new-todo')
      .type('Faxina{Enter}');
    
    cy.get('.todo-list li')
      .first()
      .dblclick()
      .type(" de casa{Enter}");
    
    cy.get('.todo-list li')
      .should('have.length', 1) 
      .first()
      .should('have.text', 'Faxina de casa'); 
  });

  it('Verifica contador de tarefas', () => {
    cy.visit('http://127.0.0.1:7001'); 

    cy.get('.new-todo')
      .type('TP2 de ES{enter}')
      .type('Prova de ES{enter}');
    
    cy.get('.todo-count')
      .should('have.text', '2 items left')

    cy.get('.todo-list li .destroy')
      .first()
      .invoke('show')
      .click();

    cy.get('.todo-count')
    .should('have.text', '1 item left')
  })
});