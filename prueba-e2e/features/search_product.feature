# features/search_product.feature
Feature: Search and validate product details on Mercado Libre

  As a user, I want to search for a product on Google,
  navigate to Mercado Libre, filter by brand,
  and validate the product price on the detail page.

  # DOCUMENTACIÓN DE LA LIMITACIÓN:
  # Los pasos de inicio en Google (navegar a Google, buscar, hacer clic en el enlace de ML)
  # no se pueden automatizar de manera estable debido a las avanzadas medidas anti-bot de Google (reCAPTCHA)
  # que impiden la interacción programática y pueden cerrar la sesión del navegador.
  # Por lo tanto, la prueba se iniciará directamente en la página de búsqueda de Mercado Libre
  # para poder validar los demás requisitos del desafío.

  Scenario: Validate product price after filtering by brand
    Given I am on the Mercado Libre search results page for "creatina"
    And I handle any cookie banner if it appears
    And I apply the "MuscleTech" filter for the brand
    And I get the price of the first product in the list
    And I click on the first product in the list
    Then the product price on the detail page should match the price from the list