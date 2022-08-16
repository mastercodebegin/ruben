Feature: ordermanagement

    Scenario: User navigates to ordermanagement
        Given I am a User loading ordermanagement
        When I navigate to the ordermanagement
        Then ordermanagement will load with out errors
        And I can leave the screen with out errors

    Scenario: User cancel an order
        Given I am a User attempting to cancel an order
        When I click on cancel order
        Then I click on yes
        And Rest Api will return success response

    Scenario: User click on an order
        Given I am a User attempting to click an order
        When I click on an order
        Then Rest Api will return success response
        And orderDetails will load with out errors
    
    Scenario: User rate an order
        Given I am a User attempting to rate an order
        When I rate an order
        Then Rest Api will return success response
