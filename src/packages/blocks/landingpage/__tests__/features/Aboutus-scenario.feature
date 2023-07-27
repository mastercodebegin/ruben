Feature: AboutUs

    Scenario: User navigates to about us screen
        Given users loading about us screen
        And user can see the farm image
        Then user can see the description
        Then user can add the product into cart
        And I can leave the screen with out errors