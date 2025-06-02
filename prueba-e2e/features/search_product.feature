 Feature: Search and validate product details on Mercado Libre

    As user, I want to search for a product on Google,
    navigate to Mercado Libre, filter by brand,
    and validate the product price on the detail page.

    Scenario: Validate product price after filtering by brand
        When I search for "Creatina mercado libre"
        And I click on the Mercado Libre link in the search results
        And I handle any cookie banner if it appears
        And I apply the "MuscleTech" filter for the brand
        And I get the price of the first product in the list
        And I click on the first product in the list
        Then the product price on the detail page should match the price from the list