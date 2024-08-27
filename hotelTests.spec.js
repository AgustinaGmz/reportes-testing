it('Validar envío exitoso del formulario', () => {
    cy.intercept('POST', '/message').as('postMessage'); 

    // Rellena el formulario con datos válidos
    cy.get('input[placeholder="Name"]').type('Agustina Gimenez');
    cy.get('input[placeholder="Email"]').type('bolcheagustina@gmail.com');
    cy.get('input[placeholder="Phone"]').type('1135818570');
    cy.get('input[placeholder="Subject"]').type('Reserva de habitación para fecha X');
    cy.get('[data-testid="ContactDescription"]').type('Este es un mensaje de prueba que cumple con la longitud requerida para pasar la validación.');

    // Envía el formulario
    cy.get('#submitContact').click();

    // Verifica la solicitud a la API
    cy.wait('@postMessage')
        .its('response.statusCode')
        .should('eq', 200); // Cambiado a 200 ya que el mensaje fue recibido correctamente
    
    // Verifica el mensaje de éxito
    cy.get('.alert-success')
        .should('be.visible')
        .and('contain', 'Thanks for getting in touch Agustina Gimenez!')
        .and('contain', 'We\'ll get back to you about bolcheagustina@gmail.com as soon as possible.');
});