Feature: Email Address Account Log In

    Scenario: User navigates to Email Log In
        Given I am a User attempting to Log In with a Email
        When I navigate to the Log In Screen
        And Login with empty email
        And Login with empty password
        And Login with invalid Email
        And Login with valid Email and password
        And user moving to signup tab
        And user trying to signup with invalid email
        And user trying to signup with invalid password
        And user trying to signup with valid email and password
        And user trying to signup as a merchant
        And user can see the welcome modal
        And user trying to copy coupon code
        And I can leave the screen with out errors
    