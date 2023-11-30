Feature: InvoiceBilling

    Scenario: User navigates to InvoiceBilling
        Given I am a User loading InvoiceBilling
        When I navigate to the InvoiceBilling
        Then InvoiceBilling will load with out errors
        Then I can see the invoice
        Then I can share the the invoice through mail
        Then I can download the invoice
        Then I can write function cases
        And I can leave the screen with out errors