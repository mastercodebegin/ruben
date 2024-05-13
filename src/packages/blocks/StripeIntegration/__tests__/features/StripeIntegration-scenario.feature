Feature: StripeIntegration

    Scenario: User navigates to StripeIntegration
        Given I am a User loading StripeIntegration
        When I navigate to the StripeIntegration
        Then StripeIntegration will load with out errors
        Then should return 3.99 for storageClass Gold
        Then Receive function works properly
        Then I can leave the screen with out errors