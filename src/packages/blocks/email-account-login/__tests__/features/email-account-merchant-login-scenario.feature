Feature: Email Address Account Log In Merchant

    Scenario: User Trying to signup as a merchant
        Given I am a User attempting to signup as a merchant with a Email
        And I can Navigate to merchant signup screen
        And user trying to signup with empty email
        And user trying to signup with empty password
        And user trying to signup with empty farm name
        And user trying to signup with empty product name
        And user trying to signup with empty location
        And user trying to signup with empty contact
        And user trying to signup with empty description
        And user trying to signup with empty website
        And user trying to signup with empty social account
        And I can fill the details without error
        And user navigate to welcome modal