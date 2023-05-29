Feature: User navigates to signup screen

    Scenario: User navigates to signup screen
        Given I am a User attempting to signup  with a Email
        And user trying to signup with invalid email
        And user trying to signup with invalid password
        And user trying to signup with valid email and password
        And user trying to signup as a merchant
        And user can see the welcome modal
        And user trying to copy coupon code
        And user trying to enter email id and password
        And user trying to signup us a merchant
        And user trying to signup us a user
        And I can leave the screen with out errors
    